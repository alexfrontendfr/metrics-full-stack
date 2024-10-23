class User < ApplicationRecord
       devise :database_authenticatable, :registerable,
              :recoverable, :rememberable, :validatable,
              :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
     
       has_many :metrics, dependent: :destroy
       has_many :employees, dependent: :destroy
     
       validates :email, presence: true, uniqueness: true
       validates :encrypted_password, presence: true
     
       before_create :ensure_jti
     
       private
     
       def ensure_jti
         self.jti ||= SecureRandom.uuid
       end
     end