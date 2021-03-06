import request from 'superagent';
import { UserTypes as types } from '../action-types';
import { navigateTo } from '../utils/helpers';

const fetchBroadCastMessageObject = message => {
  return {
    type: types.FETCH_BROADCAST_MESSAGE,
    message,
  };
};

const submitBugReportObject = bugReport => {
  return {
    type: types.SUBMIT_BUG_REPORT_OBJECT,
    bugReport,
  };
};

const loginUserObject = user => {
  return {
    type: types.USER_LOGIN_OBJECT,
    user,
  };
};

const userUploadsObj = uploads => {
  return {
    type: types.USER_UPLOADS_OBJECT,
    uploads,
  };
};

const failedUpload = uploads => {
  return {
    type: types.ADMIN_FAILED_UPLOAD,
    uploads,
  };
};

const uploads = uploads => {
  return {
    type: types.ADMIN_UPLOADS,
    uploads,
  };
};

const uploadData = upload => {
  return {
    type: types.UPLOAD_DATA,
    upload,
  };
};

const userErrorMessage = msg => {
  return {
    type: types.USER_ERROR_MESSAGE,
    msg,
  };
};

const removeUserObject = () => {
  return {
    type: types.REMOVE_USER_OBJECT,
  };
};

export function fetchBroadCastMessage(message) {
  return dispatch => {
    dispatch(fetchBroadCastMessageObject(message));
  };
}

export function removeErrorMessage() {
  return dispatch => {
    dispatch(userErrorMessage(''));
  };
}

export function submitBugReport(bugReport) {
  return async dispatch => {
    try {
      const reportData = await request
        .post(`${process.env.SERVER_ADDRESS}/api/bugReport`)
        .send(bugReport);
      dispatch(submitBugReportObject(reportData.body.message));
    } catch (e) {
      throw e;
    }
  };
}

export function loginUser(user) {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/user/login`)
        .send(user);
      localStorage.setItem('ff_jwt', response.body.ff_jwt);
      dispatch(loginUserObject(response.body));
      if (response.body.role === 'ADMIN') {
        return navigateTo('/admin');
      }
      navigateTo('/');
    } catch (e) {
      dispatch(userErrorMessage('Log In Failed!'));
      localStorage.removeItem('ff_jwt');
    }
  };
}

export function signUpUser(user) {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/user/signup`)
        .send(user);
      localStorage.setItem('ff_jwt', response.body.ff_jwt);
      dispatch(loginUserObject(response.body));
      if (response.body.role === 'ADMIN') {
        return navigateTo('/admin');
      }
      navigateTo('/');
    } catch (e) {
      localStorage.removeItem('ff_jwt');
      dispatch(userErrorMessage('Sign Up Failed!'));
    }
  };
}

export function removeUser() {
  return dispatch => {
    localStorage.removeItem('ff_jwt');
    dispatch(removeUserObject());
    navigateTo('/');
  };
}

export function getMe() {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/user/getme`)
        .send({ ff_jwt: localStorage.getItem('ff_jwt') });
      dispatch(loginUserObject(response.body));
      // response.body.role === "ADMIN"
      //   ? navigateTo("/admin")
      //   : navigateTo("/profile");
    } catch (error) {
      localStorage.removeItem('ff_jwt');
    }
  };
}

export function getFailedUpload(pagination) {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/admin/get-failed-uploads`)
        .send({ ff_jwt: localStorage.getItem('ff_jwt'), ...pagination });
      dispatch(failedUpload(response.body));
    } catch (error) {
      localStorage.removeItem('ff_jwt');
    }
  };
}

export function getUploads(pagination) {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/admin/get-uploads`)
        .send({ ff_jwt: localStorage.getItem('ff_jwt'), ...pagination });
      dispatch(uploads(response.body));
    } catch (error) {
      localStorage.removeItem('ff_jwt');
    }
  };
}

export function getUploadById(id) {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/user/get-upload/${id}`)
        .send({ ff_jwt: localStorage.getItem('ff_jwt') });
      dispatch(uploadData(response.body));
    } catch (error) {
      localStorage.removeItem('ff_jwt');
    }
  };
}

export function getUserUploads(pagination) {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/user/get_user_uploads/`)
        .send({ ff_jwt: localStorage.getItem('ff_jwt'), ...pagination });
      dispatch(userUploadsObj(response.body));
    } catch (error) {
      localStorage.removeItem('ff_jwt');
    }
  };
}
