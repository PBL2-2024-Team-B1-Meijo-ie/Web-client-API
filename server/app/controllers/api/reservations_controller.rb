#動作確認
class Api::ReservationsController < ApplicationController
  def index
    # リクエストパラメータを取得
    json_data = JSON.parse(request.body.read)
    busID_on=json_data[:busID_on].to_i# 出発バス停ID
    busID_off=json_data[:busID_off].to_i# 到着バス停ID
    date=json_data[:date] # 予約日
    departure_time_str = json_data[:time]   # 出発時刻（文字列形式, 例: "14:30"）

    # 出発時刻が指定されているか確認
    if departure_time_str.present?
      departure_time = Time.parse(departure_time_str)  # 時間をTimeオブジェクトに変換
    else
      render json: { error: "departure_timeパラメータが指定されていません" }, status: :bad_request
      return
    end

    # 指定されたバス停IDに基づいてレコードを取得
    busstops = Busstop.where(busstop_id: [busID_on, busID_off])

    # 出発と到着のバス停IDに応じた処理
    if busID_on <busID_off then
      # 出発バス停と到着バス停のgodef値を取得
      godef_on=busstops.find{|busstop|
        busstop.id == busID_on
        }&.godef
      godef_off=busstops.find{|busstop|
      busstop.id == busID_off
      }&.godef

      # godef値が見つからない場合はエラーを返す
      if godef_on.nil? || godef_off.nil?
        render json:{error: "godefの値が見つかりません"},status: :not_found
        return
      end
      # godef差分から到着時刻を計算
      godef_diff=godef_off-godef_on
      arrival_time=departure_time+godef_diff.minutes
    elsif busID_on > busID_off then
      # 出発バス停と到着バス停のgodef値を取得
      godef_on=busstops.find{|busstop|
      busstop.id == busID_on
      }&.godef
      godef_off=busstops.find{|busstop|
      busstop.id == busID_off
      }&.godef

      # godef値が見つからない場合はエラーを返す
      if godef_on.nil? || godef_off.nil?
        render json:{error: "godefの値が見つかりません"},status: :not_found
        return
      end
      # godef差分から到着時刻を計算
      godef_diff=godef_on-godef_off
      arrival_time=departure_time+godef_diff.minutes
    else 
      render json:{error: "同じバス停が指定されました"},status: :bad_request
      return
    end
    # 到着時間をフォーマット
    formatted_arrival_time = arrival_time.strftime("%Y-%m-%d %H:%M") 


    # 新しいレコードを作成
    new_record = Storage.new(
      onbusstop_id: godef_on,
      reserveTime: departure_time_str,
      reserveDate: date,
    )

    #メール送信処理
    user=User.find_by(userid:1)
    if user&.mailed.present?
      begin
        ReservationMailer.with(email:user.mailed, godef_on:godef_on, godef_off:godef_off, arrival_time:formatted_arrival_time).template_sentence.deliver_now

      rescue StandardError =>e
        # メール送信失敗時のエラーレスポンス
        render json: {error:"メール送信に失敗しました:#{e.message}"}, status: :internal_server_error
        return
      end
    else
      # メールアドレスが登録されていない場合のエラーレスポンス
      render json: { error: "メールアドレスが見つかりません" }, status: :not_found
      return
    end
    # 成功時のレスポンス
    render json: { 
      godef_on: godef_on, 
      godef_off: godef_off, 
      arrival_time: formatted_arrival_time
    }
  end
  def create
    # リクエストパラメータを取得
    json_data = JSON.parse(request.body.read)
    # リクエストパラメータを表示
    puts json_data
    
    busID_on=json_data["busID_on"].to_i# 出発バス停ID
    busID_off=json_data["busID_off"].to_i# 到着バス停ID
    date=json_data["date"] # 予約日
    departure_time_str = json_data["time"]   # 出発時刻（文字列形式, 例: "14:30"）
    # 出発時刻が指定されているか確認
    puts "time#{departure_time_str}"
    puts "buson#{busID_on}"
    puts "busoff#{busID_off}"
    puts "date#{date}"
    if departure_time_str.present?
      departure_time = Time.parse(departure_time_str)  # 時間をTimeオブジェクトに変換
    else
      render json: { error: "departure_timeパラメータが指定されていません" }, status: :bad_request
      return
    end

    # 指定されたバス停IDに基づいてレコードを取得
    busstops = Busstop.where(busstop_id: [busID_on, busID_off])

    # 出発と到着のバス停IDに応じた処理
    if busID_on <busID_off then
      # 出発バス停と到着バス停のgodef値を取得
      godef_on=busstops.find{|busstop|
        busstop.id == busID_on
        }&.godef
      godef_off=busstops.find{|busstop|
      busstop.id == busID_off
      }&.godef

      # godef値が見つからない場合はエラーを返す
      if godef_on.nil? || godef_off.nil?
        render json:{error: "godefの値が見つかりません"},status: :not_found
        return
      end
      # godef差分から到着時刻を計算
      godef_diff=godef_off-godef_on
      arrival_time=departure_time+godef_diff.minutes
    elsif busID_on > busID_off then
      # 出発バス停と到着バス停のgodef値を取得
      godef_on=busstops.find{|busstop|
      busstop.id == busID_on
      }&.godef
      godef_off=busstops.find{|busstop|
      busstop.id == busID_off
      }&.godef

      # godef値が見つからない場合はエラーを返す
      if godef_on.nil? || godef_off.nil?
        render json:{error: "godefの値が見つかりません"},status: :not_found
        return
      end
      # godef差分から到着時刻を計算
      godef_diff=godef_on-godef_off
      arrival_time=departure_time+godef_diff.minutes
    else 
      render json:{error: "同じバス停が指定されました"},status: :bad_request
      return
    end
    # 到着時間をフォーマット
    formatted_arrival_time = arrival_time.strftime("%Y-%m-%d %H:%M") 


    # 新しいレコードを作成
    new_record = Storage.new(
      onbusstop_id: godef_on,
      reserveTime: departure_time_str,
      reserveDate: date,
    )
    if new_record.save
      # レコードが正常に保存された場合の処理
      puts "新しいレコードが保存されました"
    else
      # レコードが保存されなかった場合のエラーレスポンス
      render json: { error: "レコードの保存に失敗しました" }, status: :internal_server_error
      return
    end
    #メール送信処理
    user=User.find_by(userid:1)
    if user&.mailed.present?
      begin
        puts "mail start"
        # 環境変数からメールアドレスを取得
        mail_address = ENV['MAIL_ADDRESS']
        ReservationMailer.with(email:mail_address, godef_on:godef_on, godef_off:godef_off, arrival_time:formatted_arrival_time).template_sentence.deliver_now!
        puts "mail end"

      rescue StandardError =>e
        # メール送信失敗時のエラーレスポンス
        render json: {error:"メール送信に失敗しました:#{e.message}"}, status: :internal_server_error
        return
      end
    else
      # メールアドレスが登録されていない場合のエラーレスポンス
      render json: { error: "メールアドレスが見つかりません" }, status: :not_found
      return
    end
    # 成功時のレスポンス
    render json: { 
      godef_on: godef_on, 
      godef_off: godef_off, 
      arrival_time: formatted_arrival_time}
  end
end
