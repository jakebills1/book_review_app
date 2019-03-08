var currentBook = {};
var editingBook;
var showForm = false;
$(document).ready( function(){
  //listeners
  $(document).on( "click", ".book-item", function(){
    currentBook.id = this.dataset.id
    bookName = this.dataset.title
    $.ajax({
      url: '/books/' + currentBook.id + '/reviews',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(reviews){
      $("#book").text("Reviews of " + bookName)
      var list = $('#reviews');
      list.empty();
      reviews.forEach( function(review){
        var li = '<li data-review-id="' + review.id + '">' 
          + review.body + ' - ' + review.stars + ' stars'+ '</li>'
          list.append(li);
      })
    })
  })
  $("#toggle").click( function(){
    toggle();
  })
  $(document).on('submit', '#book-form form', function(event){
    event.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
      url: '/books',
      type: 'POST',
      dataType: 'JSON',
      data: data
    }).done( function(book) {
      toggle();
      getBook(book.id);
      var b = '<li class="book-item" data-id="' + book.id + '" data-title="'
        + book.title + '">' + book.title + ' - ' + book.author + ' - (' + book.genre + ')</li>'
      $("#book-list").append(b);
    }).fail( function(err){
      alert(err.responseJSON.errors)
    })
  })
  $(document).on("click", "#edit", function(){
    editingBook = $(this).siblings('.book-item').data().id
    // debugger
    toggle();
  })
  // functions
  function toggle() {
    showForm = !showForm;
    $("#book-form").remove()
    $("#book-list").toggle()

    if (showForm) {
      $.ajax({
        url: '/book_form',
        method: 'GET',
        data: { id: editingBook}
      }).done( function(html){
          $("#toggle").after(html);
      })
    } 
  }
  function getBook(id) {
    $.ajax({
      url: '/books/' + id,
      method: 'GET'
    }).done( function(book) {
      $("#book-list").append(book)
    })
  }
  
})