class ListaVendasController < DefaultController
  def index
    @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
    @status = VendaProduto.where(:id => lista_venda_params).pluck(:status)
    @venda_produto_id = @lista_venda.pluck(:venda_produto_id)
    @forma_pagamento = VendaProduto.where(:id => @venda_produto_id).pluck(:forma_pagamento)
    @venda_produto_id[0]
    @total = VendaProduto.where(:id => @venda_produto_id).pluck(:preco_total)
  end


  def set_retirada_quantidade
    if params[:troco] != nil
    @troco = params[:troco].delete_prefix('"').delete_suffix('"').to_f
    else
      @troco = -1
    end
    @forma_pagamento = VendaProduto.where(:id => lista_venda_params).pluck(:forma_pagamento)
    puts "Forma pagamento #{@forma_pagamento[0]}"
    puts @troco
    @alert_codigo = []
    if @alert_codigo != []
      render(
        html: "<script>alert('O(s) Produto(s) de código(s) '+ #{@alert_codigo} + ' está com quantidade zerada/negativa. Por favor verifique o produto!'); window.location.href = '#{lista_vendas_venda_produtos_path}'</script>".html_safe,
        layout: 'default'
      )
   end
   if @troco < 0 and @forma_pagamento[0].to_s == 'Dinheiro'
      render(
        html: "<script>alert('Troco inválido, informe um troco maior ou igual a 0!'); window.location.href = '#{lista_vendas_path}'</script>".html_safe,
        layout: 'default'
      )
   else
      @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
      @lista_venda.each do |lista|
        @procura_codigo = Produto.find_by_codigo(lista.codigo)
        peso_retira = @lista_venda.where(:codigo => lista.codigo).pluck(:peso)
        retira_quantidade = (@procura_codigo.quantidade - peso_retira[0].to_f)
        @procura_codigo.update!(
          :quantidade => retira_quantidade
        )
        if @procura_codigo.quantidade <= 0
          @alert_codigo << @procura_codigo.id
        end
      end

      @venda_produto = VendaProduto.find(lista_venda_params)
      @venda_produto.update!(
        :status => 'FECHADO'
      )

      redirect_to lista_vendas_venda_produtos_path
    end
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
