import React from "react";
import PropTypes from "prop-types";
import { Card, CardText } from "material-ui";
import { Tooltip } from "react-tippy";
import Delete from "material-ui/svg-icons/action/delete";

import { Colors } from "../../styles";
import Download from "./Download";
// import { navigateTo } from "../../utils/helpers";
import upload from "../../APIs/upload";

const onDelete = async (id, getMe) => {
  await upload.deleteTimeSeries(id);
  getMe();
};

const UploadData = ({ data, getMe }) => {
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
        <div style={{ cursor: "not-allowed", width: "400px" }}>
          <div style={{ padding: "15px", fontSize: "24px" }}>{data.name}</div>
          <CardText
            style={{ fontSize: "16px", color: Colors.grey }}
          >{`Created at: ${date.getMonth() +
            1}/${date.getDate()}/${date.getFullYear()}`}</CardText>
        </div>

        <Download data={data} />
        <div
          style={{
            margin: "54px -80px 0px 10px",
            fontSize: "36px",
            color: "#bdbdbd",
          }}
        >
          {"|"}
        </div>
        <div
          style={{
            marginTop: "58px",
            marginRight: "10px",
          }}
        >
          <Tooltip title={"Delete"} position="top" arrow={true}>
            <Delete
              onClick={() => onDelete(data.id, getMe)}
              color={"#f9a825"}
              style={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

UploadData.propTypes = {
  data: PropTypes.object,
  getMe: PropTypes.func,
};

export default UploadData;
