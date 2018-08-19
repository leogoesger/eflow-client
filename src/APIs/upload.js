import request from "superagent";

const upload = {
  uploadTimeSeries: d => {
    return request
      .post(`${process.env.SERVER_ADDRESS}/api/uploadData`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt"), ...d });
  },

  deleteTimeSeries: id => {
    return request
      .del(`${process.env.SERVER_ADDRESS}/api/uploadData`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt"), id });
  },
};

export default upload;
