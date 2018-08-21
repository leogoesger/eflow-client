import React from "react";
import PropTypes from "prop-types";
import SignUpForm from "./SignUpForm";

const Layout = ({ signUpUser }) => {
  return (
    <div
      style={{
        width: "400px",
        margin: "0px auto",
        paddingTop: "40px",
        height: "600px",
        overflown: "scroll",
        boxSizing: "border-box",
      }}
    >
      <div style={styles.header}>Sign Up</div>
      <div style={styles.subHeader}>
        Welcome, please enter your information below to upload your own time
        series data
      </div>
      <SignUpForm submitHandler={signUpUser} />
    </div>
  );
};

Layout.propTypes = {
  signUpUser: PropTypes.func,
};

const styles = {
  header: {
    fontSize: "36px",
    margin: "20px 0",
    color: "#424242",
  },
  subHeader: {
    fontSize: "18px",
    color: "#a4a4a4",
    lineHeight: "22px",
  },
};
export default Layout;
