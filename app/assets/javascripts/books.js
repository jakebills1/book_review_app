var currentBook = {};
$(document).ready( function(){
  $(".book-item").click( function(){
    currentBook.id = this.dataset.id
    // debugger
    $.ajax({
      url: '/books/' + currentBook.id + '/reviews',
      method: 'GET',
      dataType: 'JSON'
    }).done( function(reviews){
      var list = $('#reviews');
      list.empty();
      reviews.forEach( function(review){
        var li = '<li data-review-id="' + review.id + '">' 
          + review.body + ' - ' + review.stars + ' stars'+ '</li>'
          list.append(li);
      })
    })
  })
})