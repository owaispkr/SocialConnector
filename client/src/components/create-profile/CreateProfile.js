import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { createUserProfile } from "../../actions/profileActions";

// IMPORT FIELD COMPONENTS
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

class CreateProfile extends Component {
  constructor() {
    super();

    this.state = {
      displaySocialInputs: false,
      socialLinkText: "Click to expand Social links",
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      bio: this.state.bio,
      company: this.state.company,
      skills: this.state.skills,
      youtube: this.state.youtube,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      linkedIn: this.state.linkedIn,
      instagram: this.state.instagram,
    };

    this.props.createUserProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error, displaySocialInputs } = this.state;

    // SELECT OPTIONS FOR STATUS
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Lead Developer", value: "Lead Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Database Administrator", value: "Database Administrator" },
      {
        label: "Full Stack .NET Developer",
        value: "Full Stack .NET Developer",
      },
    ];

    // ENABLING SOCIALS LINKS
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Youtube profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={error.youtube}
          />

          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={error.facebook}
          />

          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={error.twitter}
          />

          <InputGroup
            placeholder="LinkedIn profile URL"
            name="linkedIn"
            icon="fab fa-linkedin"
            value={this.state.linkedIn}
            onChange={this.onChange}
            error={error.linkedIn}
          />

          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={error.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                Let's add some information to start with your profile
              </p>
              <small className="d-block pb-3"> </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  type="text"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={error.handle}
                  info="A handle must be unique profile URL (This can't be CHANGED later)"
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={error.status}
                  options={options}
                  info="Give an idea of your background"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={error.bio}
                  info="Give us something about yourself in brief"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  type="text"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={error.company}
                  info="Could be your own business"
                />
                <TextFieldGroup
                  placeholder="* Your Skills"
                  name="skills"
                  type="text"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={error.skills}
                  info="Please make your skills comma seperated"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                        socialLinkText: displaySocialInputs
                          ? "Click to expand Social links"
                          : "Click to hide Social links",
                      }));
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Social Links
                  </button>
                  <small className="text-muted">
                    {this.state.socialLinkText}
                  </small>

                  {socialInputs}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-block btn-info btn-sm mt-4"
                  />
                </div>
              </form>
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

export default connect(mapStatesToProps, { createUserProfile })(
  withRouter(CreateProfile)
);
