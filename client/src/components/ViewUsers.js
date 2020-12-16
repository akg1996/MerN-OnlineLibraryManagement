import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import Page from "./Page"

function ViewUsers() {
  const [usersData, setUserData] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])
  const loadUsers = async () => {
    let users = await Axios.get("http://localhost:8080/users-list")
    try {
      if (users.data) {
        setUserData(users.data)
      } else {
        console.log("No users found")
      }
    } catch {
      console.log("some error occured")
    }
  }

  const deleteUser = async id => {
    if (window.confirm("This user will be deleted permanently. are you sure??")) {
      console.log(id)
      await Axios.delete(`http://localhost:8080/user/${id}`)
      loadUsers()
    }
  }

  return (
    <Page title="User List">
      <div className="container mt-5">
        <div className="text-center">
          <h1>Users List</h1>
        </div>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sl.No</th>
              <th>Full Name</th>
              <th>User Name</th>
              <th>E-Mail</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((users, index) => (
              <tr key={users._id}>
                <th scope="row">{index + 1}</th>
                <td>{users.fullname}</td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>{users.phone}</td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => deleteUser(users._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6">
                <div className="float-left">
                  <Link to="/add-user" className="btn btn-lg btn-outline-primary">
                    Add User
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Page>
  )
}

export default ViewUsers
