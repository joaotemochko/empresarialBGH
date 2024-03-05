class VendaProdutosController < DefaultController
  before_action :set_venda_produto, only: %i[ show edit update destroy ]
  before_action :set_arrayproduto

  # GET /venda_produtos or /venda_produtos.json
  def index
    @venda_produtos = VendaProduto.where(:codebar => @venda_produtos)
  end

  # GET /venda_produtos/1 or /venda_produtos/1.json
  def show
  end

  # GET /venda_produtos/new
  def new
    @venda_produto = VendaProduto.new
    @venda_produto.codebar = params[:codebar]
  end

  # GET /venda_produtos/1/edit
  def edit
  end

  # POST /venda_produtos or /venda_produtos.json
  def create
    @venda_produto = VendaProduto.new(venda_produto_params)

    respond_to do |format|
      if @venda_produto.save
        format.html { redirect_to venda_produto_url(@venda_produto), notice: "Venda produto was successfully created." }
        format.json { render :show, status: :created, location: @venda_produto }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @venda_produto.errors, status: :unprocessable_entity }
      end
    end
  end

  def get_barcode
    @venda_produto = VendaProduto.where(:codebar =>  params[:codebar])
    @venda_produto_total << @venda_produto.inspect
    puts @venda_produto_total
    render json: {data: @venda_produto_total}
  end

  # PATCH/PUT /venda_produtos/1 or /venda_produtos/1.json
  def update
    respond_to do |format|
      if @venda_produto.update(venda_produto_params)
        format.html { redirect_to venda_produto_url(@venda_produto), notice: "Venda produto was successfully updated." }
        format.json { render :show, status: :ok, location: @venda_produto }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @venda_produto.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /venda_produtos/1 or /venda_produtos/1.json
  def destroy
    @venda_produto.destroy!

    respond_to do |format|
      format.html { redirect_to venda_produtos_url, notice: "Venda produto was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

    def set_arrayproduto
      @venda_produto_total = []
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_venda_produto
      @venda_produto = VendaProduto.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def venda_produto_params
      params.require(:venda_produto).permit(:nome, :codebar)
    end
end