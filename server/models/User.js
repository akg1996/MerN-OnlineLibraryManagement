const usersCollection = require("../db").db().collection("users")
const ObjectID = require("mongodb").ObjectID
const validator = require("validator")

let User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = ""
  }
  if (typeof this.data.fullname != "string") {
    this.data.fullname = ""
  }
  if (typeof this.data.email != "string") {
    this.data.email = ""
  }
  if (typeof this.data.phone != "string") {
    this.data.phone = ""
  }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    fullname: this.data.fullname.trim(),
    email: this.data.email.trim().toLowerCase(),
    phone: this.data.phone
  }
}

User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.errors.push("You must provide a username.")
    }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
      this.errors.push("Username can only contain letters and numbers.")
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("You must provide a valid email address.")
    }
    if (this.data.fullname == "") {
      this.errors.push("You must provide a name.")
    }
    if (this.data.phone == "") {
      this.errors.push("You must provide a phone number.")
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("Username must be at least 3 characters.")
    }
    if (this.data.username.length > 10) {
      this.errors.push("Username cannot exceed 10 characters.")
    }

    // Only if username is valid then check to see if it's already taken
    if (this.data.username.length > 2 && this.data.username.length < 11 && validator.isAlphanumeric(this.data.username)) {
      let usernameExists = await usersCollection.findOne({ username: this.data.username })
      if (usernameExists) {
        this.errors.push("That username is already taken.")
      }
    }

    // Only if email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({ email: this.data.email })
      if (emailExists) {
        this.errors.push("That email is already being used.")
      }
    }
    resolve()
  })
}

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // Step #1: Validate user data
    this.cleanUp()
    await this.validate()

    // Step #2: Only if there are no validation errors
    // then save the user data into a database
    if (!this.errors.length) {
      await usersCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

User.view = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await usersCollection.find().sort({ _id: -1 }).toArray()
      if (users) {
        resolve(users)
      } else {
        reject("No book data found")
      }
    } catch (e) {
      reject("Some error occured please try again later")
    }
  })
}

User.delete = function (userIdToDelete) {
  return new Promise(async (resolve, reject) => {
    try {
      await usersCollection.deleteOne({ _id: new ObjectID(userIdToDelete) })
      resolve()
    } catch (e) {
      reject()
    }
  })
}

module.exports = User
