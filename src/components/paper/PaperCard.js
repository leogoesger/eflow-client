import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';

export default class PaperCard extends React.Component {
  render() {
    return (
      <Card
        className="col-lg-9 col-md-9 col-xs-12 animated zoomIn"
        style={styles.card}
      >
        heelo
      </Card>
    );
  }
}

const styles = {
  card: {
    margin: '0 auto',
    marginTop: '120px',
    borderRadius: '2px',
    minHeight: '500px',
  },
};

PaperCard.propTypes = {
  papers: PropTypes.array,
};
