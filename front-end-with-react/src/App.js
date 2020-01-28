import React from "react";
import "./App.css";
import MySchedule from "./components/MySchedule";
import Header from "./components/Layout/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import ViewApiCall from "./components/Project/ViewApiCall";
import SignIn from "./components/Project/SignIn";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Switch> 
        <Route exact path="/mySchedule" component={MySchedule} />
        <Route exact path="/viewApiCall" component={ViewApiCall} />
        <Route exact path="/addProject" component={AddProject} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/home" component={Home} />
        <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
