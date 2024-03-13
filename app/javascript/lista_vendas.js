//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

const alert_quantidade = []
var quantidade_float
var codigo_id

quantidade_float = JSON.parse(document.getElementById('quantidade').innerHTML)
codigo_id = JSON.parse(document.getElementById('id').innerHTML)

var troco_total, troco_show

total_Reais = (parseFloat(document.getElementById('total_show').innerHTML))

function desconto() {
    if (document.getElementById('forma_pgto').innerHTML.toString() == "PIX" || document.getElementById('forma_pgto').innerHTML.toString() == "Dinheiro") {
        document.querySelector('#show_desconto').innerHTML = 'DESCONTO: 5%'
        if (desconto_informado >= 0 && desconto_informado <= 100) {
            document.querySelector('#show_desconto').innerHTML = 'DESCONTO: ' + desconto_ja_aplicado.toString() + '%'
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
    desconto_informado = document.getElementById('desconto').value
    if (document.getElementById('forma_pgto').innerHTML.toString() == "PIX" || document.getElementById('forma_pgto').innerHTML.toString() == "Dinheiro") {
        desconto_ja_aplicado = parseFloat(desconto_informado) + 5;
    }
    total_desconto();
});

$('#form_troco').off('click').on('click', '#submit_troco', function() {
    dinheiro_informado = parseFloat(document.getElementById('troco').value).toFixed(2)
    total_troco();
});

function total_troco(){
    troco_total = dinheiro_informado - parseFloat(document.getElementById('total_show').innerHTML).toFixed(2)
    troco_show = troco_total.toFixed(2).toString()
    document.querySelector('#show_troco').innerHTML = 'Troco: R$' + troco_show.replace('.', ',')

}

$('#botao_fechar_venda').off('click').on('click', '#submit_botao_venda', function() {
    get_quantidade();
    venda_produto_id = parseInt(document.getElementById('venda_produto_id').innerHTML)
    troco_enviado = parseFloat(troco_total).toFixed(2)
    if (troco_total == null && document.getElementById('forma_pgto').innerHTML.toString() == 'Dinheiro' || troco_total == NaN && document.getElementById('forma_pgto').innerHTML.toString() == 'Dinheiro'){
        alert('Digite um troco válido!')
        window.location.reload();
    }else if (troco_total < 0 && document.getElementById('forma_pgto').innerHTML.toString() == 'Dinheiro') {
        alert('Digite um troco maior ou igual a 0!')
        window.location.reload();
    }else if (alert_quantidade.length > 0){
       alert('O(s) Produto(s) de código(s) '+ codigo_id + ' está com quantidade zerada/negativa. Por favor verifique o produto!')
        $.ajax({
            type: 'POST',
            url: 'set_retirada_quantidade',
            data: {troco: troco_enviado, venda_produto_id: venda_produto_id },
            success: function() {
                window.location.reload();
            }
        })

        $.ajax({
            type: 'POST',
            url: 'get_desconto',
            data: {desconto: total_desconto_calc, venda_produto_id: venda_produto_id },
            success: function() {
                window.location.reload();
            }
        })
    }
    else{
        $.ajax({
            type: 'POST',
            url: 'set_retirada_quantidade',
            data: {troco: troco_enviado, venda_produto_id: venda_produto_id },
            success: function() {
                window.location.reload();
            }
        });

        $.ajax({
                type: 'POST',
                url: 'get_desconto',
                data: {desconto: total_desconto_calc, venda_produto_id: venda_produto_id },
                success: function() {
                    window.location.reload();
                }
        });
        }
})

$('#botao_cancelar_venda').off('click').on('click', '#submit_botao_cancela', function() {
    venda_produto_id = parseInt(document.getElementById('venda_produto_id').innerHTML)
    $.ajax({
        type: 'POST',
        url: 'set_cancela',
        data: { venda_produto_id: venda_produto_id },
        success: function() {
            window.location.reload();
        }
    });
})

function eachQuantidade(item, index, arr) {
    if (item < 0){
        alert_quantidade.push(parseFloat(document.getElementById('quantidade').innerHTML))
    }
}

function get_quantidade (){
    quantidade_float.forEach(eachQuantidade)
}

function total_desconto(){
    desconto();
    if(desconto_informado >= 0 && desconto_informado <= 100){
        total_desconto_calc =  (total_Reais - (total_Reais)* (desconto_informado/100)).toFixed(2)
        document.querySelector('#total_show').innerHTML = total_desconto_calc
    }

}

$(document).ready(
    desconto()
)

