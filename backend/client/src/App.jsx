import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Login from "./auth/Login"
import Companies from "./components/sections/companies/CompaniesPage";
import Projects from "./components/sections/projects/ProjectsPage";
import CompletedProjects from "./components/sections/projects/CompletedProjects";
import Users from "./components/sections/users/UsersPage";
import Vendors from "./components/sections/vendors/VendorsPage";
import Investments from "./components/sections/investments/InvestmentsPage";
import Approval from "./components/sections/approval/ApprovalPage";
import Rejection from "./components/sections/rejection/RejectionPage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Dashboard from "./components/sections/dashboard/DashboardPage";
import ProjectDetails from "./components/sections/projects/tables/projects/ProjectDetails";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (

      <Provider store = {store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/projects" component={Projects} />
              <PrivateRoute exact path="/CompletedProjects" component={CompletedProjects} />
              <PrivateRoute exact path="/investments" component={Investments} />
              <PrivateRoute exact path="/vendors" component={Vendors} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/companies" component={Companies} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/approval" component={Approval} />
              <PrivateRoute exact path="/rejection" component={Rejection} />
              <PrivateRoute exact path="/projects/details" component={ProjectDetails} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
