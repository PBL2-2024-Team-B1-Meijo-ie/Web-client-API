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

ActiveRecord::Schema[7.0].define(version: 2024_10_18_020814) do
  create_table "Back_hold", id: false, force: :cascade do |t|
    t.integer "back_id"
    t.text "reserveData"
    t.integer "usercount"
  end

  create_table "Go_hold", id: false, force: :cascade do |t|
    t.integer "go_id"
    t.text "reserveData"
    t.integer "usercount"
  end

  create_table "Go_table", id: false, force: :cascade do |t|
    t.integer "go_id"
    t.text "startTime"
  end

  create_table "back_tables", id: false, force: :cascade do |t|
    t.integer "back_id"
    t.text "startTime"
  end

  create_table "bus", id: false, force: :cascade do |t|
    t.integer "bus_id"
  end

  create_table "bus_position", id: false, force: :cascade do |t|
    t.integer "busposition_id"
    t.text "lat"
    t.text "lon"
    t.text "time"
  end

  create_table "busstops", id: false, force: :cascade do |t|
    t.integer "busstop_id"
    t.text "name"
    t.integer "godef"
    t.integer "backdef"
  end

  create_table "healths", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reserve", id: false, force: :cascade do |t|
    t.integer "userid"
    t.integer "onbusstop_id"
    t.integer "offbusstop_id"
    t.text "onTime"
    t.text "offTime"
    t.text "reserveData"
  end

  create_table "storages", id: false, force: :cascade do |t|
    t.integer "onbusstop_id"
    t.text "reserveTime"
    t.text "reserveDate"
    t.integer "peopleCount"
  end

  create_table "user", id: false, force: :cascade do |t|
    t.integer "userid"
    t.text "mailad"
  end

end
