import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layouts";
import SignInForm from "./components/authentication/SignIn";

function App() {
  return (
    <Fragment>
      <Route exact path = "/" component = {SignInForm} />
  
        {/* <Layout /> */}
    <Route exact path = "/home" component = { Layout } />
    </Fragment>
  );
}

export default App;
