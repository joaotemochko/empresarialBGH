class ListaVendasController < DefaultController

  def index
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
    @quantidade = []
    @lista_venda.each do |lista|
      @procura_quantidade = Produto.find_by_codigo(lista.codigo)
      @quantidade.push(@procura_quantidade)
    end
    @status = VendaProduto.where(:id => lista_venda_params).pluck(:status)
    @venda_produto_id = @lista_venda.pluck(:venda_produto_id)
    @forma_pagamento = VendaProduto.where(:id => @venda_produto_id).pluck(:forma_pagamento)
    @venda_produto_id[0]
    @total_rs = VendaProduto.where(:id => @venda_produto_id).pluck(:preco_total)
  end

  def set_cancela
    @venda_produto_id = params[:venda_produto_id].to_i
    @venda_produto = VendaProduto.find(@venda_produto_id)
    @venda_produto.update!(
      :status => 'CANCELADO'
    )
  end

  def set_retirada_quantidade
   @venda_produto_id = params[:venda_produto_id].to_i
   @forma_pagamento = VendaProduto.where(:id => @venda_produto_id).pluck(:forma_pagamento)
   @venda_produto = VendaProduto.find(@venda_produto_id)
   @lista_venda = ListaVenda.where(:venda_produto_id => @venda_produto_id)
   @lista_venda.each do |lista|
    @procura_codigo = Produto.find_by_codigo(lista.codigo)
    peso_retira = @lista_venda.where(:codigo => lista.codigo).pluck(:peso)
    retira_quantidade = (@procura_codigo.quantidade - peso_retira[0].to_f)
    @procura_codigo.update!(
    :quantidade => retira_quantidade
    )
    end
    @venda_produto.update!(
      :status => 'FECHADO'
    )
end


  def get_desconto
    desconto = params[:desconto].to_f
    @venda_produto = VendaProduto.where(:id => lista_venda_params)
    if @venda_produto[0].preco_total != desconto
      @venda_produto.update!(
        :preco_total => desconto
      )
    end
  end

  private
  def lista_venda_params
    params.require(:venda_produto_id)
  end
end
