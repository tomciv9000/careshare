# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_02_011102) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "diapers", force: :cascade do |t|
    t.bigint "shift_id", null: false
    t.boolean "wet"
    t.boolean "soiled"
    t.time "time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shift_id"], name: "index_diapers_on_shift_id"
  end

  create_table "foods", force: :cascade do |t|
    t.bigint "shift_id", null: false
    t.boolean "snack"
    t.boolean "breakfast"
    t.boolean "lunch"
    t.boolean "dinner"
    t.string "description"
    t.time "time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shift_id"], name: "index_foods_on_shift_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.string "caregiver"
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sleeps", force: :cascade do |t|
    t.bigint "shift_id", null: false
    t.boolean "nap"
    t.boolean "bedtime"
    t.time "start"
    t.time "end"
    t.float "duration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shift_id"], name: "index_sleeps_on_shift_id"
  end

  add_foreign_key "diapers", "shifts"
  add_foreign_key "foods", "shifts"
  add_foreign_key "sleeps", "shifts"
end
