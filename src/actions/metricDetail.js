import {MetricDetailTypes as types} from '../action-types';
import {getAllMetricBoxPlotClourse} from './helpers';

const fetchAllClassesBoxPlotObjects = boxPlotData => {
  return {
    type: types.FETCH_ALL_CLASS_BOX_PLOT_OBJECTS,
    boxPlotData,
  };
};

export function fetchAllClassesBoxPlots() {
  return async dispatch => {
    const allMetricBoxPlots = await getAllMetricBoxPlotClourse(0);
    dispatch(fetchAllClassesBoxPlotObjects(allMetricBoxPlots));
  };
}
