class AtacadoPedidosController < DefaultController
  before_action :set_cliente_options, only: [ :new, :create, :edit, :update ]
  def index
    @atacados = AtacadoPedido.all
  end

  def show
  end

  # GET /atacado_pedidos/new
  def new
    @atacado = AtacadoPedido.new
  end

  # GET /atacado_pedidos/1/edit
  def edit
  end

  # POST /atacado_pedidos or /atacado_pedidos.json
  def create
    @atacado = AtacadoPedido.new(atacado_pedido_params)

    respond_to do |format|
      if @estoque.save
        format.html { redirect_to atacado_pedido_url(@atacado), notice: "Pedido criado com sucesso." }
        format.json { render :show, status: :created, location: @atacado }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @atacado.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /atacado_pedidos/1 or /atacado_pedidos/1.json
  def update
    respond_to do |format|
      if @atacado.update(atacado_pedido_params)
        format.html { redirect_to atacado_pedido_url(@atacado), notice: "Pedido atualizado com sucesso." }
        format.json { render :show, status: :ok, location: @atacado }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @atacado.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /atacado_pedidos/1 or /atacado_pedidos/1.json
  def destroy
    @atacado.destroy!

    respond_to do |format|
      format.html { redirect_to atacado_pedidos_url, notice: "Pedido deletado com sucesso." }
      format.json { head :no_content }
    end
  end

  private

  def set_cliente_options
    @cliente_options = Cliente.all.pluck(:nome, :id)
    @cliente = Cliente.all
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_estoque
    @atacado = AtacadoPedido.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def atacado_pedido_params
    params.require(:atacado_pedido).permit(:cliente_id, :preco_total, :peso_total, :created_at, :forma_pagamento)
  end
end
