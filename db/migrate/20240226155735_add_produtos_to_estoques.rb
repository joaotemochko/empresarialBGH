class AddProdutosToEstoques < ActiveRecord::Migration[7.1]
  def change
    add_reference :estoques, :produto, null: false, foreign_key: true
  end
end
