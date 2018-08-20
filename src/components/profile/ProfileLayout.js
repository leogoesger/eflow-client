import React from "react";
import PropTypes from "prop-types";
import { Paper, Divider } from "material-ui";
import { cloneDeep } from "lodash";

import Uploader from "../../containers/Uploader";
import { Colors } from "../../styles";

import UploadData from "./UploadData";

const ProfileLayout = ({ currentUser, getMe }) => {
  if (!currentUser) {
    return null;
  }

  const sortedData = cloneDeep(currentUser.uploadData).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <React.Fragment>
      <div style={styles.banner} />
      <Paper style={styles.paperStyle}>
        <div
          style={{ fontSize: "36px", margin: "40px 20px 20px 20px" }}
        >{`Welcome, ${currentUser.firstName}`}</div>

        <div style={{ margin: "40px 20px 20px 20px", color: Colors.grey }}>
          <div>
            Upload your time series data here. Please follow the provided data
            format.
          </div>
          <Uploader enabled={currentUser.uploadData.length < 5} />
        </div>
        <div>
          <Divider style={{ margin: "0px" }} />
        </div>
        {!sortedData.length && (
          <div style={{ margin: "40px 20px" }}>
            {
              "Looks like you havn't uploaded any data yet. Try upload some time series data!"
            }
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          {sortedData.map(d => (
            <UploadData key={d.id} data={d} getMe={getMe} />
          ))}
        </div>
      </Paper>
    </React.Fragment>
  );
};

const styles = {
  banner: {
    backgroundColor: "#424242",
    height: "230px",
    zIndex: "0",
  },
  paperStyle: {
    height: "600px",
    margin: "-60px auto 160px auto",
    width: "1000px",
    zIndex: "2",
    overflow: "scroll",
  },
  warningIcon: { color: "#616161", height: "60px", width: "60px" },
};

ProfileLayout.propTypes = {
  currentUser: PropTypes.object || null,
  getMe: PropTypes.func,
};

export default ProfileLayout;
