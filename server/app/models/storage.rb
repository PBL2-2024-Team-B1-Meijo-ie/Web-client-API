class Storage < ApplicationRecord
  validates :onbusstop_id,:reserveTime,:reserveDate, presence: true 
end