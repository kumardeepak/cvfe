import React from "react";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Login from "./ui/containers/web/Login";
import Layout from "./ui/containers/web/Layout";

import NotFound from "./ui/containers/web/NotFound";
import Dashboard from "./ui/containers/web/Dashboard";
import Recipe from "./ui/containers/web/Recipe";
import Aadhar from "./ui/containers/web/Aadhaar";
import DetectFace from "./ui/containers/web/DetectFace";
import DetectPan from "./ui/containers/web/DetectPan";
import history from "./web.history";

const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route {...rest} render={props => (authenticate ? <Layout component={Component} {...props} /> : <Redirect to={{ pathname: "/" }} />)} />
);

class AppRoutes extends React.Component {
  authenticateUser = () => {
    const { user } = this.props;
    const token = localStorage.getItem("token");
     if (user.token || token) {
      return true;
     }
     else{
      <Redirect to={{ pathname: "/" }} />
     }
     
   };

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/detect-recipe" component={Recipe} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/detect-aadhaar" component={Aadhar} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/detect-face" component={DetectFace} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/detect-pan" component={DetectPan} authenticate={this.authenticateUser()} />
            <PrivateRoute path="/*" component={NotFound} authenticate={this.authenticateUser()} />
          </Switch>
        </div>
      </Router>
    );
  }
}

AppRoutes.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus
});

export default connect(
  mapStateToProps,
  null
)(AppRoutes);
