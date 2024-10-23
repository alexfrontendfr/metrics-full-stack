class Employee < ApplicationRecord
  belongs_to :user
  has_many :skills, dependent: :destroy
  has_many :training_sessions, dependent: :destroy
  has_many :metrics, dependent: :destroy

  validates :name, presence: true
  validates :department, presence: true
  validates :role, presence: true
end