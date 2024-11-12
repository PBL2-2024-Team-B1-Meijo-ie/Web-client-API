class BusPosition < ApplicationRecord
  validates :busposition_id,:lat, :lon, :time, presence: ture
end
