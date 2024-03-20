//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

var selected_form
function onSelect(event) {
    selected_form = $("#select_form").find(":selected").val();

    $.ajax({
        type: 'GET',
        url: '../clientes/get_cliente',
        data: {selected: selected_form},
        success: function (response) {
            console.log(response)
            if (response.data[0].cnpj.length === 14) {
                document.querySelector('#cnpj_selected').innerHTML = response.data[0].cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
            } else if (response.data[0].cnpj.length === 11){
                document.querySelector('#cnpj_selected').innerHTML = response.data[0].cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            } else{
                document.querySelector('#cep_selected').innerHTML = 'CPF OU CNPJ INVÁLIDO'
            }

            document.querySelector('#endereco_selected').innerHTML = response.data[0].endereco

            if (response.data[0].cep.length === 8) {
                document.querySelector('#cep_selected').innerHTML = response.data[0].cep.replace(/(\d{5})(\d{3})/, '$1-$2')
            } else{
                document.querySelector('#cep_selected').innerHTML = 'NÚMERO INVÁLIDO'
            }
            if (response.data[0].email != null) {
                document.querySelector('#email_selected').innerHTML = response.data[0].email
            } else{
                document.querySelector('#email_selected').innerHTML = 'SEM REGISTRO DE EMAIL!'
            }

            document.querySelector('#cidade_selected').innerHTML = response.data[0].cidade
            document.querySelector('#uf_selected').innerHTML = response.data[0].uf
        }
    })
}

document.querySelector("#select_form").addEventListener("change", onSelect);