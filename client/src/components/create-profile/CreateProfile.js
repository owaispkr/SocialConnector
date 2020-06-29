import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CreateProfile extends Component {
  constructor() {
    super();

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubUsername: "",
      youtube: "",
      facebook: "",
      twitter: "",
      linkedIn: "",
      instagram: "",
      error: {},
    };
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                Let's add some information to start with your profile
              </p>
              <small className="d-block pb-3">
                {" "}
                '*' is used for mandatory fields
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  profile: state.profile,
  error: state.error,
});

export default connect(mapStatesToProps)(CreateProfile);
