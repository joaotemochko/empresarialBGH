class AddStatusToEstoques < ActiveRecord::Migration[7.1]
  def change
    add_column :estoques, :status, :string
  end
end
