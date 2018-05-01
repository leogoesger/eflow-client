import io from 'socket.io-client';

import request from 'superagent';
import {MemberTypes as types} from '../action-types';

const socket = io('http://localhost:8080');
socket.on('message', msg => {
  console.log(msg); // 'G5p5...'
});

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
