class AddBigintToCnpjandTelColumn < ActiveRecord::Migration[7.1]
  def change
    change_column :fornecedors, :cnpj, :bigint
    change_column :fornecedors, :tel, :bigint
  end
end
