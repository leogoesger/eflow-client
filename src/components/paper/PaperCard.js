import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import {Colors} from '../../styles';

export default class PaperCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullDescription: false,
    };
  }

  _handleMore() {
    this.setState({fullDescription: true});
  }

  _renderDescription(description) {
    if (this.state.fullDescription) {
      return <div style={styles.description}>{description}</div>;
    } else if (description.length > 600 && !this.state.fullDescription) {
      return (
        <div style={styles.description}>
          {`${description.slice(0, 600)}...`}
          <br />
          <div style={styles.readMore} onClick={() => this._handleMore()}>
            Read More
          </div>
        </div>
      );
    } else {
      return <div style={styles.description}>{description}</div>;
    }
  }

  render() {
    return (
      <div style={styles.infoContainer}>
        <div style={styles.name}>{this.props.paper.title}</div>
        <div style={styles.title}>{this.props.paper.authors.join(', ')}</div>
        <div
          style={{
            color: 'grey',
            fontSize: '13px',
            fontWeight: 400,
            marginTop: '12px',
          }}
        >
          <span style={{fontWeight: 600, color: 'black'}}>
            First Published:
          </span>{' '}
          {this.props.paper.publishedDate}, {this.props.paper.journal}
        </div>
        <div style={styles.description}>
          {this._renderDescription(this.props.paper.description)}
        </div>
        <div style={styles.btnContainer}>
          <a
            href={this.props.paper.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RaisedButton
              label="Request full-text"
              backgroundColor={Colors.gold}
              labelColor={Colors.white}
              labelStyle={{fontSize: '12px'}}
            />
          </a>
        </div>
      </div>
    );
  }
}

const styles = {
  infoContainer: {lineHeight: '20px', marginTop: '20px', marginBottom: '20px'},
  name: {fontSize: '20px', fontWeight: '600', lineHeight: '20px'},
  title: {marginTop: '5px'},
  description: {marginTop: '20px', fontSize: '14px'},
  readMore: {
    marginTop: '10px',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#039be5',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
};

PaperCard.propTypes = {
  paper: PropTypes.object,
};
