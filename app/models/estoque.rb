class Estoque < ApplicationRecord
  include PgSearch::Model
  belongs_to :fornecedor
  belongs_to :produto

  pg_search_scope :search_validade, against: :id
end
