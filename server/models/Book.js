const bookCollection = require("../db").db().collection("books")
const ObjectID = require("mongodb").ObjectID

let Book = function (data) {
  this.data = data
  this.errors = []
}

Book.prototype.cleanUp = function () {
  if (typeof this.data.name != "string") {
    this.data.name = ""
  }
  if (typeof this.data.author != "string") {
    this.data.author = ""
  }

  this.data = {
    name: this.data.name.trim().toLowerCase(),
    author: this.data.author.trim(),
    status: this.data.status
  }
}

Book.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.name == "") {
      this.errors.push("You must provide a Book Name")
    }
    if (this.data.author == "") {
      this.errors.push("You must provide author name")
    }
    if (this.data.name != "") {
      let bookNameExist = await bookCollection.findOne({ name: this.data.name })
      if (bookNameExist) {
        this.errors.push("That bookname is already taken.")
      }
    }
    resolve()
  })
}

Book.prototype.add = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    await this.validate()
    if (!this.errors.length) {
      // save book into database
      bookCollection
        .insertOne(this.data)
        .then(info => {
          resolve(info.ops[0])
        })
        .catch(e => {
          this.errors.push("Please try again later.")
          reject(this.errors)
        })
    } else {
      reject(this.errors)
    }
  })
}

Book.view = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let books = await bookCollection.find().sort({ _id: -1 }).toArray()
      if (books) {
        resolve(books)
      } else {
        reject("No book data found")
      }
    } catch (e) {
      reject("Some error occured please try again later")
    }
  })
}

Book.delete = function (postIdToDelete) {
  return new Promise(async (resolve, reject) => {
    try {
      await bookCollection.deleteOne({ _id: new ObjectID(postIdToDelete) })
      resolve()
    } catch (e) {
      reject()
    }
  })
}

module.exports = Book
