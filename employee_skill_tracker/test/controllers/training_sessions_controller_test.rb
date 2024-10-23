require "test_helper"

class TrainingSessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get training_sessions_index_url
    assert_response :success
  end

  test "should get show" do
    get training_sessions_show_url
    assert_response :success
  end

  test "should get create" do
    get training_sessions_create_url
    assert_response :success
  end

  test "should get update" do
    get training_sessions_update_url
    assert_response :success
  end
end
