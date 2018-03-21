import request from 'superagent';
import {PaperTypes as types} from '../action-types';

const fetchPaperObjects = papers => {
  return {
    type: types.FETCH_PAPER_OBJECTS,
    papers,
  };
};

export function fetchPapers() {
  return async dispatch => {
    try {
      const papers = await request.get(
        `${process.env.SERVER_ADDRESS}/api/papers`
      );
      dispatch(fetchPaperObjects(papers.body));
    } catch (e) {
      throw e;
    }
  };
}
