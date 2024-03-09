class ListaVendasController < DefaultController
  def index
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
  end

  private
  def lista_venda_params
    params.require(:venda_produto_id)
  end
end
