Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "books#index"
  get "book_form", to: "books#form"
  resources :books do
    resources :reviews 
  end
end
