// Call the dataTables jQuery plugin
$(document).ready(function() {

  $('#dataTable').DataTable({
    ajax: '/get_dataProduto',

    columns:[
      {data: 'nome'},
      {data: 'desc'},
      {data: 'quantidade'}
    ]
  })
});
