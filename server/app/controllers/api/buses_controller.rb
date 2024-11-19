#動作確認
class Api::BusesController < ApplicationController
  def index
    reserveDate=params[:reserveDate]
    if reserveDate.nil?
      render json: { message: "必要なパラメータが不足しています" }, status: :bad_request
      return
    end
    records=Storage.where.not(peopleCount:0).where(ReserveDate:reserveDate)
    render json: { start_times: records }
  end
end
