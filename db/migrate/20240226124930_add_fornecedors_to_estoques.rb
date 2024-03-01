class AddFornecedorsToEstoques < ActiveRecord::Migration[7.1]
  def change
    add_reference :estoques, :fornecedor, null: false, foreign_key: true
  end
end
