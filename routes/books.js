var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Comment = require('../models/comment');

// list books
router.get('/', (req, res) => {
  // fetch list of books from database
  Book.find({}, (err, books) => {
    if(err) return next(err);
    res.render('books', {books: books});
  })
});

// create book form
router.get('/new', (req, res) => {
  res.render('addBook')
});

// create book
router.post('/', (req, res, next) => {
  // save it to database
  Book.create(req.body, (err, createdBok) => {
    if(err) return next(err);
    res.redirect('/books');
  })
});



// get book details page
// router.get('/:id', (req, res, next) => {
//   var id = req.params.id;
//   Book.findById(id, (err, book) => {
//     if (err) return next(err);
//     Comment.find({ bookId: id}, (err, comments) => {
      // res.render('bookDetails', {book, comments})
//     })
//   })
// });



router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id).populate('comments').exec((err, book) => {
    // console.log(err, book)
    if(err) return next(err);
    res.render('bookDetails', { book: book })
  })
});



// edit book form
router.get("/:id/edit", (req, res, next) => {
  // find the book details
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if(err) return next(err);
    res.render('editBookForm', { book: book })
  })
});

// update book
router.post('/:id', (req, res) => {
  // capture the updated data from form
  var id = req.params.id;

  // using id find the book and update it with data coming form the form
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if(err) return next(err);
    res.redirect("/books/" + id)
  })
});

// delete book
router.get('/:id/delete', (req, res, next) => {
  Book.findByIdAndDelete(req.params.id, (err, book) =>{
    if(err) return next(err);
    Comment.deleteMany({ bookId: book.id}, (err, info) => {
      res.redirect('/books');
    })
    
  })
})

// add comment
router.post("/:id/comments", (req, res, next) => {
  var id = req.params.id;
  req.body.bookId = id;
  Comment.create(req.body, (err, comment) => {
    if(err) return next(err);
    // update book with comment id into comments section 
    Book.findByIdAndUpdate(id, { $push: {comments: comment._id}}, (err, updatedbook) => {
      if (err) return next(err);
      res.redirect('/books/' + id)
    })
    
  })
})

module.exports = router;