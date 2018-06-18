// @flow
import * as React from "react";
import WarningIcon from "material-ui/svg-icons/alert/warning";

const Warning = (): React.Node => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <WarningIcon
      style={{
        color: "#616161",
        height: "60px",
        width: "60px",
        margin: "10px auto",
      }}
    />
    <div>{"Sorry, there isn't a image avaiable for this class! :("}</div>
  </div>
);

export default Warning;
