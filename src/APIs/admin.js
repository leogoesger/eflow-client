import request from "superagent";

const requests = {
  updateClassMetric: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/update-class-metrics`)
      .set("ff_jwt", localStorage.getItem("ff_jwt")),
  updateGaugeMetric: id =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/update-gauge-metrics/${id}`)
      .set("ff_jwt", localStorage.getItem("ff_jwt")),
  broadcastMessage: msg => {
    return request
      .post(`${process.env.SERVER_ADDRESS}/api/admin/broadcast-message`)
      .send({ message: msg })
      .set("ff_jwt", localStorage.getItem("ff_jwt"));
  },

  uploadFlowData: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-flow-date`)
      .set("ff_jwt", localStorage.getItem("ff_jwt")),
  uploadMetricResult: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-metric-result`)
      .set("ff_jwt", localStorage.getItem("ff_jwt")),
  uploadClassHydrograph: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-class-hydrograph`)
      .set("ff_jwt", localStorage.getItem("ff_jwt")),
  uploadGaugeHydrograph: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-gauge-hydrograph`)
      .set("ff_jwt", localStorage.getItem("ff_jwt")),
};

export default requests;
