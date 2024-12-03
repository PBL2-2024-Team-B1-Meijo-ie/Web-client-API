#動作確認
class Api::BusesController < ApplicationController
  def index
    # リクエストから予約日を取得
    reserveDate=params[:reserveDate]
    # 予約日が指定されていない場合はエラーレスポンスを返す
    if reserveDate.nil?
      render json: { message: "必要なパラメータが不足しています" }, status: :bad_request
      return
    end
      # `peopleCount` が0でない、かつ指定された予約日のデータを取得→できてない
    records=Storage.where(ReserveDate:reserveDate)
    # 取得したデータをJSON形式で返却
    render json: { start_times: records }
  end
end
