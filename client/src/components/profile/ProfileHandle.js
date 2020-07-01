import React, { Component } from "react";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import { withRouter } from "react-router";

class ProfileHandle extends Component {
  render() {
    return (
      <main className="content">
        <div className="container-fluid p-0">
          <div className="row">
            <ProfileSidebar />
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(ProfileHandle);
