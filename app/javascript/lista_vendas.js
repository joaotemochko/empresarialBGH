//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

function desconto(){
    if (document.getElementById('show_desconto').innerHTML.toString() == "PIX" || document.getElementById('show_desconto').innerHTML.toString() == "Dinheiro") {
        document.querySelector('#show_desconto').innerHTML = 'DESCONTO JÁ APLICADO: 5%'
    }
    if (desconto_informado >= 0) {
        document.querySelector('#show_desconto').innerHTML = 'DESCONTO: ' + desconto_informado.toString() + '%'
        total();
    }
}

$('#form_desconto').off('click').on('click', '#submit_desconto', function() {
    desconto_informado = parseInt(document.getElementById('desconto').value)
    total_desconto();
})

function total_desconto(){
    if(desconto_informado >= 0){
        total_desconto = (parseFloat(document.getElementById('total_show').innerHTML) - (parseFloat(document.getElementById('total_show').innerHTML)* (desconto_informado/100))).toFixed(2)
        document.querySelector('#total_show').innerHTML = total_desconto
    }
}

$(document).on()
{
    desconto();
}

