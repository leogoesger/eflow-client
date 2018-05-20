import React from 'react';

import Layout from '../components/home/Layout';
import UserTour from '../components/shared/UserTour';

const homeTourSteps = [
  {
    step: 1,
    selector: '.tour-logo',
    title: <div className="tour-title">Home Button</div>,
    body: (
      <div className="tour-body">
        {
          'Clicking on the eFlows logo will direct you to the home page from anywhere on the website!'
        }
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 2,
    selector: '.tour-hydrology',
    title: <div className="tour-title">Navigation Bar</div>,
    body: (
      <div className="tour-body">
        {
          'Clicking on any item in the navigation bar will take you to its home page.'
        }
      </div>
    ),
  },
  {
    step: 3,
    selector: '.tour-explore-hydrology',
    title: <div className="tour-title">Explore Hydrology</div>,
    body: (
      <div className="tour-body">
        {'This is the same as the Hydrology tab on the Navigation bar.'}
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 4,
    selector: '.tour-how-hydrology',
    title: <div className="tour-title">How does it work?</div>,
    body: (
      <div className="tour-body">
        {'This will direct you to the Functional Flows summary page.'}
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 5,
    selector: '.tour-citation',
    title: <div className="tour-title">Citation</div>,
    body: (
      <div className="tour-body">
        {
          'Clicking on this yellow band will copy citation information onto your clipboard, so you can paste (Cmd + v or Ctrl + v) it into your document.'
        }
      </div>
    ),
    position: 'top',
  },
];

export class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <UserTour tourSteps={homeTourSteps} />
        <Layout />
      </React.Fragment>
    );
  }
}

export default Home;
