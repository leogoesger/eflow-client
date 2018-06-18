import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchGeoRegions } from "../actions/geoRegion";
import Layout from "../components/morphology/Layout";
import { updateCurrentSite } from "../actions/geoSite";

export class Morphology extends React.Component {
  componentDidMount() {
    document.title = "Eflows | Geomorphology";
    this.props.fetchGeoRegions();
  }

  render() {
    return (
      <div>
        <div style={styles.banner} />
        <Layout
          geoRegions={this.props.geoRegions}
          currentRegion={this.props.currentRegion}
          updateCurrentSite={d => this.props.updateCurrentSite(d)}
          geoSite={this.props.geoSite}
        />
      </div>
    );
  }
}

Morphology.propTypes = {
  fetchGeoRegions: PropTypes.func,
  geoRegions: PropTypes.array,
  currentRegion: PropTypes.string,
  updateCurrentSite: PropTypes.func,
  geoSite: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    geoRegions: state.geoRegion.geoRegions,
    currentRegion: state.geoRegion.currentRegion,
    geoSite: state.geoSite.geoSite,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGeoRegions: () => dispatch(fetchGeoRegions()),
    updateCurrentSite: d => dispatch(updateCurrentSite(d)),
  };
};

const styles = {
  banner: {
    backgroundColor: "#424242",
    height: "230px",
    zIndex: "0",
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Morphology);
