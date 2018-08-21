import React from "react";
import PropTypes from "prop-types";
import { RaisedButton } from "material-ui";
import { Colors } from "../../styles";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onUpload, onSubmit, enabled, isError } = this.props;

    if (isError) {
      this.fileInput.value = "";
    }
    return (
      <div>
        <input
          onChange={e => onUpload(e.target.files)}
          type="file"
          style={{ fontSize: "14px" }}
          ref={ref => (this.fileInput = ref)}
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
  }
}

Uploader.propTypes = {
  onUpload: PropTypes.func,
  onSubmit: PropTypes.func,
  enabled: PropTypes.bool,
  isError: PropTypes.bool,
};

export default Uploader;
