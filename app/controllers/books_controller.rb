class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]
  def index
    @books = Book.all
  end

  def show
    render partial: 'book', locals: { book: book }
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: @book
    else
      render_error(@book)
    end
  end

  def update
    if @book.update
      render json: @book
    else
      render_error(@book)
    end
  end

  def destroy
    @book.destroy
    render json: { message: "Book removed"}, status: :ok
  end

  def form
    @book = params[:id] ? Book.find(params[:id]) : Book.new
    render partial: "form"
    
  end

  private
    def set_book
      @book = Book.find(params[:id])
    end
    def book_params
      params.require(:book).permit(:title, :author, :genre)
    end
end
