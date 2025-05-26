const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.params.isbn;

  const book = books[ISBN];

  if (book) {
    return res.status(200).send(JSON.stringify(book, null, 4));
  }
  else {
    return res.status(404).json({message: "Book not found"});
  }
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;

  const booksArray = Object.values(books);

  const foundBook = booksArray.filter(book => book.author === author);

  if (foundBook) {
    return res.status(200).send(JSON.stringify(foundBook, null, 4));
  }
  else {
    return res.status(404).json({message: "Author not found in our library"})
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  const booksArray = Object.values(books);

  const foundBook = booksArray.filter(book => book.title === title);

  if (foundBook) {
    return res.status(200).send(JSON.stringify(foundBook, null, 4));
  } else {
  return res.status(404).json({message: "Title not found in our library"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const ISBN = req.params.isbn;

    const book = books[ISBN];

    if (!book) {
        return res.status(404).json({message: "Book not found in our library"});
    }

    const reviews = book[reviews];

    if (reviews) {
        return res.status(200).send(JSON.stringify(reviews, null, 4));
    } else {
    return res.status(404).json({message: `There are no reviews for ${book.title}`});
    }
  });

module.exports.general = public_users;
