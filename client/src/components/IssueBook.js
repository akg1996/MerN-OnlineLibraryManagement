import React, { useState } from "react"
import Axios from "axios"
import { useHistory } from "react-router-dom"
import Page from "./Page"

function IssueBook() {
  let history = useHistory()
  const [username, setUsername] = useState()
  const [book, setBook] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let response = await Axios.post("http://localhost:8080/issue-book", { username, book })
      if (response.data) {
        history.push("/transaction-list")
      }
    } catch (e) {
      alert("Username is Invalid / Book is unavailable at this momment")
    }
  }

  return (
    <Page title="Issue Book">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto mt-3">
            <div className="text-center">
              <h1>Issue Book</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Issue To</label>
                <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter valid Username" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Book Name</label>
                <input onChange={e => setBook(e.target.value)} type="text" className="form-control" id="exampleFormControlInput2" placeholder="valid book name" />
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-success btn-block">Issue Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default IssueBook
