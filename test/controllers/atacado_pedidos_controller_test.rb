require "test_helper"

class AtacadoPedidosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get atacado_pedidos_index_url
    assert_response :success
  end
end
