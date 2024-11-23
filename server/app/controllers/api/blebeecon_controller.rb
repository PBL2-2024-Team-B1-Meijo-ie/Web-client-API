class Api::BlebeeconController < ApplicationController
    def index
        ##アプリ側から送られるビーコンのデータを格納する
        #アプリから送られたデータを'params'で受け取る
        beeconID=params[:beeconID].to_i
        deviceID=params[:deviceID].to_i

        #変数にデータが存在するか判定
        if beeconID.nil? || deviceID.nil?
            render json: { message: "必要なパラメータが不足しています"}, status: :bad_request
            return
        end

        ##変数に格納したデータをデータベースに新しく追加する
        Blebeecon.create(
            beecon_id: beeconID,
            device_id: deviceID
        )
        render json:{message:"データを追加できました"},status: :created
    end
end
