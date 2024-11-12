class Api::BusesController < ApplicationController
  def index
  date=params[:date]
  records=Storage.where.not(peopleCount:0).where(date:date)
  render json: { start_times: records }
  end
end
