import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UserData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(UserData);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  render() {
    const error = this.state.error;

    const LoginCardHead = (
      <img
        className="img-fluid rounded-circle mb-2"
        src={localStorage.userAvatar}
        alt={localStorage.userName}
        style={{ width: "128px", height: "128px" }}
      />
    );

    return (
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0 text-center">
                {localStorage.userAvatar ? LoginCardHead : ""}
                <p className="lead ">
                  <strong>{localStorage.userName}</strong>, Log in to your
                  Connector account
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={error.email}
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={error.password}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateProps, { loginUser })(Login);
