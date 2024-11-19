class ReservationMailer < ApplicationMailer
  default from: 'no-reply@example.com'

  def template_sentence
    @godef_on=params[:godef_on]
    @godef_off=params[:godef_off]
    @arrival_time=params[:arrival_time]
    mail(to:params[:email],subject:'予約情報の追加')
  end
end
