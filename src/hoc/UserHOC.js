import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMe, getUserUploads } from '../actions/user';
import { navigateTo } from '../utils/helpers';

import Loader from '../components/shared/loader/Loader';

const UserHoc = Component => {
  class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        offset: 0,
        limit: 5,
        loading: true,
      };
    }

    async componentDidMount() {
      document.title = 'Eflow | Profile';
      await this.props.getMe();
      if (!this.props.currentUser) {
        return navigateTo('/login');
      }

      this.getPagedUserUploads(0);
      this.setState({ loading: false });
    }

    async getPagedUserUploads(page) {
      await this.setState({ loading: true });
      await this.setState(
        { offset: this.state.offset + this.state.limit * page },
        () =>
          this.props.getUserUploads({
            limit: this.state.limit,
            offset: this.state.offset,
          })
      );
      await this.setState({ loading: false });
    }

    render() {
      return (
        <div>
          <Loader loading={this.state.loading} />
          <Component
            currentUser={this.props.currentUser}
            getMe={this.props.getMe}
            offset={this.state.offset}
            limit={this.state.limit}
            getPagedUserUploads={page => this.getPagedUserUploads(page)}
            loading={this.state.loading}
          />
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      currentUser: state.user.currentUser,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      getMe: () => dispatch(getMe()),
      getUserUploads: (id, pagination) =>
        dispatch(getUserUploads(id, pagination)),
    };
  };

  EnhancedComponent.propTypes = {
    currentUser: PropTypes.object,
    getMe: PropTypes.func,
    getUserUploads: PropTypes.func,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(EnhancedComponent);
};

export default UserHoc;
