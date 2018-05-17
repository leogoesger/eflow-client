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
          'Click on the Eflow logo will direct you to home page anywhere in the app!'
        }
      </div>
    ),
    position: 'bottom',
  },
  {
    step: 2,
    selector: '.tour-hydrology',
    title: <div className="tour-title">Navigation Bar Items</div>,
    body: (
      <div className="tour-body">
        {
          'Click on any item belongs to navigation bar will take you to its home page!'
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
        This is the same as Hydrology tab on Navigation bar!
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
        This will direct you to metric summary page!
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
          'Click on this yellow band will copy citation information into your clipboard, so you can paste (Cmd + v or Ctrl + v) in your document!'
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
