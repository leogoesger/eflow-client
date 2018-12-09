import React from "react";
import PropTypes from "prop-types";
import { Card, CardText, RaisedButton, Dialog, FlatButton } from "material-ui";
import { Tooltip } from "react-tippy";
import Delete from "material-ui/svg-icons/action/delete";
import Chart from "material-ui/svg-icons/editor/show-chart";

import { Colors } from "../../styles";
import Download from "./Download";
// import { navigateTo } from "../../utils/helpers";
import upload from "../../APIs/upload";
import Hydrograph from "./Hydrograph";

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
    const { data, getMe, currentGauge, gauges } = { ...this.props };
    const date = new Date(data.createdAt);
    const actions = [
      <FlatButton
        key="1"
        label="Close"
        primary={true}
        onClick={() => this.handleClose()}
      />,
    ];
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ padding: "15px", fontSize: "24px" }}>
                {data.name}
              </div>
              <div style={{ marginTop: "10px" }}>
                <RaisedButton
                  label="DRH"
                  icon={<Chart />}
                  onClick={() => this.onClickHandler()}
                />
                <Dialog
                  title={`DRH: ${data.name}`}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={() => this.handleClose()}
                  style={{ alignItems: "center" }}
                >
                  <Hydrograph
                    containerWidth={410}
                    currentClassification={this.props.currentClassification}
                    data={data}
                    currentGauge={currentGauge}
                    removeClassGaugeProps={() =>
                      this.props.removeClassGaugeProps()
                    }
                    gauges={gauges}
                    overLayBoxPlotData={[]}
                    verticalOverlayBoxPlotData={[]}
                    fetchCurrentGauge={this.props.fetchCurrentGauge}
                  />
                </Dialog>
              </div>
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
  data: PropTypes.object,
  getMe: PropTypes.func,
  currentGauge: PropTypes.object,
  gauges: PropTypes.array,
  removeClassGaugeProps: PropTypes.func,
  currentClassification: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
};

export default UploadData;
