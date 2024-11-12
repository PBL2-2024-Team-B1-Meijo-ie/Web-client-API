class Api::ReservationsController < ApplicationController
  def index
    busID_on=params[:busID_on].to_i
    busID_off=params[:busID_off].to_i
    date=params[:date]
    departure_time_str = params[:departure_time]  # 例: "14:30"
    # departure_time_strが空かどうか確認
    if departure_time_str.present?
      departure_time = Time.parse(departure_time_str)  # 時間をTimeオブジェクトに変換
    else
      render json: { error: "departure_timeパラメータが指定されていません" }, status: :bad_request
      return
    end

    busstops = Busstop.where(busstop_id: [busID_on, busID_off])

    if busID_on <busID_off then
      godef_on=busstops.find{|busstop|
        busstop.id == busID_on
        }&.godef
      godef_off=busstops.find{|busstop|
      busstop.id == busID_off
      }&.godef

      if godef_on.nil? || godef_off.nil?
        render json:{error: "godefの値が見つかりません"},status: :not_found
        return
      end
      godef_diff=godef_off-godef_on
      arrival_time=departure_time+godef_diff.minutes
    elsif busID_on > busID_off then
      godef_on=busstops.find{|busstop|
      busstop.id == busID_on
      }&.godef
      godef_off=busstops.find{|busstop|
      busstop.id == busID_off
      }&.godef

      if godef_on.nil? || godef_off.nil?
        render json:{error: "godefの値が見つかりません"},status: :not_found
        return
      end
      godef_diff=godef_on-godef_off
      arrival_time=departure_time+godef_diff.minutes
    else render json:{error: "同じバス停が指定されました"},status: :bad_request
    end
    # 到着時間をフォーマット
    formatted_arrival_time = arrival_time.strftime("%Y-%m-%d %H:%M") 


    existing_record=Storage.find_by(
      godef_on: godef_on,
      departure_time: departure_time,
      date: date
    )

    if existing_record
      count=existing_record.peopleCount-1
      existing_record.update(peopleCount: count)
    else
      count=4
      Storage.create(
      godef_on: godef_on,
      departure_time: departure_time,
      date:date,
      peopleCount: count
    )
    end
    
    render json: { 
      godef_on: godef_on, 
      godef_off: godef_off, 
      arrival_time: formatted_arrival_time
    }
  end
end
