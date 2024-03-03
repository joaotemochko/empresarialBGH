class UsersController < DefaultController
  before_action :set_user, only: [:edit, :update]


  def index
    @user = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params_user)

    if @user.save
      redirect_to welcome_index_path, notice: "Usuário cadastrado com sucesso!"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
        redirect_to welcome_index_path
      else
        render :edit
      end
  end

  private

  def params_user
    params.require(:user).permit(:email, :password, :password_confirmation, :admin)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
