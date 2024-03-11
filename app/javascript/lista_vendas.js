//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

function desconto(){
    if (document.getElementById('show_desconto').innerHTML.toString() == "PIX" || document.getElementById('show_desconto').innerHTML.toString() == "Dinheiro") {
        document.querySelector('#show_desconto').innerHTML = 'DESCONTO JÁ APLICADO: 5%'
    }
    if (desconto_informado >= 0 && desconto_informado <= 100) {
        document.querySelector('#show_desconto').innerHTML = 'DESCONTO: ' + desconto_informado.toString() + '%'
    }
    else{
        document.querySelector('#show_desconto').innerHTML = "DESCONTO INVÁLIDO"
    }
}

$('#form_desconto').off('click').on('click', '#submit_desconto', function() {
    desconto_informado = parseInt(document.getElementById('desconto').value)
    total_desconto();
});

$('#botao_fechar_venda').off('click').on('click', '#submit_fecha_venda', function() {
    venda_produto_id = document.getElementById('venda_produto_id').innerHTML
    $.ajax({
        type: 'POST',
        url: 'get_desconto',
        data: { desconto: total_desconto_calc, venda_produto_id: venda_produto_id }
    });
});

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
}

