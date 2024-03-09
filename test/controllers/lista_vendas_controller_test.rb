require "test_helper"

class ListaVendasControllerTest < ActionDispatch::IntegrationTest
  test "should get lista_vendas/index" do
    get lista_vendas_lista_vendas/index_url
    assert_response :success
  end
end
