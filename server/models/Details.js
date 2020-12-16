const usersCollection = require("../db").db().collection("users")
const bookCollection = require("../db").db().collection("books")
const transactionCollection = require("../db").db().collection("transaction")
const ObjectID = require("mongodb").ObjectID

let Details = function (data) {
  this.data = data
  this.errors = []
}

Details.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = ""
  }
  if (typeof this.data.book != "string") {
    this.data.book = ""
  }

  this.data = {
    username: this.data.username.trim().toLowerCase(),
    book: this.data.book.trim().toLowerCase()
  }
}

Details.prototype.validate = async function () {
  let validUser = await usersCollection.findOne({ username: this.data.username })
  if (validUser) {
    this.userDetails = validUser
  } else {
    this.errors.push("Username does not exist")
  }
  let validBook = await bookCollection.findOne({ name: this.data.book })
  if (validBook) {
    if (validBook.status != "available") {
      this.errors.push("The book is not available at this time")
    } else {
      this.bookDetails = validBook
    }
  } else {
    this.errors.push("The book is not exist")
  }
}

Details.prototype.borrow = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    await this.validate()
    if (!this.errors.length) {
      // insert data into transaction database
      let transaction = await transactionCollection.insertOne({ username: this.userDetails.username, name: this.userDetails.fullname, email: this.userDetails.email, phone: this.userDetails.phone, bookname: this.bookDetails.name, bookauthor: this.bookDetails.author, date: new Date().toLocaleString(), type: "borrow" })
      if (transaction) {
        await bookCollection.findOneAndUpdate({ _id: new ObjectID(this.bookDetails._id) }, { $set: { status: "unavailable" } })
        resolve()
      }
    } else {
      reject(this.errors)
    }
  })
}

Details.returned = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      let details = await transactionCollection.findOne({ bookname: data.book })
      if (details) {
        await transactionCollection.insertOne({ username: details.username, name: details.name, email: details.email, phone: details.phone, bookname: details.bookname, bookauthor: details.bookauthor, date: new Date().toLocaleString(), type: "returned" })
        await bookCollection.findOneAndUpdate({ name: details.bookname }, { $set: { status: "available" } })
        resolve()
      } else {
        reject()
      }
    } catch (e) {
      reject(e)
    }
  })
}

Details.view = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let transactions = await transactionCollection.find().sort({ _id: -1 }).toArray()
      if (transactions) {
        resolve(transactions)
      } else {
        reject("No book data found")
      }
    } catch (e) {
      reject("Some error occured please try again later")
    }
  })
}

module.exports = Details
