import request from "superagent";

const requests = {
  updateClassMetric: () =>
    request
      .post(`${process.env.SERVER_ADDRESS}/api/admin/update-class-metrics`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt") }),
  updateGaugeMetric: id =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/update-gauge-metrics/${id}`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt") }),
  broadcastMessage: msg => {
    return request
      .post(`${process.env.SERVER_ADDRESS}/api/admin/broadcast-message`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt"), message: msg });
  },
  uploadFlowData: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-flow-date`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt") }),
  uploadMetricResult: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-metric-result`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt") }),
  uploadClassHydrograph: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-class-hydrograph`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt") }),
  uploadGaugeHydrograph: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-gauge-hydrograph`)
      .send({ ff_jwt: localStorage.getItem("ff_jwt") }),
};

export default requests;
