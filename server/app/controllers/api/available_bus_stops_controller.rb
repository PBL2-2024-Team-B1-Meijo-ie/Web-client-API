class Api::AvailableBusStopsController < ApplicationController
  def index
    # フォームやAJAXリクエストから送信されたデータを'params'で受け取る
    busID_on=params[:busID_on].to_i
    busID_off=params[:busID_off].to_i
    date=params[:date]

    if busID_on.nil? || busID_off.nil? || date.nil?
      render json: { message: "必要なパラメータが不足しています" }, status: :bad_request
      return
    end
    #バス停のIDに基づいて必要なデータだけ取得
    counts=Busstop.where(busstop_id: [busID_on,busID_off])
    back_table=BackTable .where(back_id: (1..57).to_a)

    # busID_onがbusID_offより小さい時
    if busID_on <busID_off then
      # busID_onに対応するバス停が存在するかチェック
      if counts.exists?(busstop_id: busID_on)
        back_table_with_added_times=back_table.map do |entry|
          {
            startTime: (Time.parse(entry[:startTime]) + counts.find_by(busstop_id: busID_on).godef.seconds).strftime("%Y-%m-%d %H:%M") # ここの調整が必要
          }
        end
        render json: {message: back_table_with_added_times}
      else
        render json: {message:"選択したバス停が見当たりません"},status: :not_found
      end
    
    # busID_onがbusID_offより大きい時
    elsif busID_on > busID_off then
      # busID_onに対応するバス停が存在するかチェック
      if counts.exists?(busstop_id: busID_on)
        back_table_with_added_times=back_table.map do |entry|
          {
            startTime: (Time.parse(entry[:startTime]) + counts.find_by(busstop_id: busID_on).godef.seconds).strftime("%Y-%m-%d %H:%M")  # ここの調整が必要
          }
        end
        render json: {message: back_table_with_added_times}
      else
        render json: {message:"選択したバス停が見当たりません"},status: :not_found
      end
    else
      render json:{message: "不正なリクエストです"},status: :bad_request
    end
  end
end
