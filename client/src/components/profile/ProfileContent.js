import React, { Component } from "react";

class ProfileContent extends Component {
  render() {
    return (
      <div className="col-md-8 col-xl-9">
        <div className="card">
          <div className="card-header">Activities</div>
          <div className="card-body h-100">
            <div className="media">
              <img
                src="//www.gravatar.com/avatar/58625e5ef46ceffd489188c3fce4fb5a?s=200&r=pg&d=mm"
                width="36"
                height="36"
                className="rounded-circle mr-2"
                alt="Vanessa Tucker"
              />
              <div className="media-body">
                <small className="float-right text-navy">5m ago</small>
                <strong>Vanessa Tucker</strong> started following{" "}
                <strong>Christina Mason</strong>
                <br />
                <small className="text-muted">Today 7:51 pm</small>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileContent;
