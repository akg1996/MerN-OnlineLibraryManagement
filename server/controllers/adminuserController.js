const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")
let tokenLasts = "7d"

exports.login = function (req, res) {
  let admin = new Admin(req.body)
  admin
    .login()
    .then(() => {
      res.json({
        token: jwt.sign({ _id: admin.data._id, username: admin.data.username }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        username: admin.data.username
      })
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.register = function (req, res) {
  let admin = new Admin(req.body)
  admin
    .register()
    .then(() => {
      res.json({
        token: jwt.sign({ _id: admin.data._id, username: admin.data.username }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        username: admin.data.username
      })
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}
