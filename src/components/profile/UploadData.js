import React from "react";
import PropTypes from "prop-types";
import { Card, CardText } from "material-ui";

import { Colors } from "../../styles";
import Download from "./Download";
import { navigateTo } from "../../utils/helpers";

const UploadData = ({ data }) => {
  const date = new Date(data.createdAt);
  return (
    <Card
      style={{
        margin: "10px auto",
        width: "70%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ cursor: "pointer", width: "400px" }}
          onClick={() => navigateTo(`/uploadData/${data.id}`)}
        >
          <div style={{ padding: "15px", fontSize: "24px" }}>{data.name}</div>
          <CardText
            style={{ fontSize: "16px", color: Colors.grey }}
          >{`Created at: ${date.getMonth() +
            1}/${date.getDate()}/${date.getFullYear()}`}</CardText>
        </div>

        <Download />
      </div>
    </Card>
  );
};

UploadData.propTypes = {
  data: PropTypes.object,
};

export default UploadData;
