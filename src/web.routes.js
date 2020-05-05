import React from "react";
import { Route, Switch, Router } from "react-router-dom";
//import PropTypes from "prop-types";
import Header from "../src/ui/component/Header";
import history from "./web.history";
import Content from "./ui/component/Content";
const PrivateRoute = ({ component: Component }) => (
  <Route
    render={(props) => (
      <div>
        <Header />
        <Component />
      </div>
    )}
  />
);
class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={history} basename="/dev">
        <div>
          <Switch>
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Header}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/Content`}
              component={Content}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

// AppRoutes.propTypes = {
// user: PropTypes.object.isRequired
// };
export default AppRoutes;
