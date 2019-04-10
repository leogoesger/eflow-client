import request from 'superagent';

const upload = {
  uploadTimeSeries: d => {
    return request
      .post(`${process.env.SERVER_ADDRESS}/api/uploadData`)
      .send({ ff_jwt: localStorage.getItem('ff_jwt'), ...d });
  },

  updateTimeSeries: d => {
    return request
      .put(`${process.env.SERVER_ADDRESS}/api/updateData`)
      .send({ ff_jwt: localStorage.getItem('ff_jwt'), ...d });
  },

  deleteTimeSeries: id => {
    return request
      .del(`${process.env.SERVER_ADDRESS}/api/uploadData`)
      .send({ ff_jwt: localStorage.getItem('ff_jwt'), id });
  },

  predictTimeSeries: (id, uploadDataId) => {
    return request
      .post(`${process.env.SERVER_ADDRESS}/api/class-predict`)
      .send({ ff_jwt: localStorage.getItem('ff_jwt'), id, uploadDataId });
  }
};

export default upload;
