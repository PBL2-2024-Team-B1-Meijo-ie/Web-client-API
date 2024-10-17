# 環境構築手順
2. RubyとRuby on Railsのインストール
   1. ruby v3.3.5, 
   2. rails インストール
      1. `gem install rails -v 7.0.4.3` コマンドを実行
      2. `gem install bundler -v 2.5.6` コマンドを実行
   3. 必要なライブラリのインストール
      1. `bundle install` コマンドを実行
   4. サーバーの起動
      1. `rails s` コマンドを実行
      2. `http://127.0.0.1:3000`にアクセスして，以下の画面が表示されれば成功です．
      3. ![alt text](image.png)

## 参考
- [Ruby on Railsの環境構築をしてみよう！(Windows)](https://prog-8.com/docs/rails-env-win)
- [Rails チュートリアル](https://railstutorial.jp/chapters/beginning?version=7.0#sec-installing_rails)
- [Rails ガイド](https://railsguides.jp/api_app.html)

以下はrailsによって自動生成されたREADME.mdの内容
# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
v3.3.5
* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
