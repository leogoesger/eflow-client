import request from 'superagent';
import {metricReference} from '../constants/metrics';

const getClassDataClourse = async (counter, tableName, columnName) => {
  const classData = [];
  const getClassData = async (counter, tableName, columnName) => {
    if (counter > 9) {
      return;
    }
    const currentData = await request
      .post(
        `${process.env.SERVER_ADDRESS}/api/${tableName}/getBoxPlotAttributes`
      )
      .send({classId: counter, nonDim: false, metric: columnName});
    classData.push(Object.assign({}, currentData.body, {classId: counter}));
    counter++;
    await getClassData(counter, tableName, columnName);
  };
  await getClassData(counter, tableName, columnName);
  return classData;
};

export const getAllMetricBoxPlotClourse = async counter => {
  const allMetricBoxPlots = {};
  const getData = async counter => {
    if (counter > metricReference.length - 1) {
      return;
    }
    const {tableName, columnName} = metricReference[counter];
    if (!allMetricBoxPlots[tableName]) {
      allMetricBoxPlots[tableName] = {};
    }
    allMetricBoxPlots[tableName][columnName] = await getClassDataClourse(
      1,
      tableName,
      columnName
    );
    counter++;
    await getData(counter);
  };
  await getData(counter);
  return allMetricBoxPlots;
};
