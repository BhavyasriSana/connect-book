import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import store from "./store";
import setAuthHeader from "./utils/setAuthHeader";
import { setCurrentUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import CreateProfile from "./components/dashboard/CreateProfile";

if (localStorage.jwtToken) {
  //set Auth Token
  setAuthHeader(localStorage.jwtToken);
  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set User
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    // this.props.history.push("/login");
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/create-profile" component={CreateProfile} />
              <Route exact path="/edit" component={CreateProfile} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
