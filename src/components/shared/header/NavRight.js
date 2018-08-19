import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  FlatButton,
  IconMenu,
  MenuItem,
  IconButton,
  Divider,
} from "material-ui";
import { purple500 } from "material-ui/styles/colors";

import Person from "material-ui/svg-icons/action/supervisor-account";
import LogInUser from "material-ui/svg-icons/action/launch";
import Eject from "material-ui/svg-icons/action/eject";
import SignUser from "material-ui/svg-icons/content/add";
import Face from "material-ui/svg-icons/action/face";
import Book from "material-ui/svg-icons/av/library-books";
import MoreVertIcon from "material-ui/svg-icons/action/account-circle";

import { navigateTo } from "../../../utils/helpers";
import { Colors, Theme } from "../../../styles";

export default class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  renderNonLoggedInMenu() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton
            iconStyle={{ width: "36px", height: "36px", marginTop: "-15px" }}
          >
            <MoreVertIcon color={Colors.grey} />
          </IconButton>
        }
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        targetOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          leftIcon={<LogInUser />}
          value="1"
          primaryText="Login"
          onClick={() => navigateTo("/login")}
        />
        <MenuItem
          leftIcon={<SignUser />}
          value="2"
          primaryText="Sign Up"
          onClick={() => navigateTo("/signup")}
        />
      </IconMenu>
    );
  }

  renderLoggedInMenu() {
    const { firstName, lastName } = this.props.currentUser;
    return (
      <IconMenu
        iconButtonElement={
          <IconButton
            iconStyle={{ width: "36px", height: "36px", marginTop: "-15px" }}
          >
            <Avatar
              size={30}
              backgroundColor={purple500}
            >{`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}</Avatar>
          </IconButton>
        }
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        targetOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          leftIcon={<Face />}
          value="1"
          primaryText="Profile"
          onClick={() => navigateTo("/profile")}
        />
        {this.props.currentUser.role === "ADMIN" ? (
          <MenuItem
            leftIcon={<Book />}
            value="2"
            primaryText="Admin"
            onClick={() => navigateTo("/admin")}
          />
        ) : null}
        <Divider style={{ margin: "0px" }} />
        <MenuItem
          leftIcon={<Eject />}
          value="3"
          primaryText="Logout"
          onClick={() => this.props.removeUser()}
        />
      </IconMenu>
    );
  }

  render() {
    return (
      <div style={styles.userDiv}>
        <FlatButton
          className="tour-paper"
          label="Papers"
          icon={<Book />}
          style={styles.headerButton}
          labelStyle={styles.headerWhiteButtonLabel}
          hoverColor={"white"}
          onClick={() => navigateTo("/papers")}
        />
        <FlatButton
          label="Team"
          className="tour-team"
          labelPosition="after"
          icon={<Person />}
          hoverColor={"white"}
          style={styles.headerButton}
          labelStyle={styles.headerWhiteButtonLabel}
          onClick={() => navigateTo("/team")}
        />
        <div style={{ fontSize: "26px", margin: "4px", color: Colors.grey }}>
          {"|"}
        </div>
        {this.props.currentUser
          ? this.renderLoggedInMenu()
          : this.renderNonLoggedInMenu()}
      </div>
    );
  }
}

const styles = {
  userDiv: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    lineHeight: "30px",
  },
  headerButton: {
    height: "36px",
    color: Colors.grey,
    borderRadius: Theme.buttonBorderRadius,
  },
  headerWhiteButtonLabel: {
    marginLeft: "2px",
    marginRight: "5px",
    textTransform: "none",
    color: Colors.grey,
    fontSize: Theme.buttonLabelSmall,
    padding: "5px 0px",
  },
};

NavRight.propTypes = {
  currentUser: PropTypes.object,
  removeUser: PropTypes.func,
};
