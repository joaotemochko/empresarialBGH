class AddReferenceToListavenda < ActiveRecord::Migration[7.1]
  def change
    add_reference :lista_vendas, :venda_produto, null: false, foreign_key: true
  end
end
