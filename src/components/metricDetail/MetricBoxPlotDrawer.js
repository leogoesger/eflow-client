import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  RaisedButton,
  SelectField,
  Toggle,
  MenuItem,
} from 'material-ui/';
import Clear from 'material-ui/svg-icons/content/clear';
import { Colors } from '../../styles';
import { conditionTypes } from '../../constants/conditionTypes';

class MetricBoxPlotDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer
        containerStyle={styles.container}
        docked={true}
        width={250}
        overlayStyle={styles.overlay}
        openSecondary={true}
        open={this.props.openDrawer}
        onRequestChange={() => this.props.toggleDrawer(false)}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
          }}
        >
          <div style={styles.selectionContainer}>
            <div>
              <SelectField
                floatingLabelText="Water Year Type"
                value={this.props.conditionValue}
                onChange={(event, index, value) =>
                  this.props.handleConditionChange(event, index, value)
                }
                selectedMenuItemStyle={{ color: Colors.gold }}
                floatingLabelStyle={{ color: Colors.gold }}
              >
                {conditionTypes.map((cond, indx) => {
                  return (
                    <MenuItem value={indx} key={indx} primaryText={cond} />
                  );
                })}
              </SelectField>
              <SelectField
                floatingLabelText="Metric Category"
                value={this.props.metricTableValue}
                onChange={(event, index, value) =>
                  this.props.handleTableChange(event, index, value)
                }
                selectedMenuItemStyle={{ color: Colors.gold }}
                floatingLabelStyle={{ color: Colors.gold }}
              >
                {this.props.renderTableItems()}
              </SelectField>
              <SelectField
                floatingLabelText="Metric Name"
                value={this.props.metricColumnValue}
                onChange={(event, index, value) =>
                  this.props.handleColumnChange(event, index, value)
                }
                selectedMenuItemStyle={{ color: Colors.gold }}
                floatingLabelStyle={{ color: Colors.gold }}
              >
                {this.props.renderColumnItems()}
              </SelectField>
            </div>
            <div>
              <Toggle
                style={{ marginTop: '35px', width: '120px' }}
                label={'Log Scale'}
                labelStyle={styles.labelStyle}
                value={'empty'}
                onClick={() => this.props.toggleLogScale()}
                toggled={this.props.logScale}
              />
            </div>
          </div>
          <RaisedButton
            label="Close"
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            labelStyle={{ fontSize: '12px' }}
            icon={<Clear color={Colors.white} />}
            onClick={() => this.props.toggleDrawer(false)}
            style={{ margin: '20px auto 5px 85px' }}
          />
        </div>
      </Drawer>
    );
  }
}

MetricBoxPlotDrawer.propTypes = {
  openDrawer: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  logScale: PropTypes.bool,
  toggleLogScale: PropTypes.func,
  fetchAllClassesBoxPlots: PropTypes.func,
  allClassesBoxPlots: PropTypes.object,
  metricTableValue: PropTypes.number,
  metricTableName: PropTypes.string,
  metricColumnName: PropTypes.string,
  metricColumnValue: PropTypes.number,
  handleColumnChange: PropTypes.func,
  handleTableChange: PropTypes.func,
  renderColumnItems: PropTypes.func,
  renderTableItems: PropTypes.func,
  condition: PropTypes.string,
  conditionValue: PropTypes.number,
  handleConditionChange: PropTypes.func,
};

const styles = {
  container: {
    top: '60px',
    zIndex: '10',
    height: '94%',
  },
  overlay: {
    top: '60px',
    zIndex: '10',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '12px',
  },
  selectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default MetricBoxPlotDrawer;
