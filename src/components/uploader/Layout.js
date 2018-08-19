import React from "react";
import PropTypes from "prop-types";
import { RaisedButton, FlatButton } from "material-ui";
import { Colors } from "../../styles";

const Uploader = ({ onUpload, onSubmit, enabled }) => {
  return (
    <div>
      <input
        onChange={e => onUpload(e.target.files)}
        type="file"
        style={{ fontSize: "14px" }}
      />
      <FlatButton
        href="https://s3-us-west-1.amazonaws.com/funcflow/resources/sample.csv"
        target="_blank"
        label="Download Sample File"
        style={{ marginLeft: "20px" }}
        labelStyle={{ fontSize: "12px", color: Colors.gold }}
      />
      <RaisedButton
        label="Upload"
        disabled={!enabled}
        backgroundColor={Colors.gold}
        labelColor={Colors.white}
        labelStyle={{ fontSize: "12px" }}
        onClick={() => onSubmit()}
        style={{ width: "100px", margin: "20px 10px" }}
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
