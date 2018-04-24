import request from 'superagent';
import {metricReference} from '../constants/metrics';

const getClassData = async (tableName, columnName) => {
  const promises = [];
  for (let i = 1; i < 10; i++) {
    promises.push(
      request
        .post(
          `${process.env.SERVER_ADDRESS}/api/${tableName}/getBoxPlotAttributes`
        )
        .send({classId: i, nonDim: false, metric: columnName})
    );
  }
  return Promise.all(promises);
};

export const getAllMetricBoxPlotClourse = async () => {
  const allMetricBoxPlots = {},
    promises = [],
    map = [];
  for (let i = 0; i < metricReference.length - 1; i++) {
    const {tableName, columnName} = metricReference[i];
    map.push({tableName: tableName, columnName: columnName});
    promises.push(getClassData(tableName, columnName));
  }
  return Promise.all(promises).then(value => {
    value.forEach((data, index) => {
      if (!allMetricBoxPlots[map[index].tableName]) {
        allMetricBoxPlots[map[index].tableName] = {};
      }
      const newClassData = data.map((d, index) =>
        Object.assign({}, d.body, {classId: index + 1})
      );
      allMetricBoxPlots[map[index].tableName][
        map[index].columnName
      ] = newClassData;
    });
    return allMetricBoxPlots;
  });
};
