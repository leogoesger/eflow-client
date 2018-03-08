import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Book from 'material-ui/svg-icons/action/book';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import hydrology from '../../constants/hydrology.png';
import {navigateTo} from '../../utils/helpers';
import {Colors} from '../../styles';

export default class HydrologyCard extends React.Component {
  _handleMessageClose() {
    this.setState({showMessage: false, message: ''});
  }

  render() {
    return (
      <Paper
        className="col-lg-9 col-md-9 col-xs-12 "
        style={styles.tabsCard}
        zDepth={2}
      >
        <div style={styles.left}>
          <img
            src={hydrology}
            style={{
              flexShrink: 0,
              height: '100%',
              width: '100%',
              minWidth: '450px',
            }}
          />
        </div>
        <div style={styles.right}>
          <div className="title">
            {
              'Hydrology tool helps you easily visualize stream classifications and stream gauge data.'
            }
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'left',
              paddingLeft: '25px',
            }}
          >
            <RaisedButton
              label="Explore Hydrology"
              backgroundColor={Colors.gold}
              labelColor="white"
              onClick={() => navigateTo('/hydrology')}
              labelStyle={{fontSize: '12px'}}
            />
            <FlatButton
              href="https://leogoesger.gitbooks.io/funflow/content/"
              target="_blank"
              label="How does it work?"
              style={{marginLeft: '20px'}}
              labelStyle={{fontSize: '12px', color: Colors.gold}}
              icon={<Book color={Colors.gold} />}
            />
          </div>
          <div style={styles.subContainer}>
            <Card style={styles.subContainerCard}>
              <CardHeader style={styles.title} title="Stream Classifications" />
              <CardText style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                mattis pretium massa. Aliquam erat volutpat.
              </CardText>
            </Card>

            <Card style={styles.subContainerCard}>
              <CardHeader style={styles.title} title="Dimensional Hydrograph" />
              <CardText style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                mattis pretium massa. Aliquam erat volutpat.
              </CardText>
            </Card>

            <Card style={styles.subContainerCard}>
              <CardHeader style={styles.title} title="Annual Flow Metrics" />
              <CardText style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                mattis pretium massa. Aliquam erat volutpat.
              </CardText>
            </Card>
          </div>
        </div>
      </Paper>
    );
  }
}

const styles = {
  tabsCard: {
    margin: '0 auto',
    marginTop: '130px',
    borderRadius: '2px',
    minHeight: '565px',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0',
  },

  subContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  subContainerCard: {
    boxShadow: 'none',
    display: 'flex',
    width: '30%',
  },

  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '60%',
  },

  left: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
  },

  title: {
    fontWeight: '600',
    lineHeight: '20px',
  },

  text: {
    lineHeight: '20px',
    color: '#757575',
  },
};
