var currentBook = {};
var showForm = false;
$(document).ready( function(){
  $(document).on( "click", ".book-item", function(){
    currentBook.id = this.dataset.id
    bookName = this.dataset.title
    // debugger
    $.ajax({
      url: '/books/' + currentBook.id + '/reviews',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(reviews){
      // debugger
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
    // debugger
    $.ajax({
      url: '/books',
      type: 'POST',
      dataType: 'JSON',
      data: data
    }).done( function(book) {
      toggle();
      var b = '<li class="book-item" data-id="' + book.id + '" data-title="'
        + book.title + '">' + book.title + ' - ' + book.author + ' - (' + book.genre + ')</li>'
      // debugger
      $("#book-list").append(b);
    }).fail( function(err){
      alert(err.responseJSON.errors)
    })
  })
  function toggle() {
    showForm = !showForm;
    $("#book-form").remove()
    $("#book-list").toggle()

    if (showForm) {
      $.ajax({
        url: '/book_form',
        method: 'GET'
      }).done( function(html){
          $("#toggle").after(html);
      })
    } 
  }
})