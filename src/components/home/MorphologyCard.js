import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default class MorphologyCard extends React.Component {
  _handleMessageClose() {
    this.setState({ showMessage: false, message: '' });
  }

  render() {
    return (
      <Paper
        className="col-lg-9 col-md-9 col-xs-12"
        style={styles.tabsCard}
        zDepth={2}
      >
        <div className="col-lg-4 col-md-4 col-xs-12">
          <FlatButton label="Morphology" />
        </div>
      </Paper>
    );
  }
}

const styles = {
  tabsCard: {
    margin: '0 auto',
    marginTop: '15px',
    borderRadius: '2px',
    minHeight: '500px',
  },
};
