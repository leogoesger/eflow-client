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
      // const releases = await request.get(
      //   `${process.env.SERVER_ADDRESS}/api/releases`
      // );
      const releaseNotes = {
        body: [
          {
            date: 'May 22th, 2018',
            version: 'v0.16',
            title: 'Map Control for Morphology',
            tasks: [
              'Add site layer',
              'Add region layer',
              'Add map control for each layer',
            ],
          },
          {
            date: 'May 19th, 2018',
            version: 'v0.15',
            title: 'Min and Max DRHs',
            tasks: [
              'Min and Max DRHs',
              'Toggle DRHs for min and max',
              'Map for morphology',
            ],
          },
          {
            date: 'May 17th, 2018',
            version: 'v0.14',
            title: 'User Tour',
            tasks: [
              'Implement user tour',
              'Fix bug for calender date to offset date issue',
              'Add new team member',
            ],
          },
          {
            date: 'May 16th, 2018',
            version: 'v0.13',
            title: 'Citation Bar',
            tasks: ['Add citation bar'],
          },
          {
            date: 'May 9th, 2018',
            version: 'v0.12',
            title: 'Display Unimpaired Gauge',
            tasks: [
              'Import unimpaired and impaired gauges',
              'Display gauge tag for impaired and unimpaired',
            ],
          },
          {
            date: 'May 9th, 2018',
            version: 'v0.11',
            title: 'Search and Recommendation',
            tasks: [
              'Search in metric detail page',
              'Search by station name',
              'Search by gauge Id',
            ],
          },
          {
            date: 'May 8th, 2018',
            version: 'v0.10',
            title: 'Annual Flow Hydrograph Overlay',
            tasks: [
              'Overlay dimension hydrograph on annual flow data',
              'Disable hover to fetch gauge info',
              'Lock in selected gauge on map page',
            ],
          },
          {
            date: 'May 3rd, 2018',
            version: 'v0.09',
            title: 'Bug Report Form',
            tasks: ['Added Bug report form', 'Swap class 2 and class 3 data'],
          },
          {
            date: 'May 2nd, 2018',
            version: 'v0.08',
            title: 'Socket IO',
            tasks: [
              'Use Socket IO to inform current user the site will be down',
            ],
          },
          {
            date: 'April 30th, 2018',
            version: 'v0.07',
            title: 'Citations',
            tasks: ['Add citations and term of service', 'Minor css touch up'],
          },
          {
            date: 'April 27th, 2018',
            version: 'v0.06',
            title: 'Metric Detail Overlay for Annual Flow Data',
            tasks: [
              'Annual flow plot with overlay',
              'Added a drawer to toggle all avaiable metrics',
              'Metrics include all timing and magnitude metrics',
              'Support downloads',
            ],
          },
          {
            date: 'April 25th, 2018',
            version: 'v0.05',
            title: 'Metric Detail Gauge Page',
            tasks: [
              'Annual flow plot',
              'Added slider to control the displayed Annual flow plot',
            ],
          },
          {
            date: 'April 22th, 2018',
            version: 'v0.04',
            title: 'Metric Detail overview page',
            tasks: [
              'Added boxplots for each matrix for all the classes',
              'Update detail page to have a list of classes with their gauges',
              'Fix map not rendering when hover over selected gauges',
            ],
          },
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
