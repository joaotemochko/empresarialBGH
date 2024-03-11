class AddStatusToVendas < ActiveRecord::Migration[7.1]
  def change
    add_column :venda_produtos, :status, :string
  end
end
