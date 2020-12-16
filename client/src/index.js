import React, { useState } from "react"
import ReactDOM from "react-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
//import Axios from "axios"

import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import Home from "./components/Home"
import AddBook from "./components/AddBook"
import IssueBook from "./components/IssueBook"
import ReturnBook from "./components/ReturnBook"
import AddUser from "./components/AddUser"
import ViewUsers from "./components/ViewUsers"
import Transactions from "./components/Transactions"

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("libraryToken")))

  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <HomeGuest setLoggedIn={setLoggedIn} />}
        </Route>
        <Route path="/add-book">{loggedIn ? <AddBook /> : <HomeGuest setLoggedIn={setLoggedIn} />}</Route>
        <Route path="/issue">{loggedIn ? <IssueBook /> : <HomeGuest setLoggedIn={setLoggedIn} />}</Route>
        <Route path="/return">{loggedIn ? <ReturnBook /> : <HomeGuest setLoggedIn={setLoggedIn} />}</Route>
        <Route path="/add-user">{loggedIn ? <AddUser /> : <HomeGuest setLoggedIn={setLoggedIn} />}</Route>
        <Route path="/view-users">{loggedIn ? <ViewUsers /> : <HomeGuest setLoggedIn={setLoggedIn} />}</Route>
        <Route path="/transaction-list">{loggedIn ? <Transactions /> : <HomeGuest setLoggedIn={setLoggedIn} />}</Route>
      </Switch>
      <Footer />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
