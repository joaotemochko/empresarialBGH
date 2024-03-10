class ListaVendasController < DefaultController
  def index
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
    @venda_produto_id = @lista_venda.pluck(:venda_produto_id)
    @forma_pagamento = VendaProduto.where(:id => @venda_produto_id).pluck(:forma_pagamento)
    @total = VendaProduto.where(:id => @venda_produto_id).pluck(:preco_total)
  end
  def set_retirada_quantidade
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
    @lista_venda.each do |lista|
    procura_codigo = Produto.find_by_codigo(lista.codigo)
    peso_retira = @lista_venda.select(:peso).where(:codigo => lista.codigo)
    retira_quantidade = (procura_codigo.quantidade - peso_retira.to_f)
    procura_codigo.update!(
      :quantidade => retira_quantidade
    )
    end

    redirect_to venda_produtos_path
  end

  def set_desconto
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
    @venda_produto_id = @lista_venda.pluck(:venda_produto_id)
    select = VendaProduto.where(:id => @venda_produto_id).pluck(:quantidade_total)
    if @desconto >= 0 and @desconto <= 100
      total = select - (select * (@desconto/100))
      VendaProduto.update!(
        :preco_total => total
      )
      redirect_to @lista_venda, notice: "Desconto aplicado com sucesso!"
      @desconto = 0
    else
      redirect_to @lista_venda, notice: "Desconto só pode ser aplicado entre 0% a 100%."
      @desconto = 0
    end
  end

  private
  def lista_venda_params
    params.require(:venda_produto_id)
  end
end
