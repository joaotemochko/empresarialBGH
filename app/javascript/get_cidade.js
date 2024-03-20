//= require jquery/dist/jquery
//= require jquery-ujs/src/rails

var pegaEstado_val

function pegaEstado(){
    $.ajax({
        type: 'GET',
        url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
        success: function (response){
            console.log(response)
            $.each(response,function(key, value)
            {
                $("#selectEstado").append('<option value=' + response[key].sigla + ' >' + response[key].sigla + '</option>');
            });
        }
    });
}

function onSelect(event) {
    pegaEstado_val = $('#selectEstado').find(":selected").val()

    $.ajax({
        type: 'GET',
        url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + pegaEstado_val + '/municipios',
        success: function (response) {
            console.log(response)
            var pega_id = document.getElementById('selectCidade')
            var options = pega_id.getElementsByTagName('option');
            for(var i=0; i<options.length; i++) {
                    pega_id.removeChild(options[i]);
                    i--;
            }

            $.each(response, function (key, value) {
                $("#selectCidade").append('<option value="' + response[key].nome + '">' + response[key].nome + '</option>');
            });
        }
    });
}

$(document).ready(pegaEstado())

document.querySelector("#selectEstado").addEventListener("change", onSelect);