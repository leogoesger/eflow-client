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

  render() {
    return (
      <React.Fragment>
        <div style={{display: 'flex', position: 'relative'}}>
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
          />
          <Search
            style={{height: '40px', width: '40px', marginTop: '24px'}}
            color={Colors.blue}
          />
        </div>
        <SearchTable
          searchedGauges={this.props.searchedGauges}
          searchGauge={d => this.props.searchGauge(d)}
          fetchHydrographOverlay={d => this.props.fetchHydrographOverlay(d)}
          fetchAnnualFlowData={d => this.props.fetchAnnualFlowData(d)}
          keyWord={this.state.keyWord}
          handleChange={d => this._handleChange(d)}
        />
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  searchedGauges: PropTypes.array,
  searchGauge: PropTypes.func,
  fetchHydrographOverlay: PropTypes.func,
  fetchAnnualFlowData: PropTypes.func,
};
