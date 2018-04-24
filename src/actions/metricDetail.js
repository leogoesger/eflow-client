import {MetricDetailTypes as types} from '../action-types';
import {getAllMetricBoxPlotClourse} from './helpers';

const fetchAllClassesBoxPlotObjects = boxPlotData => {
  return {
    type: types.FETCH_ALL_CLASS_BOX_PLOT_OBJECTS,
    boxPlotData,
  };
};

const updateLoadingObject = loading => {
  return {
    type: types.UPDATE_LOADING_OBJECT,
    loading,
  };
};

export function fetchAllClassesBoxPlots() {
  return async dispatch => {
    const allMetricBoxPlots = await getAllMetricBoxPlotClourse(0);
    dispatch(fetchAllClassesBoxPlotObjects(allMetricBoxPlots));
    dispatch(updateLoadingObject(false));
  };
}
