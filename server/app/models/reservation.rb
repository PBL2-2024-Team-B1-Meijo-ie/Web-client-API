class Reservation < ApplicationRecord
  belongs_to :user
  validates :userid, :onbusstop_id, :offbusstop_id,:onTime,:offTime,:reserveData, presence: true
end
