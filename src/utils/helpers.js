import {history} from '../store/configureStore';
import {fromJS} from 'immutable';
import _ from 'lodash';

export function navigateTo(pathname, query) {
  history.push({pathname, query});
}

export function getMapStyle(
  classifications,
  gauges,
  defaultMapStyle,
  dataLayer,
  gaugeLayer
) {
  const combinedMapStyle = {};
  const combinedLayer = [];
  classifications.forEach(geoClass => {
    combinedMapStyle[`class${geoClass.classId}`] = {
      data: geoClass.geometry,
      type: 'geojson',
    };

    let newDataLayer = dataLayer
      .set('source', `class${geoClass.classId}`)
      .set('id', `class${geoClass.classId}`);
    combinedLayer.push(newDataLayer.toJS());
  });

  const newCombinedLayer = fromJS(
    defaultMapStyle
      .get('layers')
      .toJS()
      .concat(combinedLayer)
      .concat(gaugeLayer)
  );

  const mapStyle = defaultMapStyle
    .set(
      'sources',
      fromJS(
        _.assign({}, defaultMapStyle.get('sources').toJS(), combinedMapStyle)
      )
    )
    .set('layers', newCombinedLayer);

  const combinedGauges = {
    gauges: {
      data: {type: 'FeatureCollection', features: []},
      type: 'geojson',
    },
  };
  gauges.forEach(gauge => {
    if (gauge.geometry) {
      const properties = {properties: {stationName: gauge.stationName}};
      const geometry = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            gauge.geometry.coordinates[1],
            gauge.geometry.coordinates[0],
          ],
        },
      };
      combinedGauges.gauges.data.features.push(
        _.assign({}, geometry, properties)
      );
    }
  });
  const mapStyle_gauge = mapStyle.set(
    'sources',
    fromJS(_.assign({}, mapStyle.get('sources').toJS(), combinedGauges))
  );

  return mapStyle_gauge;
}

export function getGaugeLayer(gauges, defaultMapStyle, gaugeLayer) {
  const newCombinedLayer = fromJS(
    defaultMapStyle
      .get('layers')
      .toJS()
      .concat(gaugeLayer)
  );

  const combinedGauges = {
    gauges: {
      data: {type: 'FeatureCollection', features: []},
      type: 'geojson',
    },
  };
  gauges.forEach(gauge => {
    if (gauge.geometry) {
      const properties = {properties: {stationName: gauge.stationName}};
      const geometry = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            gauge.geometry.coordinates[1],
            gauge.geometry.coordinates[0],
          ],
        },
      };
      combinedGauges.gauges.data.features.push(
        _.assign({}, geometry, properties)
      );
    }
  });
  const mapStyle = defaultMapStyle
    .set(
      'sources',
      fromJS(
        _.assign({}, defaultMapStyle.get('sources').toJS(), combinedGauges)
      )
    )
    .set('layers', newCombinedLayer);

  return mapStyle;
}
