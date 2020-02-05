import React from "react";
import "./App.css";
<<<<<<< HEAD
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import ViewApiCall from "./components/Project/ViewApiCall";
import SignIn from "./components/Project/SignIn";
import CreateGame from "./components/Game/CreateGame";
import ViewGame from "./components/Game/ViewGame";
=======
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import ApproveGame from "./components/Project/ApproveGame";
import SignIn from "./components/Project/SignIn";
import Home from "./components/Layout/Home";
import CreateGame from "./components/Project/CreateGame";
import Footer from "./components/Layout/Footer";
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
<<<<<<< HEAD

        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/viewApiCall" component={ViewApiCall} />
        <Route exact path="/createGame" component={CreateGame} />
        <Route exact path="/viewGame" component={ViewGame} />
        <Route exact path="/addProject" component={AddProject} />
        <Route exact path="/signIn" component={SignIn} />
=======
        
        <Switch> 
        <Route exact path="/createGame" component={CreateGame} />
        <Route exact path="/ApproveGame" component={ApproveGame} />
        <Route exact path="/addProject" component={AddProject} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/home" component={Home} />
        <Route path="/">
            <Home />
          </Route>
        </Switch>
        
        <Footer />
>>>>>>> e505ed2037c1514a6da0dcc3408858c573ca45ef
      </div>
    </Router>
  );
}

export default App;
