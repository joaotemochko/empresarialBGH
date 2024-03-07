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
    totalVenda.splice(data, 1);
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

$(document).ready()
{
    load_quagga();
    tabela();
}

function tabela() {
    $.ajax({
        type: 'GET',
        url: '/venda_produtos/get_barcode',
        data: {codebar: codigo_produto_replaced},
        success: function (response) {
            totalVenda.push({codigo: response.data[0].codebar, nome: response.data[0].nome, preco: codigo_preco});
            $('#resultado').DataTable(
                {
                    destroy: true,
                    searching: false,
                    search: false,
                    data: totalVenda,
                    columns: [
                        {data: 'codigo'},
                        {data: 'nome'},
                        {data: 'preco'},
                        {
                            data: function (data, row) {
                                data = botao_deletar
                                return data
                            }
                        },
                    ],
                });
        }
    });

}

function scannerEnd() {
    Quagga.stop();
    console.log(code);
    console.log(codigo_produto_replaced);
    codigo_preco = codigo_produto.replace(/(\d{1})(\d{6})(\d{3})(\d{2})(\d{1})/, '$3,$4');
    codigo_preco = 'R$' + codigo_preco.replace(/([0])/, '');
    console.log(codigo_preco);
    $(document).on('turbo:load', load_quagga());

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
                    codigo_produto_replaced = codigo_produto.replace(/(\d{3})(\d{2})(\d{8})/, '$2');
                    tabela();
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
