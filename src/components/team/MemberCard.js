import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Email from '../../constants/icons/email.svg';
import Website from '../../constants/icons/website.png';
import Linkedin from '../../constants/icons/linkedin.png';
import Github from '../../constants/icons/github.svg';
import Gscholar from '../../constants/icons/gscholar.png';
import RG from '../../constants/icons/RG.png';
import Twitter from '../../constants/icons/twitter.png';
import Youtube from '../../constants/icons/youtube.png';

export default class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullDescription: false,
      open: false,
    };
  }

  _handleMore() {
    this.setState({fullDescription: true});
  }

  _handleClick() {
    this.setState({open: true});
  }

  _handleRequestClose() {
    this.setState({open: false});
  }

  _renderDescription(description) {
    if (this.state.fullDescription) {
      return <div style={styles.description}>{description}</div>;
    } else if (description.length > 300 && !this.state.fullDescription) {
      return (
        <div style={styles.description}>
          {`${description.slice(0, 300)}...`}
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

  _renderSocialLinks(member) {
    return (
      <div>
        {member.email ? (
          <CopyToClipboard
            text={member.email}
            onCopy={() => this._handleClick()}
          >
            <img src={Email} width="20" className="icon" />
          </CopyToClipboard>
        ) : null}
        {member.website ? (
          <a href={member.website} target="_blank">
            <img src={Website} width="20" className="icon" />
          </a>
        ) : null}
        {member.linkedin ? (
          <a href={member.linkedin} target="_blank">
            <img src={Linkedin} width="20" className="icon" />
          </a>
        ) : null}
        {member.github ? (
          <a href={member.github} target="_blank">
            <img src={Github} width="20" className="icon" />
          </a>
        ) : null}
        {member.googleScholar ? (
          <a href={member.googleScholar} target="_blank">
            <img src={Gscholar} width="20" className="icon" />
          </a>
        ) : null}
        {member.researchGate ? (
          <a href={member.researchGate} target="_blank">
            <img src={RG} width="20" className="icon" />
          </a>
        ) : null}
        {member.twitter ? (
          <a href={member.twitter} target="_blank">
            <img src={Twitter} width="20" className="icon" />
          </a>
        ) : null}
        {member.youtube ? (
          <a href={member.youtube} target="_blank">
            <img src={Youtube} width="20" className="icon" />
          </a>
        ) : null}
      </div>
    );
  }

  render() {
    if (!this.props.member) {
      return null;
    }
    const {member} = this.props;
    return (
      <div>
        <div style={styles.iconContainer}>
          <Avatar src={member.image} size={200} />
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.name}>{member.name}</div>
          <div style={styles.title}>{`${member.title}, ${
            member.location
          }`}</div>
          {this._renderSocialLinks(member)}
          {this._renderDescription(member.description)}
        </div>
        <Snackbar
          open={this.state.open}
          message="Email copied to your Clipboard"
          autoHideDuration={8000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </div>
    );
  }
}

Member.propTypes = {
  member: PropTypes.object,
};

const styles = {
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  infoContainer: {lineHeight: '20px', marginTop: '20px', marginBottom: '20px'},
  name: {fontSize: '20px', fontWeight: '600', lineHeight: '20px'},
  title: {marginTop: '5px'},
  description: {marginTop: '10px', fontSize: '14px'},
  readMore: {
    marginTop: '10px',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#039be5',
  },
};
