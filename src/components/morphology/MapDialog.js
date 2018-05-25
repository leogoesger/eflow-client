import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

export default class MapDialog extends React.Component {
  render() {
    return (
      <Dialog
        modal={false}
        open={Boolean(this.props.dialogFeature)}
        onRequestClose={() => this.props.handleClose()}
        bodyStyle={{padding: '0px', width: '768px'}}
      >
        <Card style={{height: '515px', width: '768px', padding: '0px'}}>
          <CardHeader title={this.props.title} subtitle={this.props.subtitle} />
          {this.props.imageUrl ? (
            <CardMedia>
              <img src={this.props.imageUrl} alt="image" />
            </CardMedia>
          ) : (
            <div style={styles.sorry}>{'Sorry, no image avaiable :('}</div>
          )}
        </Card>
      </Dialog>
    );
  }
}

const styles = {
  sorry: {
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

MapDialog.propTypes = {
  dialogFeature: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  handleClose: PropTypes.func,
};
