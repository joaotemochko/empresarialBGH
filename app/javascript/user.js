// Adicionando requisitos ao JS
//= require jquery/dist/jquery
//= require jquery-ujs/src/rails
//= require bootstrap/dist/js/bootstrap.bundle
//= require jquery.easing/jquery.easing
//= require sb-admin-2
//= require jquery.dataTables
//= require quagga/dist/quagga
//= require dataTables.bootstrap4
//= require tables
//

const totalVenda = [];
const botao_deletar = '<button class="btn btn-danger" id="deletar"><i class="fa fa-trash"></i></button>'
var subtrai
var quantidadeTotal = 0;
var total = 0;
var codigo_produto = ''
var peso, codigo_produto_replaced
var numeros = []
var cep = []
var telefone = []
var lista_cnpj = document.querySelectorAll("[id='cnpj']")
var lista_cep = document.querySelectorAll("[id='cep']")
var lista_tel = document.querySelectorAll("[id='tel']")

for(var i = 0; i < lista_cnpj.length; i++){
    numeros.push(lista_cnpj[i].innerHTML);
}

for(var i = 0; i < lista_cep.length; i++){
    cep.push(lista_cep[i].innerHTML);
}

for(var i = 0; i < lista_tel.length; i++){
    telefone.push(lista_tel[i].innerHTML);
}

function vendaTotal() {
    document.querySelector('#total').innerHTML = 'TOTAL: R$' + total.toString().replace('.', ',')
}
function order_by_occurrence(arr) {
    var counts = {};
    arr.forEach(function(value){
        if(!counts[value]) {
            counts[value] = 0;
        }
        counts[value]++;
    });

    return Object.keys(counts).sort(function(curKey,nextKey) {
        return counts[curKey] < counts[nextKey];
    });
}

$('#resultado').off('click').on('click', '#deletar', function () {
    var table = $('#resultado').DataTable();
    var data = table.row($(this).parents('tr')).index();
    console.log(table.row($(this).parents('tr')).index())
    subtrai = totalVenda[data].preco_unidade_total
    total = (total - parseFloat(subtrai)).toFixed(2)
    quantidadeTotal = (quantidadeTotal - parseFloat(totalVenda[data].peso_unidade_total)).toFixed(3)
    totalVenda.splice(data, 1);
    vendaTotal();
    var row = $(this).parents('tr');
    if ($(row).hasClass('child')) {
        table.row($(row).prev('tr')).remove().draw();
    } else {
        table
            .row($(this).parents('tr'))
            .remove()
            .draw();
    }
});

$('#entradaManual').off('click').on('click', '#submit', function (){
    codigo_produto = document.getElementById('fcode').value.toString();
    codigo_produto_replaced = codigo_produto.replace(/(\d{2})(\d{5})/, '$1')
    peso = codigo_produto.replace(/(\d{2})(\d{2})(\d{3})/, '$2.$3')
    tabela();
    document.getElementById('fcode').value = null;
    $(document).on('turbo:load', load_quagga(), vendaTotal());

});

$('#botao_enviar').off('click').on('click', '#enviar', function (){
    $.ajax({
        type: 'POST',
        url: '/venda_produtos/set_venda',
        data: {forma_pagamento: document.getElementById('forma_pagamento').value, total: total, quantidade_total: quantidadeTotal, codigos_produtos: totalVenda
        },
    });
    window.location.reload();
});

$(document).ready()
{
    cpf_e_cnpj();
    cep_format();
    telefone_format();
    load_quagga();
    tabela();
    vendaTotal();
}

