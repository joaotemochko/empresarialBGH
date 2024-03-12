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
   @forma_pagamento = VendaProduto.where(:id => lista_venda_params).pluck(:forma_pagamento)
   @venda_produto = VendaProduto.find(lista_venda_params)
   @troco = []
   @troco.push(params[:troco])

   @alert_codigo = []

   if @troco[0] != nil and @forma_pagamento[0].to_s == 'Dinheiro'
     @troco_utilizado = @troco[0].delete_prefix('"').delete_suffix('"').to_f
   elsif @troco[0] == nil and not @forma_pagamento[0].to_s == 'Dinheiro'
     @troco_utilizado = 1
   elsif @troco[0] == nil and @forma_pagamento[0].to_s == 'Dinheiro'
     redirect_to lista_vendas_path
   elsif @troco_utilizado < 0 and @forma_pagamento[0].to_s == 'Dinheiro'
          render(
            html: "<script>alert('Troco inválido, informe um troco maior ou igual a 0!'); window.location.href = '#{lista_vendas_path}'</script>".html_safe,
            layout: 'default'
          )
   elsif @troco_utilizado >= 0
          @lista_venda = ListaVenda.where(:venda_produto_id => lista_venda_params)
          @lista_venda.each do |lista|
            @procura_codigo = Produto.find_by_codigo(lista.codigo)
            peso_retira = @lista_venda.where(:codigo => lista.codigo).pluck(:peso)
            retira_quantidade = (@procura_codigo.quantidade - peso_retira[0].to_f)
            @procura_codigo.update!(
              :quantidade => retira_quantidade
            )
            puts @procura_codigo.quantidade
            puts @procura_codigo.id
            if @procura_codigo.quantidade <= 0
              @alert_codigo << @procura_codigo.id
            end
         end
          @venda_produto.update!(
            :status => 'FECHADO'
          )
          if @alert_codigo != nil
            render(
              html: "<script>alert('O(s) Produto(s) de código(s) '+ #{@alert_codigo} + ' está com quantidade zerada/negativa. Por favor verifique o produto!'); window.location.href = '#{lista_vendas_path}'</script>".html_safe,
              layout: 'default'
            )
          else
            redirect_to lista_vendas_path
          end
     end
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
