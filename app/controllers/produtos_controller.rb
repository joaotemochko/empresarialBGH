class ProdutosController < DefaultController
  before_action :set_produto, only: %i[ show edit update destroy ]
  before_action :sum_quantidade

  def get_dataProduto
    @produto = Produto.all

    render json: {data: @produto}
  end

  def search_produto
    if params[:search].blank?
      redirect_to estoques_path and return
    else
      @parameter = params[:search].downcase
      @produto = Produto.all
      @results = @produto.search_produto(@parameter)
    end
  end

  # GET /produtos or /produtos.json
  def index
    @produtos = Produto.all
    @estoque = Estoque.all
  end

  # GET /produtos/1 or /produtos/1.json
  def show
    @estoque = Estoque.all
    @usuario = current_user.admin
    if @usuario == false
      redirect_to welcome_index_path
    end
  end

  # GET /produtos/new
  def new
    @produto = Produto.new
  end

  # GET /produtos/1/edit
  def edit
    @@subtrai = false
  end

  # POST /produtos or /produtos.json
  def create
    @produto = Produto.new(produto_params)

    if @produto.quantidade == nil
      @produto.quantidade = 0
    end
    if @produto.retirada == nil
      @produto.retirada = 0
    end
    if @produto.preco == nil
      @produto.preco = 0
    end
    respond_to do |format|
      if @produto.save
        format.html { redirect_to produto_url(@produto), notice: "Produto was successfully created." }
        format.json { render :show, status: :created, location: @produto }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @produto.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /produtos/1 or /produtos/1.json
  def update
    @produto_subtrai = Produto.find(params[:id])
    @verifica_retirada = Produto.where(:id => @produto_subtrai).pluck(:quantidade)
      if @produto.update(produto_params)
        if @@subtrai
            @retirada = (@produto.quantidade + @produto.retirada)

            if @verifica_retirada[0] < 0
              @subtracao = ( @produto_subtrai.quantidade + (-@produto.quantidade) )
            else
              @subtracao = ( @produto_subtrai.quantidade - @produto.quantidade )
            end
          Produto.where(:id => @produto_subtrai).update!(:quantidade => @subtracao, :retirada => @retirada)
          @usuario = current_user.email
          @log = Log.create!(:usuario => @usuario, :retirada => @produto.quantidade, :data_retirada => Date.today, :produto_id => @produto.id)

          redirect_to welcome_index_path
        else
          redirect_to produto_path(@produto)
        end
      end
  end

  # DELETE /produtos/1 or /produtos/1.json
  def destroy
    @produto.destroy!

    respond_to do |format|
      format.html { redirect_to produtos_url, notice: "Produto was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def subtrai
    @produto_subtrai = Produto.find(params[:id])
    @@subtrai = true
  end

  private
    def sum_quantidade
      @quantidade = Estoque.all
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_produto
      @produto = Produto.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def produto_params
      params.require(:produto).permit(:nome, :desc, :quantidade, :codigo, :preco, :preco_unidade)
    end
end
