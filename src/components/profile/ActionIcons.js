import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IconButton, Snackbar } from "material-ui";
import { Tooltip } from "react-tippy";
import Delete from "material-ui/svg-icons/action/delete";
import Open from "material-ui/svg-icons/action/open-in-new";
import Predict from "material-ui/svg-icons/editor/bubble-chart";
import Loader from "../shared/loader/Loader";
import Share from "material-ui/svg-icons/social/share";

import { copyTextToClipboard } from "../../utils/helpers";
import upload from "../../APIs/upload";
import Download from "./Download";
import Colors from "../../styles/Colors";

const onDelete = async (id, getMe) => {
  await upload.deleteTimeSeries(id);
  getMe();
};

const onPredict = async (id, getMe) => {
  await upload.predictTimeSeries(id);
  getMe();
};

export class ActionIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      share: false,
    };
  }

  _handleRequestClose() {
    this.setState({ share: false });
  }

  getText() {
    const text = `${window.location.href.split("profile")[0]}uploadhydrograph/${
      this.props.id
    }`;
    copyTextToClipboard(text);
    this.setState({ share: true });
  }

  async onPredict(id) {
    this.setState({ loading: true });
    await onPredict(id, this.props.getMe);
    // await upload.predictTimeSeries(id);
    // this.getMe();
    this.setState({ loading: false });
  }

  render() {
    const { data, getMe, id } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Loader loading={this.state.loading} />
          <div>{""}</div>
          <Share
            style={{ padding: "12px" }}
            color={"#f9a825"}
            onClick={() => this.getText()}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Download data={data} />
          {!data.predictions.length && (
            <React.Fragment>
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "36px",
                  color: "#bdbdbd",
                }}
              >
                {"|"}
              </div>
              <div>
                <Tooltip
                  title={"Predict Classification"}
                  position="top"
                  arrow={true}
                >
                  <IconButton>
                    <Predict
                      onClick={() => this.onPredict(data.id)}
                      color={"#f9a825"}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </React.Fragment>
          )}
          <div
            style={{
              marginTop: "6px",
              fontSize: "36px",
              color: "#bdbdbd",
            }}
          >
            {"|"}
          </div>
          <div>
            <Tooltip title={"Delete"} position="top" arrow={true}>
              <IconButton>
                <Delete
                  onClick={() => onDelete(data.id, getMe)}
                  color={"#f9a825"}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>

          <div
            style={{
              marginTop: "6px",
              fontSize: "36px",
              color: "#bdbdbd",
            }}
          >
            {"|"}
          </div>
          <div>
            <Link
              to={{
                pathname: `uploadhydrograph/${id}`,
                ...this.props,
              }}
            >
              <Tooltip title={"Open"} position="top" arrow={true}>
                <IconButton>
                  <Open
                    color={"#f9a825"}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
        </div>
        <Snackbar
          bodyStyle={{ backgroundColor: Colors.blue }}
          open={this.state.share}
          message={"Shareable Link copied to your clipboard!"}
          autoHideDuration={4000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </div>
    );
  }
}

ActionIcons.propTypes = {
  id: PropTypes.any,
  data: PropTypes.object,
  getMe: PropTypes.func,
};
