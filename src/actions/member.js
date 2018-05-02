import request from 'superagent';
import {MemberTypes as types} from '../action-types';

const fetchMemberObjects = members => {
  return {
    type: types.FETCH_MEMBER_OBJECTS,
    members,
  };
};

export function fetchMembers() {
  return async dispatch => {
    try {
      const members = await request.get(
        `${process.env.SERVER_ADDRESS}/api/members`
      );
      dispatch(fetchMemberObjects(members.body));
    } catch (e) {
      throw e;
    }
  };
}
