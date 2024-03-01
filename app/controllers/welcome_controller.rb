class WelcomeController < DefaultController
  before_action :authenticate_user!


  def index
    @user = User.all
    @produtos = Produto.all
    @estoque = Estoque.all
  end

  def new
    @user = User.new
  end



  def edit
  end

  def update

  end

  private

  def params_user
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
