import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearProfileOnLogout,
  getCurrentProfile,
} from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearProfileOnLogout();
    this.props.logoutUser();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let profileHandle = "";
    if (profile === null || loading) {
      profileHandle = "";
    } else {
      profileHandle = profile.handle;
    }

    const authLink = (
      <ul className="navbar-nav ml-auto">
        <a
          className="nav-link   d-none d-sm-inline-block"
          href="/#"
          data-toggle="dropdown"
        >
          <img
            className="avatar avatar-sm rounded-circle"
            src={user.avatar}
            alt={user.name}
          />{" "}
          <span className="mb-0 text-sm  font-weight-bold">{user.name}</span>
          <i className="fas fa-angle-double-down pl-2"></i>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right"
          style={{ fontSize: ".875rem" }}
        >
          <a className="dropdown-item" href={`/profile/${profileHandle}`}>
            <i className="far fa-user-circle" data-feather="user"></i> Profile
          </a>
          <div className="dropdown-divider"></div>
          <a
            href="/#"
            className="dropdown-item"
            onClick={this.onLogoutClick.bind(this)}
          >
            <i className="ni ni-user-run"></i>
            <span>Logout</span>
          </a>
        </div>
      </ul>
    );

    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar navbar-top navbar-expand-md navbar-dark"
        id="navbar-main"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            SocialConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="input-group-append"></div>

          <ul className="navbar-nav navbar-align">
            <li className="nav-item dropdown">
              {isAuthenticated ? authLink : guestLink}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateProps, {
  logoutUser,
  clearProfileOnLogout,
  getCurrentProfile,
})(Navbar);
