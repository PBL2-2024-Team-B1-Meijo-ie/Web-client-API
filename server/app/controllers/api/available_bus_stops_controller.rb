#動作確認
class Api::AvailableBusStopsController < ApplicationController
  def index
    # フォームやAJAXリクエストから送信されたデータをparamsで受け取る
    busID_on=params[:busID_on].to_i # 出発バス停ID 
    busID_off=params[:busID_off].to_i # 到着バス停ID
    date=params[:date] # 予約日

    # 必要なパラメータが不足している場合はエラーを返す
    if busID_on.nil? || busID_off.nil? || date.nil?
      render json: { message: "必要なパラメータが不足しています" }, status: :bad_request
      return
    end
    #バス停のIDに基づいて必要なデータだけ取得
    counts=Busstop.where(busstop_id: [busID_on,busID_off]) #対象のバス停情報
    back_table=BackTable .where(back_id: (1..57).to_a) # 全バックテーブルデータを取得

    # 出発バス停IDが到着バス停IDより小さい時
    if busID_on <busID_off then
      # 出発バス停IDに対応するバス停が存在するかチェック
      if counts.exists?(busstop_id: busID_on)
        # バックテーブルに基づき、出発バス停の時刻補正を行う
        back_table_with_added_times=back_table.map do |entry|
          {
            # 出発時間に補正値を加算し、フォーマットを整える
            startTime: (Time.parse(entry[:startTime]) + counts.find_by(busstop_id: busID_on).godef.seconds).strftime("%Y-%m-%d %H:%M") # ここの調整が必要
          }
        end
        render json: {message: back_table_with_added_times} # 結果を返却
      else
        render json: {message:"選択したバス停が見当たりません"},status: :not_found
      end
    
    # 出発バス停IDが到着バス停IDより大きい場合
    elsif busID_on > busID_off then
      # 出発バス停IDに対応するバス停が存在するかチェック
      if counts.exists?(busstop_id: busID_on)
        # バックテーブルに基づき、出発バス停の時刻補正を行う
        back_table_with_added_times=back_table.map do |entry|
          {
            # 出発時間に補正値を加算し、フォーマットを整える
            startTime: (Time.parse(entry[:startTime]) + counts.find_by(busstop_id: busID_on).godef.seconds).strftime("%Y-%m-%d %H:%M")  # ここの調整が必要
          }
        end
        render json: {message: back_table_with_added_times} # 結果を返却
      else
        render json: {message:"選択したバス停が見当たりません"},status: :not_found
      end
      # 出発バス停IDと到着バス停IDが同じ場合
    else
      render json:{message: "不正なリクエストです"},status: :bad_request
    end
  end
end
