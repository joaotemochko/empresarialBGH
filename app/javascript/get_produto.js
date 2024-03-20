//= require jquery/dist/jquery
//= require jquery-ujs/src/rails
//= require bootstrap/dist/js/bootstrap.bundle
//= require jquery.easing/jquery.easing
//= require jquery.dataTables
//= require dataTables.bootstrap4
//= require tables

var pegueProduto = [];
var quantidadeTotal = 0;
var total = 0;
var get_nome, get_codigo, get_preco, get_lblPreco, get_lblQuantidade
const botao_adicionar = '<button class="btn btn-success" id="adicionar"><i class="fa fa-plus"></i></button>'
const botao_deletar = '<button class="btn btn-danger" id="deletar"><i class="fa fa-trash"></i></button>'

function accents_supr(data){
    return !data ?
        '' :
        typeof data === 'string' ?
            data
                .replace(/\n/g, ' ')
                .replace(/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g, 'a')
                .replace(/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g, 'e')
                .replace(/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g, 'i')
                .replace(/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g, 'o')
                .replace(/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g, 'u')
                .replace(/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g, 'A')
                .replace(/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g, 'E')
                .replace(/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g, 'I')
                .replace(/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g, 'O')
                .replace(/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g, 'U')
                .replace(/ç/g, 'c')
                .replace(/Ç/g, 'C') :
            data;
}

jQuery.fn.DataTable.ext.type.search['string'] = function(data) {
    return accents_supr(data);
};

$(document).ready(function() {

    $('#resultado_atacado').off('click').on('click', '#deletar', function () {
        var table = $('#resultado_atacado').DataTable();
        var data = table.row($(this).parents('tr')).index();
        subtrai = pegueProduto[data].preco_unidade_total
        total = (total - parseFloat(subtrai)).toFixed(2)
        quantidadeTotal = (quantidadeTotal - parseFloat(pegueProduto[data].peso_unidade_total)).toFixed(3)
        pegueProduto.splice(data, 1);
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

    $('#form_enviar').off('click').on('click', '#enviar_atacadoProduto', function (){
        $.ajax({
            type: 'POST',
            url: 'atacado_pedidos/set_venda',
            data: {forma_pagamento: document.getElementById('forma_pagamento').value, total: total, quantidade_total: quantidadeTotal, codigos_produtos: totalVenda
            },
        });
        window.location.reload();
    });

    $('#procuraProduto').DataTable({
        destroy: true,
        ajax: {
            type: 'GET',
            url: '../produtos/get_dataProduto',
        },
        columns: [
            {data: function (data, row){
                    data = botao_adicionar
                    return data
                }},
            {data: 'nome'},
            {data: 'codigo'},
            {
                data: function(data, row){
                    if (data.preco_unidade != null && data.preco_unidade === true)
                        data = 'Sim'
                    else {
                        data = 'Não'
                    }
                    return data
                }},
            {data: 'preco', render: function(data, row) {
                    return "R$" + parseFloat(data).toFixed(2).toString().replace('.', ',')

                }
            }
        ]
    })
    $('#procuraProduto_filter input[type=search]').keyup(function () {
        var table = $('#procuraProduto').DataTable();
        table.search(
            jQuery.fn.DataTable.ext.type.search.string(this.value)
        ).draw();
    });

    $('#procuraProduto').off('click').on('click', '#adicionar', function (){
        form_quantidade = document.getElementById('form_quantidade')
        form_quantidade.style.display = form_quantidade.style.display === "block" ? "none" : "block";
        var data = $(this).closest('tr')
        if (form_quantidade.style.display === "block") {
            get_nome = data.find('td:nth-child(2)').text()
            get_codigo = data.find('td:nth-child(3)').text()
            get_preco = data.find('td:nth-child(5)').text()
            get_preco = get_preco.toString().replace(',', '.')
            get_preco = get_preco.replace('R$', '')
            document.querySelector('#lblNome').innerHTML = get_nome
            document.querySelector('#lblCodigo').innerHTML = get_codigo
            document.querySelector('#lblPreco').value = get_preco
        } else if (form_quantidade.style.display === "none"){
            document.querySelector('#lblNome').innerHTML = ''
            document.querySelector('#lblCodigo').innerHTML = ''
            document.querySelector('#lblPreco').value = 0
            document.querySelector('#lblQuantidade').value = ''
        }
    });

    $('#form_quantidade').off('click').on('click', '#envia_escolha', function (){
        $.ajax({
            type: 'GET',
            url: '../venda_produtos/get_barcode',
            data: {codigo: get_codigo},
            success: function (response){
                get_lblQuantidade = document.getElementById('lblQuantidade').value
                get_lblPreco = document.getElementById('lblPreco').value
                peso_unidade = get_lblQuantidade.toString()
                preco = parseFloat(get_lblQuantidade * get_lblPreco)
                pegueProduto.push({codigo: response.data[0].codigo, nome: response.data[0].nome, peso_unidade_total: peso_unidade, preco_unidade_total: preco})
                quantidadeTotal = pegueProduto.reduce(function (acc, obj) { return acc + parseFloat(obj.peso_unidade_total); }, 0).toFixed(3);

                total = pegueProduto.reduce(function (acc, obj) { return acc + parseFloat(obj.preco_unidade_total); }, 0).toFixed(2);
                vendaTotal();
                $('#resultado_atacado').DataTable(
                    {
                        destroy: true,
                        searching: false,
                        search: false,
                        data: pegueProduto,
                        columns: [
                            {data: 'codigo'},
                            {data: 'nome'},
                            {
                                data: function(data, row){
                                    if (response.data[0].preco_unidade != null && response.data[0].preco_unidade === true)
                                        data = 'Sim'
                                    else {
                                        data = 'Não'
                                    }
                                    return data
                                }
                            },
                            {data: 'peso_unidade_total', render: function(data, row) {
                                    return data.toString().replace('.', ',') + "Kg";

                                }
                            },
                            {data: 'preco_unidade_total', render: function(data, row) {
                                    return "R$" + data.toString().replace('.', ',')

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
        })
    });

    function vendaTotal() {
        document.querySelector('#total').innerHTML = 'TOTAL: R$' + total.toString().replace('.', ',')
    }
})