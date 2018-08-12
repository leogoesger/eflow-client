import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

import { Colors } from "../../styles";

const AdminActionBtn = ({ action, displayName }) => {
  return (
    <FlatButton
      onClick={() => action()}
      label={displayName}
      labelStyle={{ fontSize: "12px", color: Colors.gold }}
    />
  );
};

AdminActionBtn.propTypes = {
  displayName: PropTypes.string,
  action: PropTypes.func,
};

export default AdminActionBtn;
