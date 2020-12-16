const User = require("../models/User")

exports.addUser = function (req, res) {
  let user = new User(req.body)
  user
    .register()
    .then(() => {
      res.json("success")
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.viewUsers = async function (req, res) {
  try {
    let userData = await User.view()
    res.json(userData)
  } catch (e) {
    res.json(e)
  }
}

exports.deleteUser = function (req, res) {
  User.delete(req.params.id)
    .then(() => {
      res.json("Success")
    })
    .catch(e => {
      res.json("You do not have permission to perform that action.")
    })
}
