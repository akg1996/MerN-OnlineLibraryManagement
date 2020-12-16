import React, { useState } from "react"
import Axios from "axios"
import { useHistory } from "react-router-dom"
import Page from "./Page"

function ReturnBook() {
  let history = useHistory()
  const [book, setBook] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let response = await Axios.post("http://localhost:8080/return-book", { book })
      if (response) {
        history.push("/transaction-list")
      }
    } catch (e) {
      alert("Please provide a valid book name")
    }
  }

  return (
    <Page title="Return Book">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto mt-3">
            <div className="text-center">
              <h1>Return Book</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Book Name</label>
                <input onChange={e => setBook(e.target.value)} type="text" className="form-control" id="exampleFormControlInput2" placeholder="valid book name" />
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-success btn-block">Return Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default ReturnBook
