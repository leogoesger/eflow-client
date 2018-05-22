import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default class EcologyCard extends React.Component {
  _handleMessageClose() {
    this.setState({showMessage: false, message: ''});
  }

  render() {
    return (
      <Paper style={styles.tabsCard} zDepth={2}>
        <div className="col-lg-4 col-md-4 col-xs-12">
          <FlatButton label="Function" />
        </div>
      </Paper>
    );
  }
}

const styles = {
  tabsCard: {
    margin: '40px auto',
    borderRadius: '2px',
    width: '1050px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0',
    height: '500px',
  },
};
