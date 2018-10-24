import { ReleaseNoteTypes as types } from '../action-types';

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
            date: 'Oct 24nd, 2018',
            version: 'v1.15',
            title: 'Geodatabase download',
            tasks: [
              'Admin user can see commit message',
              'Include geodatabase download button',
            ],
          },
          {
            date: 'Oct 22nd, 2018',
            version: 'v1.14',
            title: 'Upload data fix',
            tasks: [
              'Fix issues with upload data',
              'Remove loading screen when error',
              'Display error message when upload',
            ],
          },
          {
            date: 'Oct 5th, 2018',
            version: 'v1.13',
            title: 'Water Year Type',
            tasks: ['Display water year type', 'Refetch data'],
          },
          {
            date: 'Sep 14th, 2018',
            version: 'v1.12',
            title: 'Naming Convention Change',
            tasks: ['User sign up validation', 'Metrics namings'],
          },
          {
            date: 'Aug 21th, 2018',
            version: 'v1.11',
            title: 'User Account Validation',
            tasks: [
              'User Login Validations',
              'Snackbar for upload',
              'Upload validations',
            ],
          },
          {
            date: 'Aug 18th, 2018',
            version: 'v1.10',
            title: 'User Upload',
            tasks: [
              'User Authentication',
              'Inlucde Python Flask',
              'Calculate Metrics on the fly',
              'User Upload',
              ' User Download Metric result',
            ],
          },
          {
            date: 'Aug 14th, 2018',
            version: 'v1.04',
            title: 'Include Flow Precipitation Condition',
            tasks: ['Include annual recipitation information'],
          },
          {
            date: 'Aug 12nd, 2018',
            version: 'v1.03',
            title: 'Admin Page',
            tasks: ['Include 404 route', 'Admin page to upload and update'],
          },
          {
            date: 'Aug 2nd, 2018',
            version: 'v1.02',
            title: 'Team update and bug fixes',
            tasks: [
              'Include all team members',
              'Bug fixes for timing metrics',
              "Only Boxplot's timing metric data is offset dates",
            ],
          },
          {
            date: 'July 30th, 2018',
            version: 'v1.01',
            title: 'Metric namings update',
            tasks: ['Change all metric names'],
          },
          {
            date: 'June 14th, 2018',
            version: 'v0.21',
            title: 'Geomorhpology class redesign',
            tasks: ['Remove the list of sites', 'Display slider images'],
          },
          {
            date: 'June 11th, 2018',
            version: 'v0.20',
            title: 'DRH drawer to replace check boxes',
            tasks: ['DRH drawer', 'Implement all toggle buttons for metrics'],
          },
          {
            date: 'May 30th, 2018',
            version: 'v0.19',
            title: 'Search Bar for hydrology summary list',
            tasks: [
              'Added search bar for hydrology summary list',
              'Allow onHover and onSelect handler',
              'Edit the meta description for the website',
            ],
          },
          {
            date: 'May 29th, 2018',
            version: 'v0.18',
            title: 'Fixed y-axis for annual hydrograph',
            tasks: [
              'Option to fix y-axis for annual hydrograph',
              'Winter Magnitude now is a line instead of boxplots',
            ],
          },
          {
            date: 'May 25th, 2018',
            version: 'v0.17',
            title: 'Map interface for morphology',
            tasks: [
              'Display image on click the map',
              'Display image dialog when click the list',
            ],
          },
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
