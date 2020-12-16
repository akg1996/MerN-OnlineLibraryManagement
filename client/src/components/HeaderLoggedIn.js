import React from "react"
import { NavLink, useHistory } from "react-router-dom"

function HeaderLoggedIn(props) {
  let history = useHistory()
  function handleLogout() {
    props.setLoggedIn(false)
    localStorage.removeItem("libraryToken")
    localStorage.removeItem("libraryUsername")
    history.push("/")
  }
  return (
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">
        Library
      </NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/issue" exact>
              Issue Book
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/return" exact>
              Return
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/add-book" exact>
              Add New Book
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/add-user" exact>
              Add User
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/view-users" exact>
              View Users
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link" to="/transaction-list" exact>
              Transactions
            </NavLink>
          </li>
        </ul>
      </div>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  )
}

export default HeaderLoggedIn
