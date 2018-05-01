// import request from 'superagent';
import {KnowIssueTypes as types} from '../action-types';

const fetchKnownIssueObjects = knownIssues => {
  return {
    type: types.FETCH_KNOWN_ISSUE_OBJECTS,
    knownIssues,
  };
};

export function fetchKnownIssues() {
  return async dispatch => {
    try {
      const knownIssues = {
        body: [
          {
            date: 'May 1st, 2018',
            version: 'v0.07',
            title: 'Scroll bar in Firefox',
            issues: [
              'Firefox does not support webkit, so the scrollbar may appear at some plots',
            ],
          },
          {
            date: 'April 10th, 2018',
            version: 'v0.03',
            title: 'Boxplots for gauges and classes',
            issues: [
              'Vertical boxplot(magnitude metrics) appears to be outside the boundary',
              'horizontal boxplot may appear from both side of the graph',
            ],
          },
          {
            date: 'March 20th, 2018',
            version: 'v0.02',
            title: 'DRH for gauges and classes',
            issues: ['Loading could be slower than expected depends on server'],
          },
          {
            date: 'March 1st, 2018',
            version: 'v0.01',
            title: 'Initial release',
            issues: ['Error message on toggling between stream classes'],
          },
        ],
      };

      dispatch(fetchKnownIssueObjects(knownIssues.body));
    } catch (e) {
      throw e;
    }
  };
}
