// import request from 'superagent';
import {ReleaseNoteTypes as types} from '../action-types';

const fetchReleaseObjects = releaseNotes => {
  return {
    type: types.FETCH_RELEASE_NOTE_OBJECTS,
    releaseNotes,
  };
};

export function fetchReleaseNotes() {
  return async dispatch => {
    try {
      const releaseNotes = {
        body: [
          {
            date: 'April 10th, 2018',
            version: 'v0.03',
            title: 'Boxplots for gauges and classes',
            tasks: [
              'Add dimensionless hydrograph boxplots for gauges and classes',
            ],
          },
          {
            date: 'March 20th, 2018',
            version: 'v0.02',
            title: 'DRH for gauges and classes',
            tasks: [
              'Add dimensionless hydrograph for gauges and classes',
              'Team Page',
              'Papers Page',
            ],
          },
          {
            date: 'March 1st, 2018',
            version: 'v0.01',
            title: 'Initial release',
            tasks: [
              'Map of gauges and stream class',
              'Highlight gauge or class using the mouse',
            ],
          },
        ],
      };
      dispatch(fetchReleaseObjects(releaseNotes.body));
    } catch (e) {
      throw e;
    }
  };
}
