class Fornecedor < ApplicationRecord
  include PgSearch::Model
  has_many :estoques

  pg_search_scope :search_fornecedor, against: :nome, ignoring: :accents, using: { tsearch: { prefix: true } }
end
