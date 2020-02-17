import React, { useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import ApproveGame from "./components/Project/ApproveGame";
import SignIn from "./components/Project/SignIn";
import Home from "./components/Layout/Home";
import CreateGame from "./components/Project/CreateGame";
import Footer from "./components/Layout/Footer";
import AdminDashboard from "./components/Layout/Admindashboard";
import ProtectedRoute from "./Utility/protectedRoute";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/createGame" component={CreateGame} />
            <Route exact path="/ApproveGame" component={ApproveGame} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/signIn" component={SignIn} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
