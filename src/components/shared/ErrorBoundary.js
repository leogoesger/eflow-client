import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Paper style={{height: '600px', width: '80%', margin: '0 auto'}}>
          <h2 style={{color: 'red'}}>Something went wrong.</h2>
          <details style={{whiteSpace: 'pre-wrap', color: 'red'}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </Paper>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};

export default ErrorBoundary;
