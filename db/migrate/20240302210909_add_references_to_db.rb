class AddReferencesToDb < ActiveRecord::Migration[7.1]
  def change
    add_reference :logs, :produto, null: false, foreign_key: true
    add_column :produtos, :retirada, :float
  end
end
