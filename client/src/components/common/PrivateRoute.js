import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRouter.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatesToProps)(PrivateRouter);
