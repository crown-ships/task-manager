import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Landing = (props) => {

  function onLogoutClick (e) {
    e.preventDefault();
    props.logoutUser();
  };

  const { user } = this.props.auth;
  return (
    <div style={{ height: "90vh" }} className="container valign-wrapper">
      <div className="row">
        <p>
        </p>
        <p>
        </p>
        <div className="col s12 center-align">
          <h4>
            <b>Hi.</b>
            <p className="flow-text grey-text text-darken-1">
              You are logged in. Welcome to {" "}
              <span style={{ fontFamily: "monospace" }}>CROWN SHIPS.</span>
            </p>
          </h4>
        </div>
        <div className="col s12 center-align">
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}


Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Landing));
