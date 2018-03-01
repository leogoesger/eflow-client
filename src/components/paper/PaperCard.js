import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia } from 'material-ui/Card';

import { Colors } from '../../styles';

export default class PaperCard extends React.Component {
  _renderDescription(description) {
    if (description.length > 100) {
      return `${description.slice(0, 100)}...`;
    } else {
      return description;
    }
  }
  _renderPaper(papers) {
    return papers.map((paper, index) => {
      return (
        <Card key={index} style={styles.card}>
          <CardMedia>
            <img src={paper.url} />
          </CardMedia>
          <div style={{ padding: '10px' }}>
            <div style={styles.title}>{paper.title}</div>
            <div style={styles.subtitle}>{`${paper.author}`}</div>
            <div style={styles.description}>
              {this._renderDescription(paper.description)}
            </div>
          </div>
        </Card>
      );
    });
  }
  render() {
    return (
      <div style={styles.container} className="row col-lg-9 col-md-9 col-xs-12">
        {this._renderPaper(this.props.papers)}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '120px auto',
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    color: Colors.grey,
    fontSize: '12px',
    lineHeight: '1.5',
  },
  description: {
    fontSize: '14px',
    marginTop: '10px',
    lineHeight: '1.2',
  },
  card: {
    margin: '10px',
    cursor: 'pointer',
    width: '30%',
  },
};

PaperCard.propTypes = {
  papers: PropTypes.array,
};
