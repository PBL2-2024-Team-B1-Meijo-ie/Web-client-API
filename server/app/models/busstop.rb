class Busstop < ApplicationRecord
  # busstop_idをプライマリーキーとして指定
  self.primary_key = 'busstop_id'

  # バリデーションの設定
  validates :name, :godef, :backdef, presence: true
end
