import React from 'react';
import {debounce} from 'lodash';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search';

import {Colors} from '../../../styles';
import SearchTable from './SearchTable';
import Styles from '../../../styles/Styles';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: '',
    };
    this._debouncedSearch = debounce(
      () => this.props.searchGauge(this.state.keyWord),
      100
    );
  }

  _handleChange(value) {
    this.setState({keyWord: value}, () => this._debouncedSearch());
  }

  _onBlur() {
    setTimeout(() => this._handleChange(''), 100);
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{display: 'flex', position: 'relative'}}
          className="tour-searchBar"
        >
          <TextField
            className="requiredField"
            value={this.state.keyWord}
            fullWidth={true}
            hintText="Try 10264600 or Independence..."
            floatingLabelText="Search Gauge"
            underlineFocusStyle={Styles.underlineFocusStyle}
            floatingLabelStyle={Styles.floatingLabelStyle}
            floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
            onChange={(_event, value) => this._handleChange(value)}
            onBlur={() => this._onBlur()}
          />
          <Search
            style={{height: '40px', width: '40px', marginTop: '24px'}}
            color={Colors.blue}
          />
        </div>
        <SearchTable
          searchedGauges={this.props.searchedGauges}
          keyWord={this.state.keyWord}
          onSelect={d => this._handleChange(d)}
          selectRowHandler={gauge => this.props.selectRowHandler(gauge)}
          onRowHover={id => this.props.onRowHover(id)}
        />
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  searchedGauges: PropTypes.array,
  searchGauge: PropTypes.func,
  selectRowHandler: PropTypes.func,
  onRowHover: PropTypes.func,
};
