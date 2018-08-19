import React from "react";
import { IconMenu, FlatButton, MenuItem } from "material-ui";
import FileDownload from "material-ui/svg-icons/file/file-download";

import { Colors } from "../../styles";

class Download extends React.Component {
  render() {
    return (
      <IconMenu
        style={{ margin: "44px 20px 0px 0px" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        iconButtonElement={
          <FlatButton
            label="Download"
            style={{ marginLeft: "20px", marginTop: "10px" }}
            labelStyle={{ fontSize: "12px", color: Colors.gold }}
            icon={<FileDownload color={Colors.gold} />}
          />
        }
      >
        <MenuItem
          primaryText="Annual Flow Matrix"
          onClick={() => {
            console.log("something");
          }}
        />
        <MenuItem
          primaryText="Annual Metric Result"
          onClick={() => {
            console.log("something");
          }}
        />
      </IconMenu>
    );
  }
}

export default Download;
