import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import Page from "./Page"

function Home() {
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    loadBooks()
  }, [])
  const loadBooks = async () => {
    let books = await Axios.get("http://localhost:8080/books")
    try {
      if (books.data) {
        setBookData(books.data)
      } else {
        console.log("No books found")
      }
    } catch {
      console.log("some error occured")
    }
  }

  const deleteBook = async (id, status) => {
    if (status === "available") {
      if (window.confirm("This book will be deleted permanently. are you sure??")) {
        await Axios.delete(`http://localhost:8080/book/${id}`)
        loadBooks()
      }
    } else {
      alert("This book cannot be deleted")
    }
  }

  return (
    <Page title="Books List">
      <div className="container mt-5">
        <div className="text-center">
          <h1>Books List</h1>
        </div>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sl.No</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookData.map((book, index) => (
              <tr key={book._id}>
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>
                  <button className={"btn btn-sm text-light " + (book.status === "available" ? "btn-success" : "btn-danger")}>{book.status}</button>
                </td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => deleteBook(book._id, book.status)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">
                <div className="float-right">
                  <Link to="/add-book" className="btn btn-lg btn-primary">
                    Add New Book
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

export default Home
