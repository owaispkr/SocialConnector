import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
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
        dashboradContent = <h4>display Profile</h4>;
      } else {
        // PROFILE NOT EXISTS

        dashboradContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <div className="p">
              You have not yet setup your profile, please add some information.
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStatesToProps, { getCurrentProfile })(Dashboard);
