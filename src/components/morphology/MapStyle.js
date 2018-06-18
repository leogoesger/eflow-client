import { fromJS } from "immutable";
import MAP_STYLE from "../../constants/map-style-geo.json";

export const defaultMapStyle = fromJS(MAP_STYLE);

export const getSiteLayer = (source, regionName) => {
  return fromJS({
    id: source,
    source: source,
    type: "symbol",
    interactive: true,
    layout: {
      "icon-image": {
        property: "geoClassId",
        stops: [
          [1, `${source}-1`],
          [2, `${source}-2`],
          [3, `${source}-3`],
          [4, `${source}-4`],
          [5, `${source}-5`],
          [6, `${source}-6`],
        ],
      },
      "icon-allow-overlap": true,
      "symbol-avoid-edges": true,
      "text-field": {
        property: "geoClassId",
        stops: [
          [1, `${regionName}-${source}-1`],
          [2, `${regionName}-${source}-2`],
          [3, `${regionName}-${source}-3`],
          [4, `${regionName}-${source}-4`],
          [5, `${regionName}-${source}-5`],
          [6, `${regionName}-${source}-6`],
        ],
      },
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": {
        stops: [[0, 0], [7, 0], [9, 12]],
      },
      "text-transform": "uppercase",
      "text-letter-spacing": 0.05,
      "text-offset": [0, 1.3],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#ffffff",
    },
  });
};

export const getSiteLayerLarge = source => {
  return fromJS({
    id: "currentSite",
    source: "currentSite",
    type: "symbol",
    interactive: true,
    layout: {
      "icon-image": {
        property: "geoClassId",
        stops: [
          [1, `${source}-1-L`],
          [2, `${source}-2-L`],
          [3, `${source}-3-L`],
          [4, `${source}-4-L`],
          [5, `${source}-5-L`],
          [6, `${source}-6-L`],
        ],
      },
    },

    paint: {
      "text-color": "#ffffff",
    },
  });
};
