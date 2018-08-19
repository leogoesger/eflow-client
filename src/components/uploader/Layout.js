import React from "react";
import PropTypes from "prop-types";
import { RaisedButton } from "material-ui";
import { Colors } from "../../styles";

const Uploader = ({ onUpload, onSubmit, enabled }) => {
  return (
    <div>
      <input
        onChange={e => onUpload(e.target.files)}
        type="file"
        style={{ fontSize: "14px" }}
      />
      <RaisedButton
        label="Upload"
        disabled={!enabled}
        backgroundColor={Colors.gold}
        labelColor={Colors.white}
        labelStyle={{ fontSize: "12px" }}
        onClick={() => onSubmit()}
        style={{ width: "100px", margin: "20px auto" }}
      />
    </div>
  );
};

Uploader.propTypes = {
  onUpload: PropTypes.func,
  onSubmit: PropTypes.func,
  enabled: PropTypes.bool,
};

export default Uploader;
