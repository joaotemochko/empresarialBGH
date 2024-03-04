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

function scannerEnd() {
    Quagga.stop();
    $('#resultado').DataTable({
        destroy: true,
        ajax:
            {
                type: "GET",
                url: '/venda_produtos/get_barcode',
                data: {codebar: code}
            },
        columns: [
            {data: 'codebar'},
            {data: 'nome'}
        ]
    })
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
                readers : ['ean_reader','ean_8_reader','code_39_reader','code_39_vin_reader','codabar_reader','upc_reader','upc_e_reader']
            }
        },function(err) {
            if (err) { console.log(err); return }
            Quagga.initialized = true;
            Quagga.start();
        });
    }
}
$(document).ready('turbo:load', load_quagga());
