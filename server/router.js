const router = require("express").Router()
const adminuserController = require("./controllers/adminuserController")
const bookController = require("./controllers/bookController")
const userController = require("./controllers/userController")
const transactionController = require("./controllers/transactionController")
const cors = require("cors")
router.use(cors())

router.get("/", function (req, res) {
  res.json("Hello, if you see this message that means your backend is up and running successfully. Congrats!")
})
// admin login route
router.post("/login", adminuserController.login)
router.post("/register", adminuserController.register)

//books related routes
router.get("/books", bookController.viewBooks)
router.post("/add-new-book", bookController.addBook)
router.delete("/book/:id", bookController.deleteBook)

// transaction related route
router.post("/issue-book", transactionController.issue)
router.post("/return-book", transactionController.returned)
router.get("/transaction-list", transactionController.viewTransactions)

// normal user related route
router.post("/add-user", userController.addUser)
router.get("/users-list", userController.viewUsers)
router.delete("/user/:id", userController.deleteUser)

module.exports = router
