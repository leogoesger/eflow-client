import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

const Layout = ({ loginUser }) => {
  return (
    <div style={{ width: '400px', margin: '0px auto', paddingTop: '40px' }}>
      <div style={styles.header}>Log In</div>
      <div style={styles.subHeader}>
        Welcome back, please enter your user email and password.
      </div>

      <LoginForm submitHandler={loginUser} />

      <div style={{ color: '#d32f2f', fontSize: '13px', marginTop: '40px' }}>
        *As we are going through changes in our server, we wipe our entire
        database. If your login stopped working, just create another one with
        the same email.
      </div>
    </div>
  );
};
const styles = {
  header: {
    fontSize: '36px',
    margin: '20px 0',
    color: '#424242',
  },
  subHeader: {
    fontSize: '18px',
    color: '#a4a4a4',
    lineHeight: '22px',
  },
};

Layout.propTypes = {
  loginUser: PropTypes.func,
};
export default Layout;
