import { history } from '../store/configureStore';
import * as d3 from 'd3';
import { fromJS } from 'immutable';
import { detect } from 'detect-browser';
import { assign, sortBy } from 'lodash';
import * as domtoimage from 'dom-to-image-more';

export function removeNaN(array) {
  const filteredArray = array.filter(ele => !isNaN(Number(ele)));
  return sortBy(filteredArray.map(Number));
}

export function getNameErrorMessage(name) {
  if (!name) {
    return null;
  }
  const isValid = /^[a-zA-Z ]+$/.test(name);
  if (isValid) {
    return null;
  } else {
    return 'Currently we only support names from English Alphabet!';
  }
}

export async function findClosest(data, value, accessor, simpleLine) {
  if (simpleLine) {
    const array = data;
    if (!array || !array.length) {
      return null;
    }

    const bisect = d3.bisector(accessor).right;
    const pointIndex = bisect(array, value);
    const left = array[pointIndex - 1],
      right = array[pointIndex];

    let element;

    // take the closer element
    if (left && right) {
      element =
        Math.abs(value - accessor(left)) < Math.abs(value - accessor(right))
          ? left
          : right;
    } else if (left) {
      element = left;
    } else {
      element = right;
    }
    //console.log(element);
    return [element];
  }
  const elements = await Object.keys(data).map(key => {
    const array = data[key];
    if (!array || !array.length) {
      return null;
    }

    const bisect = d3.bisector(accessor).right;
    const pointIndex = bisect(array, value);
    const left = array[pointIndex - 1],
      right = array[pointIndex];

    let element;

    // take the closer element
    if (left && right) {
      element =
        Math.abs(value - accessor(left)) < Math.abs(value - accessor(right))
          ? left
          : right;
    } else if (left) {
      element = left;
    } else {
      element = right;
    }
    return { [key]: element };
  });
  return elements;
}

export function getCombinedLayer(
  geoSites,
  defaultMapStyle,
  getSiteLayer,
  checkedClasses
) {
  let siteLayers = defaultMapStyle.get('layers').toJS();
  const sitesData = {};
  geoSites.forEach(site => {
    const siteObj = {
      properties: {
        geoClassId: Number(site.geoClass.name.split('-')[1]), //use for color
        siteIdentity: site.identity, //for hover
        geoClassName: site.geoClass.name, //for hover
        siteId: site.id,
        imageUrl: site.imageUrl,
        geoRegionName: site.geoClass.geoRegion.name
      },
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          site.geometry.coordinates[1],
          site.geometry.coordinates[0]
        ]
      }
    };
    const currentGeoClass = site.geoClass.name.split('-')[0];
    if (!sitesData[currentGeoClass]) {
      siteLayers = siteLayers.concat(
        getSiteLayer(currentGeoClass, checkedClasses[currentGeoClass]).toJS()
      );
      sitesData[currentGeoClass] = {
        data: { type: 'FeatureCollection', features: [] },
        type: 'geojson',
        cluster: false
      };
    }
    sitesData[currentGeoClass].data.features.push(siteObj);
  });

  const newStyle = defaultMapStyle
    .set(
      'sources',
      fromJS(assign({}, defaultMapStyle.get('sources').toJS(), sitesData))
    )
    .set('layers', fromJS(siteLayers));
  return newStyle;
}

const toCamelWord = (word, idx) =>
  idx === 0
    ? word.toLowerCase()
    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const toCamelCase = text =>
  text
    .split(/[_-\s]+/)
    .map(toCamelWord)
    .join('');

export function navigateTo(pathname, query) {
  history.push({ pathname, query });
}

export function copyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  textArea.style.width = '2em';
  textArea.style.height = '2em';

  textArea.style.padding = 0;

  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  textArea.style.background = 'transparent';

  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    throw err;
  }

  document.body.removeChild(textArea);
}

export const getCurrentMonthYear = () => {
  const d = new Date();
  return `${MONTH_NAMES[d.getMonth()]}, ${d.getFullYear()}`;
};

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
  'Dec'
];

const dateFromDay = (year, day) => {
  var date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
};

export function getJulianOffsetDate(julianDate) {
  let offsetJulianDate;
  if (julianDate < 274) {
    offsetJulianDate = julianDate + 365 - 274;
  } else {
    offsetJulianDate = julianDate - 274;
  }
  if (offsetJulianDate > 365) {
    offsetJulianDate = offsetJulianDate - 365;
  }
  return offsetJulianDate;
}

export function getCalenderDateFromOffset(offsetJulianDate) {
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

export function getCalenderDateFromJulian(julianDate) {
  const date = dateFromDay(2001, julianDate),
    calenderDate = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
  return calenderDate;
}

export function getDateFromJulian(julianDate, year) {
  const date = dateFromDay(year, julianDate + 1),
    calenderDate = `${date.getMonth() + 1}/${date.getDate()}/${year}`;
  return calenderDate;
}

export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export function getEmailErrorMessage(email) {
  if (email && !validateEmail(email)) {
    return 'Invalid Email address';
  }
}

export function validatePassword(password) {
  if (password.length >= 4 && password.length <= 20) {
    return true;
  }
  return false;
}

export function getPasswordErrorMessage(password) {
  if (!password || validatePassword(password)) {
    return '';
  }
  if (!validatePassword(password)) {
    return 'Should be between 4 to 20 characters';
  }
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
      type: 'geojson'
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
        assign({}, defaultMapStyle.get('sources').toJS(), combinedMapStyle)
      )
    )
    .set('layers', newCombinedLayer);

  const combinedGauges = {
    gauges: {
      data: { type: 'FeatureCollection', features: [] },
      type: 'geojson'
    }
  };
  gauges.forEach(gauge => {
    if (gauge.geometry) {
      const properties = {
        properties: {
          stationName: gauge.stationName,
          classId: gauge.classId
        }
      };
      const geometry = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            gauge.geometry.coordinates[1],
            gauge.geometry.coordinates[0]
          ]
        }
      };
      combinedGauges.gauges.data.features.push(
        assign({}, geometry, properties)
      );
    }
  });
  const mapStyle_gauge = mapStyle.set(
    'sources',
    fromJS(assign({}, mapStyle.get('sources').toJS(), combinedGauges))
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
      data: { type: 'FeatureCollection', features: [] },
      type: 'geojson'
    }
  };
  gauges.forEach(gauge => {
    if (gauge.geometry) {
      const properties = {
        properties: {
          stationName: gauge.stationName,
          classId: gauge.classId,
          gaugeId: gauge.id
        }
      };
      const geometry = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            gauge.geometry.coordinates[1],
            gauge.geometry.coordinates[0]
          ]
        }
      };
      combinedGauges.gauges.data.features.push(
        assign({}, geometry, properties)
      );
    }
  });
  const mapStyle = defaultMapStyle
    .set(
      'sources',
      fromJS(assign({}, defaultMapStyle.get('sources').toJS(), combinedGauges))
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

const filterDOMs = node => {
  return (
    node.className !== 'tour-metricDetail-display' &&
    node.className !== 'tour-metricDetail-download'
  );
};

export const saveAsImage = (dom, options) => {
  domtoimage
    .toJpeg(dom, { filter: filterDOMs, height: options.height })
    .then(imgUrl => {
      let link = document.createElement('a');
      link.download = options.fileName;
      link.href = imgUrl;
      link.click();
    });
};
