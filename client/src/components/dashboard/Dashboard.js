import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteUserAccount,
} from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";

import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onClickDelete() {
    this.props.deleteUserAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboradContent;

    if (profile === null || loading) {
      dashboradContent = <Spinner />;
    } else {
      // CHECK IF PROFILE EXISTS
      if (Object.keys(profile).length > 0) {
        // PROFILE EXITS
        dashboradContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "50px" }}>
              {/* EXPERIENCE AND EDUCATION */}
            </div>
            <button
              onClick={this.onClickDelete.bind(this)}
              className="btn btn-md btn-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        // PROFILE NOT EXISTS

        dashboradContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name},</p>
            <div className="p">
              It seems you have not setup your profile yet, please add some
              information.
            </div>
            <Link to="/create-profile" className="btn btn-md btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboradContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStatesToProps, {
  getCurrentProfile,
  deleteUserAccount,
})(Dashboard);
