class CreateMetrics < ActiveRecord::Migration[7.2]
    def change
      create_table :metrics do |t|
        t.string :name, null: false
        t.float :value, null: false
        t.datetime :timestamp, null: false
        t.string :level, null: false
        t.text :evidence
        t.references :user, null: false, foreign_key: true
        t.references :employee, null: false, foreign_key: true
  
        t.timestamps
      end
  
      add_index :metrics, :timestamp
      add_index :metrics, :name
      add_index :metrics, :level
    end
  end