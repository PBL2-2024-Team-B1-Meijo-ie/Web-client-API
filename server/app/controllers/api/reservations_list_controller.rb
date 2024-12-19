#動作確認
class Api::ReservationsListController < ApplicationController
  def index
    # reservationのすべてを取得
    reservations = Storage.all

    # 配列にして返す 
    render json: reservations
  end

end
