class ReviewsController < ApplicationController
  before_action :set_book
  before_action :set_review, only: [:show, :update, :destroy]
  def index
    render json: @book.reviews
  end

  def show
    render json: @review
  end

  def create
    @review = @book.reviews.new(review_params)
    if @review.save
      render json: @review
    else
      render_error(@review)
    end
  end

  def update
    if @review.update(review_params)
      render json: @review
    else
      render_error(@review)
    end
  end

  def destroy
    @review.destroy
    render json: { message: "Review Removed"}, status: :ok
  end

  private
    def set_book
      @book = Book.find(params[:book_id])
    end
    def set_review
      @review = Review.find(params[:id])
    end
    def review_params
      params.require(:review).permit(:stars, :body)
    end
end
