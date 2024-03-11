class ListaVendasController < DefaultController
  def index
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
    @venda_produto_id = @lista_venda.pluck(:venda_produto_id)
    @forma_pagamento = VendaProduto.where(:id => @venda_produto_id).pluck(:forma_pagamento)
    @venda_produto_id[0]
    @total = VendaProduto.where(:id => @venda_produto_id).pluck(:preco_total)
  end
  def set_retirada_quantidade
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
    @lista_venda.each do |lista|
    procura_codigo = Produto.find_by_codigo(lista.codigo)
    peso_retira = @lista_venda.where(:codigo => lista.codigo).pluck(:peso)
    retira_quantidade = (procura_codigo.quantidade - peso_retira[0].to_f)
    procura_codigo.update!(
      :quantidade => retira_quantidade
    )
    end
    redirect_to welcome_index_path
  end


  def get_desconto
    desconto = params[:desconto]
    @venda_produto_id = params[:venda_produto_id]
    @venda_produto = VendaProduto.where(:id => @venda_produto_id)
    @venda_produto.update!(
      :preco_total => desconto
    )
  end

  private
  def lista_venda_params
    params.require(:venda_produto_id)
  end
end
