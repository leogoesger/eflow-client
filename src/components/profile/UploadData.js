import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardText } from "material-ui";
import { Tooltip } from "react-tippy";
import Delete from "material-ui/svg-icons/action/delete";

import { Colors } from "../../styles";
import Download from "./Download";
import upload from "../../APIs/upload";

const onDelete = async (id, getMe) => {
  await upload.deleteTimeSeries(id);
  getMe();
};

class UploadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  async onDelete(id, getMe) {
    await upload.deleteTimeSeries(id);
    getMe();
  }

  onClickHandler() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { data, getMe } = { ...this.props };
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
          <div style={{ width: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                to={{
                  pathname: `uploadhydrograph/${this.props.indx}`,
                  ...this.props,
                }}
              >
                <div style={{ padding: "15px", fontSize: "24px" }}>
                  {data.name}
                </div>
              </Link>
            </div>
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
  }
}

UploadData.propTypes = {
  indx: PropTypes.number,
  data: PropTypes.object,
  getMe: PropTypes.func,
  currentGauge: PropTypes.object,
  gauges: PropTypes.array,
  removeClassGaugeProps: PropTypes.func,
  currentClassification: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
};

export default UploadData;
