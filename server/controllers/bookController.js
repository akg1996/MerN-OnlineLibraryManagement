const Book = require("../models/Book")

exports.addBook = function (req, res) {
  let bookData = new Book(req.body)
  bookData
    .add()
    .then(newBookDetails => {
      res.json(newBookDetails)
    })
    .catch(e => {
      res.status(500).send(e)
    })
}

exports.viewBooks = async function (req, res) {
  try {
    let bookData = await Book.view()
    res.json(bookData)
  } catch (e) {
    res.json(e)
  }
}

exports.deleteBook = function (req, res) {
  Book.delete(req.params.id)
    .then(() => {
      res.json("Success")
    })
    .catch(e => {
      res.json("You do not have permission to perform that action.")
    })
}
