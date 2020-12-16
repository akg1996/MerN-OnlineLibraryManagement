const Details = require("../models/Details")

exports.issue = function (req, res) {
  let issue = new Details(req.body)
  issue
    .borrow()
    .then(() => {
      res.json("true")
    })
    .catch(e => {
      res.status(500).send(e)
    })
}

exports.returned = function (req, res) {
  Details.returned(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      res.status(500).send(e)
    })
}
exports.viewTransactions = async function (req, res) {
  try {
    let transactionData = await Details.view()
    res.json(transactionData)
  } catch (e) {
    res.status(500).send(e)
  }
}
