import request from "superagent";

const upload = {
  uploadTimeSeries: d => {
    return request
      .post(`${process.env.SERVER_ADDRESS}/api/upload`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt"), ...d });
  },
};

export default upload;
