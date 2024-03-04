class WelcomeController < DefaultController
  before_action :authenticate_user!
  def index
    @user = User.all
    @produtos = Produto.all
    @estoque = Estoque.all
    @logs = Log.all
    @vendas_produtos = VendaProduto.all
  end

end
