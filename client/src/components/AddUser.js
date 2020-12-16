import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Axios from "axios"
import Page from "./Page"

function AddUser() {
  let history = useHistory()
  const [username, setUsername] = useState()
  const [fullname, setFullname] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await Axios.post("http://localhost:8080/add-user", { username, fullname, email, phone })
      history.push("/view-users")
    } catch (e) {
      alert("validation error")
    }
  }

  return (
    <Page title="Add New User">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto mt-3">
            <div className="text-center">
              <h1>Insert User Details</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Username</label>
                <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Full Name</label>
                <input onChange={e => setFullname(e.target.value)} type="text" className="form-control" id="exampleFormControlInput2" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Email ID</label>
                <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleFormControlInput2" placeholder="E-mail" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Phone Number</label>
                <input onChange={e => setPhone(e.target.value)} type="number" className="form-control" id="exampleFormControlInput2" placeholder="Phone Number" />
              </div>

              <div className="form-group">
                <button className="btn btn-lg btn-success btn-block">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default AddUser
