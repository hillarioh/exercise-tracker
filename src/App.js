import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={} />
      <Route path="/edit/:id" component={} />
      <Route path="/create" component={} />
      <Route path="/user" component={} />
    </Router>
  );
}

export default App;
