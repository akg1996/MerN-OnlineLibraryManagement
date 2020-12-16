import React, { useState } from "react"
import Axios from "axios"
import { useHistory } from "react-router-dom"
import Page from "./Page"

function AddBook() {
  let history = useHistory()
  const [name, setName] = useState()
  const [author, setAuthor] = useState()
  const [status, setStatus] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let response = await Axios.post("http://localhost:8080/add-new-book", { name, author, status })
      if (response.data) {
        history.push("/")
      }
    } catch (e) {
      alert("validation error")
    }
  }

  return (
    <Page title="Add Book">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto mt-3">
            <div className="text-center">
              <h1>Insert Book Details</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Book Name</label>
                <input onChange={e => setName(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Book Name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Author Name</label>
                <input onChange={e => setAuthor(e.target.value)} type="text" className="form-control" id="exampleFormControlInput2" placeholder="Author Name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Availability</label>
                <select onChange={e => setStatus(e.target.value)}>
                  <option value="">--</option>
                  <option value="available">Available</option>
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-success btn-block">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default AddBook
