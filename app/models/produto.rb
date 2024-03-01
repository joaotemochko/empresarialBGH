class Produto < ApplicationRecord
  include PgSearch::Model
  has_many :estoques

  pg_search_scope :search_produto, against: :nome, using: :trigram
end
