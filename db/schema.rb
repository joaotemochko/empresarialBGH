# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_03_01_224348) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "plpgsql"
  enable_extension "unaccent"

  create_table "estoques", force: :cascade do |t|
    t.string "desc"
    t.integer "lote", null: false
    t.date "data_compra", null: false
    t.date "validade", null: false
    t.float "quantidade", null: false
    t.float "valor", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "fornecedor_id", null: false
    t.bigint "produto_id", null: false
    t.string "status"
    t.index ["fornecedor_id"], name: "index_estoques_on_fornecedor_id"
    t.index ["produto_id"], name: "index_estoques_on_produto_id"
  end

  create_table "fornecedors", force: :cascade do |t|
    t.string "nome"
    t.bigint "cnpj"
    t.string "endereco"
    t.bigint "tel"
    t.string "obs"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "produtos", force: :cascade do |t|
    t.string "nome", null: false
    t.string "desc"
    t.float "quantidade"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "admin"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "estoques", "fornecedors"
  add_foreign_key "estoques", "produtos"
end
