class CreateSkills < ActiveRecord::Migration[7.2]
    def change
      create_table :skills do |t|
        t.string :name, null: false
        t.integer :proficiency, null: false
        t.references :employee, null: false, foreign_key: true
  
        t.timestamps
      end
    end
  end