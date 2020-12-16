import React, { useState } from "react"
import Page from "./Page"
import Login from "./Login"
import Register from "./Register"

function HomeGuest(props) {
  const [state, setState] = useState(true)

  return <Page title="Login">{state ? <Login state={state} setState={setState} setLoggedIn={props.setLoggedIn} /> : <Register state={state} setState={setState} setLoggedIn={props.setLoggedIn} />}</Page>
}

export default HomeGuest
