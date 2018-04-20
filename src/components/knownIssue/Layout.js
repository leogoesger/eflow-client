import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import {Colors} from '../../styles';

export default class Layout extends React.Component {
  _renderIssues(issues) {
    return issues.map((issue, index) => {
      return (
        <div style={{padding: '5px 0px 0px 10px'}} key={index}>
          - {issue}
        </div>
      );
    });
  }

  _renderItems(knownIssues) {
    return knownIssues.map((knownIssue, index) => {
      return (
        <Card key={index} style={{width: '90%', margin: '5px auto'}}>
          <CardHeader
            title={
              <div>
                {knownIssue.title} -<span style={{fontWeight: '700'}}>
                  {knownIssue.version}
                </span>
              </div>
            }
            subtitle={knownIssue.date}
            actAsExpander={true}
            showExpandableButton={true}
            subtitleStyle={{marginTop: '10px'}}
          />
          <CardText expandable={true}>
            {this._renderIssues(knownIssue.issues)}
          </CardText>
        </Card>
      );
    });
  }

  render() {
    if (!this.props.knownIssues) {
      return <Card style={{height: '600px'}} />;
    }
    return (
      <Card className="col-lg-9 col-md-9 col-xs-12" style={styles.card}>
        <div style={styles.catagory}>Known Issues</div>
        {this._renderItems(this.props.knownIssues)}
      </Card>
    );
  }
}

Layout.propTypes = {
  knownIssues: PropTypes.array,
};

const styles = {
  card: {
    padding: '20px',
    borderRadius: '2px',
    height: '600px',
    margin: '-60px auto 100px auto',
    width: '80%',
    overflow: 'scroll',
  },
  title: {
    fontWeight: '600',
    lineHeight: '20px',
    width: '600px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  description: {
    fontSize: '14px',
    marginTop: '10px',
    lineHeight: '20px',
  },
  catagory: {
    color: Colors.grey,
    fontSize: '20px',
    margin: '20px 0px ',
  },
};
