import {history} from '../store/configureStore';
import {fromJS} from 'immutable';
import {detect} from 'detect-browser';
import _ from 'lodash';

export function navigateTo(pathname, query) {
  history.push({pathname, query});
}

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dateFromDay = (year, day) => {
  var date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
};

export function getJulianOffsetDate(julianDate) {
  let offsetJulianDate;
  if (julianDate < 365 - 274) {
    offsetJulianDate = julianDate + 274;
  } else {
    offsetJulianDate = julianDate + 365 - 274;
  }
  if (offsetJulianDate > 365) {
    offsetJulianDate = offsetJulianDate - 365;
  }
  return offsetJulianDate;
}

export function getCalenderDate(offsetJulianDate) {
  let julianDate;
  if (offsetJulianDate < 365 - 274) {
    julianDate = 274 + offsetJulianDate;
  } else {
    julianDate = offsetJulianDate - 365 + 274;
  }
  const date = dateFromDay(2001, julianDate),
    calenderDate = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
  return calenderDate;
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
      const properties = {
        properties: {stationName: gauge.stationName, classId: gauge.classId},
      };
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
      const properties = {
        properties: {
          stationName: gauge.stationName,
          classId: gauge.classId,
          gaugeId: gauge.id,
        },
      };
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

export const locateY = (data, x) => {
  const locatedY = find(data.FIFTY, o => {
    return o.date == Math.floor(Number(x));
  });
  return locatedY.flow;
};

const _getBrowserMajorVersion = version => {
  if (version) {
    const versionNumbers = version.split('.');
    if (versionNumbers.length) {
      return parseInt(versionNumbers[0].replace(/[^0-9]/g, ''), 10);
    }
  }
  return null;
};

export const isBrowserNotSupported = () => {
  const browser = detect();
  if (browser && browser.name && browser.version) {
    const majorVersion = _getBrowserMajorVersion(browser.version);
    if (majorVersion) {
      switch (browser.name) {
        case 'chrome':
          if (majorVersion <= 50) {
            return true;
          }
          return false;
        case 'firefox':
          if (majorVersion <= 50) {
            return true;
          }
          return false;
        case 'safari':
          if (majorVersion <= 10) {
            return true;
          }
          return false;
        case 'ie':
          if (majorVersion <= 11) {
            return true;
          }
          return false;
        case 'edge':
          if (majorVersion <= 11) {
            return true;
          }
          return false;
        default:
          return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
