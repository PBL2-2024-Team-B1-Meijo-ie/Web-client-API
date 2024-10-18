class CreateHealths < ActiveRecord::Migration[7.0]
  def change
    create_table :healths do |t|
      t.text :body

      t.timestamps
    end
  end
end