function tabela() {
    $.ajax({
        type: 'GET',
        url: '/venda_produtos/get_barcode',
        data: {codigo: codigo_produto_replaced},
        success: function (response) {
            peso = peso.replace(/(^0+)(\d{1})/, "$2")
            const total_preco_kg = (response.data[0].preco * parseFloat(peso)).toFixed(2)
            totalVenda.push({codigo: response.data[0].codigo, nome: response.data[0].nome, peso_unidade_total: peso, preco_unidade_total: total_preco_kg});
            total = totalVenda.reduce(function (acc, obj) { return acc + parseFloat(obj.preco_unidade_total); }, 0).toFixed(2);
            quantidadeTotal = totalVenda.reduce(function (acc, obj) { return acc + parseFloat(obj.peso_unidade_total); }, 0).toFixed(3);
            console.log(total)
            vendaTotal();
            $('#resultado').DataTable(
                {
                    destroy: true,
                    searching: false,
                    search: false,
                    data: totalVenda,
                    columns: [
                        {data: 'codigo'},
                        {data: 'nome'},
                        {data: 'peso_unidade_total', render: function(data, row) {
                                return data.replace('.', ',') + "Kg";

                            }
                        },
                        {data: 'preco_unidade_total', render: function(data, row) {
                                return "R$" + data.replace('.', ',')

                            }
                        },
                        {
                            data: function (data, row) {
                                data = botao_deletar
                                return data
                            }
                        }
                    ],
                });
        }
    });

}

function scannerEnd() {
    tabela();
    Quagga.stop();
    console.log(code);
    console.log(total);
    $(document).on(load_quagga());

}

function  load_quagga(){
    if ($('#barcode-scanner').length > 0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        var last_result = [];
        if (Quagga.initialized === undefined) {
            Quagga.onDetected(function(result) {
                var last_code = result.codeResult.code;
                last_result.push(last_code);
                if (last_result.length > 20) {
                    code = order_by_occurrence(last_result)[0];
                    last_result = [];
                    codigo_produto = code;
                    codigo_produto_replaced = codigo_produto.replace(/(\d{5})(\d{2})(\d{6})/, '$2');
                    peso = codigo_produto.replace(/(\d{1})(\d{6})(\d{2})(\d{3})(\d{1})/, '$3.$4');
                    console.log(code)
                    scannerEnd();
                }
            });
        }

        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                numOfWorkers: navigator.hardwareConcurrency,
                target: document.querySelector('#barcode-scanner')
            },
            decoder: {
                readers : ['ean_reader']
            }
        },function(err) {
            if (err) { console.log(err); return }
            Quagga.initialized = true;
            Quagga.start();
        });
    }
}

function eachCpf_ou_Cnpj(item, index, arr) {
    if (arr[index].length === 14) {
        lista_cnpj[index].innerHTML = item.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    } else if (arr[index].length === 11){
        lista_cnpj[index].innerHTML = item.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else {
        lista_cnpj[index].innerHTML = 'NÚMERO INVÁLIDO!'
    }
}

function eachCep(item, index, arr) {
    if (arr[index].length === 8) {
        lista_cep[index].innerHTML = item.toString().replace(/(\d{5})(\d{3})/, '$1-$2')
    } else {
        lista_cep[index].innerHTML = 'CEP INVÁLIDO!'
    }
}

function eachTelefone(item, index, arr) {
    if (arr[index].length === 8) {
        lista_tel[index].innerHTML = item.toString().replace(/(\d{4})(\d{4})/, '$1-$2')
    } else if (arr[index].length === 9){
        lista_tel[index].innerHTML = item.toString().replace(/(\d{5})(\d{4})/, '$1-$2')
    } else if (arr[index].length === 10){
        lista_tel[index].innerHTML = item.toString().replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3')
    } else if (arr[index].length === 11){
        lista_tel[index].innerHTML = item.toString().replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')
    }
    else {
        lista_tel[index].innerHTML = 'SEM CADASTRO/INVÁLIDO'
    }
}

function cpf_e_cnpj(){
    numeros.forEach(eachCpf_ou_Cnpj)
}

function cep_format(){
    cep.forEach(eachCep)
}

function telefone_format(){
    telefone.forEach(eachTelefone)
}