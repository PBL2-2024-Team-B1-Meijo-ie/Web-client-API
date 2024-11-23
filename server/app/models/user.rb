class User < ApplicationRecord
  has_many :reserve
  validates :mailed, presence: true
end
