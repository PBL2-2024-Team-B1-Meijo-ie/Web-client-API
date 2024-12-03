# 動作確認
class Api::RaspiController < ApplicationController
    def create
        ##ラズパイから送られる情報を変数に格納する
        #ラズパイから送られたデータを'JSON形式'で受け取る
        json_data = JSON.parse(request.body.read)
        buspositionID =  json_data["buspositionID"].to_i
        lat =  json_data["lat"].to_f
        lon =  json_data["lon"].to_f
        time =  json_data["time"]

        #変数にデータが
        if buspositionID.nil? || lat.nil? || lon.nil? || time.nil?
            render json: { message: "必要なパラメータが不足しています"}, status: :bad_request
            return
        end

        #格納した変数の情報をデータベースに新しく追加する
        BusPosition.create(
            busposition_id: buspositionID,
            lat: lat,
            lon: lon,
            time: time
        )
        render json:{message:"データを追加できました"},status: :created
    end
end