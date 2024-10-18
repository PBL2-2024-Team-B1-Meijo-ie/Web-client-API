require "test_helper"

class HealthsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @health = healths(:one)
  end

  test "should get index" do
    get healths_url, as: :json
    assert_response :success
  end

  test "should create health" do
    assert_difference("Health.count") do
      post healths_url, params: { health: { body: @health.body } }, as: :json
    end

    assert_response :created
  end

  test "should show health" do
    get health_url(@health), as: :json
    assert_response :success
  end

  test "should update health" do
    patch health_url(@health), params: { health: { body: @health.body } }, as: :json
    assert_response :success
  end

  test "should destroy health" do
    assert_difference("Health.count", -1) do
      delete health_url(@health), as: :json
    end

    assert_response :no_content
  end
end
