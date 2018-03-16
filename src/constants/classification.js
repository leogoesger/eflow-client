export const classification = [
  'Snowmelt',
  'High-volume snowmelt and rain',
  'Low-volume snowmelt and rain',
  'Winter Storms',
  'Groudwater',
  'Perenial Groundwater and Rain',
  'Flashy, ephemeral rain',
  'Rain and seasonal groundwater',
  'High elevation low precipitation',
];

export const classificationShort = [
  'SM',
  'HSR',
  'LSR',
  'WS',
  'GW',
  'PGR',
  'FER',
  'RSG',
  'HLP',
];
export const classInfo = {
  class1: {
    abbre: 'SM',
    fullName: 'Snowmelt',
    gaugeCount: 24,
    colors: ['#fbc02d', '#fff176'],
  },
  class2: {
    abbre: 'HSR',
    fullName: 'High-volume snowmelt and rain',
    gaugeCount: 7,
    colors: ['#0D47A1', '#64b5f6'],
  },
  class3: {
    abbre: 'LSR',
    fullName: 'Low-volume snowmelt and rain',
    gaugeCount: 65,
    colors: ['#00bcd4', '#81d4fa'],
  },
  class4: {
    abbre: 'WS',
    fullName: 'Winter Storms',
    gaugeCount: 34,
    colors: ['#ff6f00', '#ffcc80'],
  },
  class5: {
    abbre: 'GW',
    fullName: 'Groudwater',
    gaugeCount: 1,
    colors: ['#F44336', '#ef9a9a'],
  },
  class6: {
    abbre: 'PGR',
    fullName: 'Perenial Groundwater and Rain',
    gaugeCount: 56,
    colors: ['#087f23', '#a5d6a7'],
  },
  class7: {
    abbre: 'FER',
    fullName: 'Flashy, ephemeral rain',
    gaugeCount: 12,
    colors: ['#f06292', '#f8bbd0'],
  },
  class8: {
    abbre: 'RSG',
    fullName: 'Rain and seasonal groundwater',
    gaugeCount: 23,
    colors: ['#7E57C2', '#e1bee7'],
  },
  class9: {
    abbre: 'HLP',
    fullName: 'High elevation low precipitation',
    gaugeCount: 2,
    colors: ['#C51162', '#f06292'],
  },
};
export const classificationColor = [
  ['#fbc02d', '#fff176'], //yellow
  ['#0D47A1', '#64b5f6'], //blue
  ['#00bcd4', '#81d4fa'], //light blue
  ['#ff6f00', '#ffcc80'], //orange Winter storm
  ['#F44336', '#ef9a9a'], //red
  ['#087f23', '#a5d6a7'], //green
  ['#f06292', '#f8bbd0'], //pink
  ['#7E57C2', '#e1bee7'], //purple
  ['#C51162', '#f06292'], //dark red
];

export const metricNameMap = {
  Avg: 'Average',
  Std: 'Standard Deviation',
  CV: 'Coefficient of Variance',
  SP_Tim: 'Spring Transition Timing',
  SP_Mag: 'Spring Transition Magnitude',
  SP_Dur: 'Spring Transition Duration',
  SP_ROC: 'Spring Transition Rate of Change',
  SU_BFL_Tim: 'Summer Baseflow Timing',
  SU_BFL_Mag_10: 'Summer Baseflow Magnitude 10P',
  SU_BFL_Mag_50: 'Summer Baseflow Magnitude 50P',
  SU_BFL_Dur_Fl: 'Summer Baseflow Duration until Fall Flush',
  SU_BFL_Dur_Wet: 'Summer Baseflow Duration until Wet Season',
  SU_BFL_No_Flow: 'Summer Baseflow with no flow days',
  FAFL_Tim: 'Fall Flush Timing',
  FAFL_Mag: 'Fall Flush Magnitude',
  FAFL_Tim_Wet: 'Start of Wet Season',
  FAFL_Dur: 'Fall Flush Duration',
  Wet_BFL_Mag: 'Wet Baseflow Magnitude',
  WIN_Tim_2: 'Winter Timing 2 Percent Exceedance',
  WIN_Dur_2: 'Winter Duration 2 Percent Exceedance',
  WIN_Fre_2: 'Winter Frequency 2 Percent Exceedance',
  WIN_Tim_5: 'Winter Timing 5 Percent Exceedance',
  WIN_Dur_5: 'Winter Duration 5 Percent Exceedance',
  WIN_Fre_5: 'Winter Frequency 5 Percent Exceedance',
  WIN_Tim_10: 'Winter Timing 10 Percent Exceedance',
  WIN_Dur_10: 'Winter Duration 10 Percent Exceedance',
  WIN_Fre_10: 'Winter Frequency 10 Percent Exceedance',
  WIN_Tim_20: 'Winter Timing 20 Percent Exceedance',
  WIN_Dur_20: 'Winter Duration 20 Percent Exceedance',
  WIN_Fre_20: 'Winter Frequency 20 Percent Exceedance',
  WIN_Tim_50: 'Winter Timing 50 Percent Exceedance',
  WIN_Dur_50: 'Winter Duration 50 Percent Exceedance',
  WIN_Fre_50: 'Winter Frequency 50 Percent Exceedance',
};
