import React from 'react';

import PaperCard from './PaperCard';

export default class Layout extends React.Component {
  render() {
    const papers = [
      {
        title: 'The standard of Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Noelle Patterson',
        url:
          'http://www.uvm.edu/pdodds/research/papers/others/figures//2017/dodds2017b_fig8_400px-square.png',
      },
      {
        title: 'The standard of Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Noelle Patterson',
        url:
          'http://www.uvm.edu/pdodds/research/papers/others/figures//2016/gallagher2016a_fig1-square_800px.png',
      },
      {
        title: 'The standard of Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Noelle Patterson',
        url:
          'http://www.uvm.edu/pdodds/research/papers/others/figures//2016/reece2016a_fig3_400px.png',
      },
      {
        title: 'The standard of Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Noelle Patterson',
        url:
          'http://www.uvm.edu/pdodds/research/papers/others/figures//2016/gallagher2016a_fig1-square_800px.png',
      },
      {
        title: 'The standard of Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Noelle Patterson',
        url:
          'http://www.uvm.edu/pdodds/research/papers/others/figures//2017/dodds2017b_fig8_400px-square.png',
      },
      {
        title: 'The standard of Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Noelle Patterson',
        url:
          'http://www.uvm.edu/pdodds/research/papers/others/figures//2016/gallagher2016a_fig1-square_800px.png',
      },
      {
        title: 'The standard of Lorem Ipsum',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author: 'Noelle Patterson',
        url:
          'http://www.uvm.edu/pdodds/research/papers/others/figures//2017/dodds2017b_fig8_400px-square.png',
      },
    ];
    return <PaperCard papers={papers} />;
  }
}
