// requires
var express = require('express');
var mongoose  = require('mongoose');
var path = require('path');
var cors = require('cors');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var commentsRouter = require('./routes/comments')

//connect to db
mongoose.connect("mongodb://localhost/bookstore",
{useNewUrlParser: true, useUnifiedTopology: true},
 (err) => {
  console.log("Connected", err ? false : true);
})

// instantiate express app
var app = express();

// middlewares

// app.use(cors());

// setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// capture form data
app.use(express.urlencoded({ extended: false }));

//setup static directory
app.use(express.static(path.join(__dirname, "public")));

// routing middlewares
app.use('/', indexRouter);
app.use('/books', cors(), booksRouter);
app.use('/comments', commentsRouter);

// error hanlder middleware

// 404
app.use((req, res, next) => {
  res.send("Page not found")
})

// custom error handler middleware
app.use((err, req, res, next) => {
  res.send(err);
}) 

// listener
app.listen(3000, () => {
  console.log('server is listening on port 3k')
})