import React from "react";
import PropTypes from "prop-types";
import { RaisedButton, FlatButton } from "material-ui";
import File from "material-ui/svg-icons/file/cloud-upload";
import { Colors } from "../../styles";
import Params from "./Params";
import { Tooltip } from "react-tippy";
import Tune from "material-ui/svg-icons/image/tune";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.fileInput;
  }

  handleDialog(bool) {
    this.setState({ open: bool });
  }

  render() {
    const {
      onUpload,
      onSubmit,
      enabled,
      onClassSelect,
      isError,
      userParams,
      setUserParams,
      handleSlider,
      fileName,
    } = this.props;

    if (isError) {
      this.fileInput.value = "";
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "absolute",
          top: "30px",
          left: "575px",
        }}
      >
        <FlatButton
          containerElement="label"
          label={!fileName ? "Pick A File" : `File: ${fileName}`}
          icon={
            <File
              style={{ width: "30px", height: "30px" }}
              color={Colors.gold}
            />
          }
          labelStyle={{
            fontSize: "14px",
            fontWeight: "700",
            // color: 'black !important',
          }}
          style={{ height: "36px", textAlign: "left" }}
        >
          <input
            onChange={(e) => onUpload(e.target.files)}
            type="file"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              width: "100%",
              opacity: 0,
            }}
            ref={(ref) => {
              this.fileInput = ref;
            }}
          />
        </FlatButton>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            position: "relative",
            marginTop: "30px",
          }}
        >
          <Tooltip
            title={"Select a stream class to refine metric results"}
            position="top"
            arrow={true}
          >
            <FlatButton
              label="Params (Optional)"
              icon={
                <Tune
                  style={{ width: "30px", height: "30px" }}
                  color={Colors.gold}
                />
              }
              labelStyle={{ fontSize: "12px", fontWeight: "700" }}
              onClick={() => this.handleDialog(true)}
              //style={{ margin: '20px 10px' }}
              disabled={!this.props.enabled}
            />

            <Params
              userParams={userParams}
              setUserParams={setUserParams}
              handleSlider={handleSlider}
              open={this.state.open}
              onClassSelect={onClassSelect}
              handleDialog={(bool) => this.handleDialog(bool)}
            />
          </Tooltip>

          <RaisedButton
            label="Upload"
            disabled={!enabled}
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            labelStyle={{ fontSize: "12px" }}
            onClick={() => onSubmit()}
            style={{ width: "100px", marginLeft: "20px" }}
          />
        </div>
      </div>
    );
  }
}

Uploader.propTypes = {
  onUpload: PropTypes.func,
  onSubmit: PropTypes.func,
  enabled: PropTypes.bool,
  isError: PropTypes.bool,
  userParams: PropTypes.object,
  setUserParams: PropTypes.func,
  handleSlider: PropTypes.func,
  fileName: PropTypes.string,
  onClassSelect: PropTypes.func,
};

export default Uploader;
