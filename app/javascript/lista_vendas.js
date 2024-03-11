//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

const get_quantidade = []
var total_desconto_calc = document.querySelector('#total_show').innerHTML.replace('.', ',')
var troco_total = -1


function desconto() {
    if (document.getElementById('show_desconto').innerHTML.toString() == "PIX" || document.getElementById('show_desconto').innerHTML.toString() == "Dinheiro") {
        document.querySelector('#show_desconto').innerHTML = 'DESCONTO JÁ APLICADO: 5%'
        if (desconto_informado >= 0 && desconto_informado <= 100) {
            document.querySelector('#show_desconto').innerHTML = 'DESCONTO: ' + desconto_informado.toString() + '%'
        } else {
            document.querySelector('#show_desconto').innerHTML = "DESCONTO INVÁLIDO"
        }
    } else {
        document.querySelector('#show_desconto').innerHTML = 'DESCONTO NÃO APLICADO'
        if (desconto_informado >= 0 && desconto_informado <= 100) {
            document.querySelector('#show_desconto').innerHTML = 'DESCONTO: ' + desconto_informado.toString() + '%'
        } else {
            document.querySelector('#show_desconto').innerHTML = "DESCONTO INVÁLIDO"
        }
    }
}

$('#form_desconto').off('click').on('click', '#submit_desconto', function() {
    desconto_informado = parseInt(document.getElementById('desconto').value)
    if (document.getElementById('pega_desconto').innerHTML.toString() == "PIX" || document.getElementById('pega_desconto').innerHTML.toString() == "Dinheiro") {
        desconto_informado = desconto_informado + 5;
    }
    total_desconto();
});

$('#form_troco').off('click').on('click', '#submit_troco', function() {
    dinheiro_informado = parseFloat(document.getElementById('troco').value)
    total_troco();
});

function total_troco(){
    troco_total = ((dinheiro_informado - parseFloat(document.getElementById('total_show').innerHTML)).toFixed(2)).toString()
    document.querySelector('#show_troco').innerHTML = 'Troco: R$' + troco_total.replace('.', ',')
}

$('#botao_fechar_venda').off('click').on('click', '#submit_fecha_venda', function() {
    venda_produto_id = document.getElementById('venda_produto_id').innerHTML
    troco_total = parseFloat(troco_total).toFixed(2)
        $.ajax({
            type: 'POST',
            url: 'set_retirada_quantidade',
            data: {troco: troco_total}
        });
            $.ajax({
                type: 'POST',
                url: 'get_desconto',
                data: {desconto: total_desconto_calc, venda_produto_id: venda_produto_id}
            });
        })


function total_desconto(){
    desconto();
    if(desconto_informado >= 0 && desconto_informado <= 100){
        total_desconto_calc = (parseFloat(document.getElementById('total_show').innerHTML) - (parseFloat(document.getElementById('total_show').innerHTML)* (desconto_informado/100))).toFixed(2)
        document.querySelector('#total_show').innerHTML = total_desconto_calc.replace('.', ',')
    }

}

$(document).ready()
{
    desconto();
    total_desconto_calc;
}

