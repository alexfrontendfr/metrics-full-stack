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

ActiveRecord::Schema[7.2].define(version: 2024_10_15_044840) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "employees", force: :cascade do |t|
    t.string "name", null: false
    t.string "department", null: false
    t.string "role", null: false
    t.date "start_date"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_employees_on_user_id"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti", unique: true
  end

  create_table "metrics", force: :cascade do |t|
    t.string "name", null: false
    t.float "value", null: false
    t.datetime "timestamp", null: false
    t.string "level", null: false
    t.text "evidence"
    t.bigint "user_id", null: false
    t.bigint "employee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_metrics_on_employee_id"
    t.index ["level"], name: "index_metrics_on_level"
    t.index ["name"], name: "index_metrics_on_name"
    t.index ["timestamp"], name: "index_metrics_on_timestamp"
    t.index ["user_id"], name: "index_metrics_on_user_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name", null: false
    t.integer "proficiency", null: false
    t.bigint "employee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_skills_on_employee_id"
  end

  create_table "training_sessions", force: :cascade do |t|
    t.string "name", null: false
    t.date "date", null: false
    t.bigint "skill_id", null: false
    t.bigint "employee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_training_sessions_on_employee_id"
    t.index ["skill_id"], name: "index_training_sessions_on_skill_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "jti", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "employees", "users"
  add_foreign_key "metrics", "employees"
  add_foreign_key "metrics", "users"
  add_foreign_key "skills", "employees"
  add_foreign_key "training_sessions", "employees"
  add_foreign_key "training_sessions", "skills"
end
