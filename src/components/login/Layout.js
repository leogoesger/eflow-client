import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";

const Layout = ({ loginUser }) => {
  return (
    <div style={{ width: "400px", margin: "0px auto", paddingTop: "40px" }}>
      <LoginForm submitHandler={loginUser} />
    </div>
  );
};

Layout.propTypes = {
  loginUser: PropTypes.func,
};
export default Layout;
