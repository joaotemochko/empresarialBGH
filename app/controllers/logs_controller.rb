class LogsController < WelcomeController
  def index
    @logs = Log.where(:produto_id => log_params)
  end

  private
  def log_params
    params.require(:produto_id)
  end
end