class Blebeecon < ApplicationRecord
    validates :beecon_id,:device_id, presence: true
end
