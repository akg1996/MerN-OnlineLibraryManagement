import React, { useState, useEffect } from "react"
import Axios from "axios"
import Page from "./Page"

function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    loadTransactions()
  }, [])
  const loadTransactions = async () => {
    let transaction = await Axios.get("http://localhost:8080/transaction-list")
    try {
      if (transaction.data) {
        setTransactions(transaction.data)
      } else {
        console.log("No transaction found")
      }
    } catch {
      console.log("some error occured")
    }
  }

  return (
    <Page title="Transaction Details">
      <div className="container-fluid mt-5">
        <div className="text-center">
          <h1>All Transactions</h1>
        </div>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>User Name</th>
              <th>E-Mail</th>
              <th>Phone</th>
              <th>Book Name</th>
              <th>Book Author Name</th>
              <th>Date</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((data, index) => (
              <tr key={data._id}>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.bookname}</td>
                <td>{data.bookauthor}</td>
                <td>{data.date}</td>
                <td>{data.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  )
}

export default Transactions
