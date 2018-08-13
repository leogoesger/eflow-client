import request from "superagent";

const FF_JWT = localStorage.getItem("FF_JWT");

const requests = {
  updateClassMetric: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/update-class-metrics`)
      .set("FF_JWT", FF_JWT),
  updateGaugeMetric: id =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/update-gauge-metrics/${id}`)
      .set("FF_JWT", FF_JWT),
  broadcastMessage: async msg => {
    console.log(msg, FF_JWT); //eslint-disable-line
    return await request
      .post(`${process.env.SERVER_ADDRESS}/api/admin/broadcast-message`)
      .send({ message: msg })
      .set("FF_JWT", FF_JWT);
  },
  uploadFlowData: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-flow-date`)
      .set("FF_JWT", FF_JWT),
  uploadMetricResult: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-metric-result`)
      .set("FF_JWT", FF_JWT),
  uploadClassHydrograph: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-class-hydrograph`)
      .set("FF_JWT", FF_JWT),
  uploadGaugeHydrograph: () =>
    request
      .get(`${process.env.SERVER_ADDRESS}/api/admin/upload-gauge-hydrograph`)
      .set("FF_JWT", FF_JWT),
};

export default requests;
