import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// JWT TOKEN
import jwt_decode from "jwt-decode";

// SETTING UP HEADER IN ALL AXIOS REQUEST
import setAuthToken from "./utils/setAuthToken";

// STORE
import store from "./store";

// REDUX ACTIONS
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfileOnLogout } from "./actions/profileActions";

// IMPORTING ALL COMPONENTS
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/create-profile/EditProfile";
import ProfileHandle from "./components/profile/ProfileHandle";

// IMPORTING PRIVATE ROUTES
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";
const mainStyle = {
  boxShadow: "inset 0 0 0rem 0 rgba(0,0,0,.075)",
};
// CHECK FOR TOKEN

if (localStorage.jwtToken) {
  // SET AUTH TOKEN
  setAuthToken(localStorage.jwtToken);

  // DECODE TOKEN TO GET U-AUTH INFO
  const decode = jwt_decode(localStorage.jwtToken);

  // SET CURRENT USER
  store.dispatch(setCurrentUser(decode));

  // CHECK FOR EXPIRED TOKEN
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    // LOGGING OUT USER
    store.dispatch(logoutUser());

    // CLEAR USER PROFILE
    store.dispatch(clearProfileOnLogout());

    // REDIRECT TO LOGIN IN LAST
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="main-content">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
              <div className="container-fluid">
                <div className="header-body">
                  {" "}
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/create-profile"
                      component={CreateProfile}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/edit-profile"
                      component={EditProfile}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/profile/:handle"
                      component={ProfileHandle}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
