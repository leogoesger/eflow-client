import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

import {Colors} from '../../styles';

import PaperCard from './PaperCard';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedPaper: null,
    };
  }

  handleOpen(paper) {
    this.setState({open: true, selectedPaper: paper});
  }

  handleClose() {
    this.setState({open: false, selectedPaper: null});
  }

  _renderDescription(description) {
    if (description.length > 400) {
      return `${description.slice(0, 400)}...`;
    } else {
      return description;
    }
  }

  _renderPapers(papers, type) {
    return papers.map((paper, index) => {
      if (paper.type === type) {
        return (
          <Card
            key={index}
            style={styles.card}
            onClick={() => this.handleOpen(papers[index])}
          >
            <div style={{padding: '10px'}}>
              <div style={styles.title}>{paper.title}</div>
              <div style={styles.subtitle}>{paper.authors.join(', ')}</div>
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
                {paper.publishedDate}, {paper.journal}
              </div>
              <div style={styles.description}>
                {this._renderDescription(paper.description)}
              </div>
            </div>
          </Card>
        );
      }
    });
  }

  render() {
    if (!this.props.papers) {
      return <div style={{height: '600px'}} />;
    }
    return (
      <div className="row col-lg-8 col-md-8" style={{margin: '120px auto'}}>
        <div style={styles.catagory}>Hydrology</div>
        {this._renderPapers(this.props.papers, 'HYDROLOGY')}
        <div style={{...styles.catagory, marginTop: '20px'}}>Morphology</div>
        {this._renderPapers(this.props.papers, 'MORPHOLOGY')}
        <div style={{...styles.catagory, marginTop: '20px'}}>Ecology</div>
        {this._renderPapers(this.props.papers, 'ECOLOGY')}

        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
        >
          <PaperCard paper={this.state.selectedPaper} />
        </Dialog>
      </div>
    );
  }
}

Layout.propTypes = {
  papers: PropTypes.array,
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '120px auto',
  },
  title: {
    fontWeight: '600',
    lineHeight: '20px',
  },
  subtitle: {
    color: Colors.grey,
    fontSize: '12px',
    lineHeight: '1.5',
  },
  description: {
    fontSize: '14px',
    marginTop: '10px',
    lineHeight: '20px',
  },
  card: {
    margin: '10px',
    cursor: 'pointer',
    width: '100%',
  },
  catagory: {
    color: Colors.grey,
    margin: '0 auto 20px auto',
    fontSize: '20px',
  },
};
