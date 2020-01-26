import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import ViewApiCall from "./components/Project/ViewApiCall";
import SignIn from "./components/Project/SignIn";
import Home from "./components/Home";
import Cal from "./components/Project/Cal";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/viewApiCall" component={ViewApiCall} />
        <Route exact path="/addProject" component={AddProject} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/home" component={Home} />
        
      </div>
    </Router>
  );
}

export default App;
