import React from "react";
import PropTypes from "prop-types";

import Dialog from "material-ui/Dialog";
import { Card, CardHeader, CardMedia } from "material-ui/Card";

const MapDialog = props => (
  <Dialog
    modal={false}
    open={Boolean(props.dialogFeature)}
    onRequestClose={() => props.handleClose()}
    bodyStyle={{ padding: "0px", width: "768px" }}
  >
    <Card style={{ height: "515px", width: "768px", padding: "0px" }}>
      <CardHeader title={props.title} subtitle={props.subtitle} />
      {props.imageUrl ? (
        <CardMedia>
          <img src={props.imageUrl} alt="image" />
        </CardMedia>
      ) : (
        <div style={styles.sorry}>{"Sorry, no image avaiable :("}</div>
      )}
    </Card>
  </Dialog>
);

const styles = {
  sorry: {
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

MapDialog.propTypes = {
  dialogFeature: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  handleClose: PropTypes.func,
};

export default MapDialog;
