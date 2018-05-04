export const metricReference = [
  {
    name: 'allYearAverage',
    nonDimUnit: 'none',
    dimUnit: 'cfs',
    display: 'All Year Average',
    isBoxplotOverlay: false,
    tableName: 'AllYears',
    displayTableName: 'All Year',
    columnName: 'average',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#f9a825', '#c17900'],
    hidden: true,
  },
  {
    name: 'allYearStandardDeviation',
    display: 'All Year Standard Deviation',
    isBoxplotOverlay: false,
    tableName: 'AllYears',
    displayTableName: 'All Year',
    columnName: 'standardDeviation',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#fbc02d', '#c49000'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
    hidden: true,
  },
  {
    name: 'allYearCoeffientVariance',
    display: 'All Year Coeffient Variance',
    isBoxplotOverlay: false,
    tableName: 'AllYears',
    displayTableName: 'All Year',
    columnName: 'coeffientVariance',
    boxPlotOverLayMethods: ['#fdd835', '#c6a700'],
    colors: ['#fbc02d', '#c49000'],
    nonDimUnit: 'none',
    dimUnit: 'none',
    hidden: true,
  },
  {
    name: 'springTiming',
    display: 'Spring Timing',
    isBoxplotOverlay: true,
    tableName: 'Springs',
    displayTableName: 'Spring',
    columnName: 'timing',
    boxPlotOverLayMethods: [
      'fetchSpringBoxPlotData',
      'removeSpringBoxPlotData',
    ],
    colors: ['#2e7d32', '#005005'],
    nonDimUnit: 'Julian Date',
    dimUnit: 'julian date',
  },
  {
    name: 'springMagnitude',
    display: 'Spring Magnitude',
    isBoxplotOverlay: true,
    tableName: 'Springs',
    displayTableName: 'Spring',
    columnName: 'magnitude',
    boxPlotOverLayMethods: [
      'fetchSpringBoxPlotData',
      'removeSpringBoxPlotData',
    ],
    colors: ['#388e3c', '#00600f'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'springDuration',
    display: 'Spring Duration',
    isBoxplotOverlay: false,
    tableName: 'Springs',
    displayTableName: 'Spring',
    columnName: 'duration',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#43a047', '#00701a'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'springRateOfChange',
    display: 'Spring Rate of Change',
    isBoxplotOverlay: false,
    tableName: 'Springs',
    displayTableName: 'Spring',
    columnName: 'rateOfChange',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#4caf50', '#087f23'],
    nonDimUnit: '%',
    dimUnit: '%',
  },
  {
    name: 'summerTiming',
    display: 'Summer Timing',
    isBoxplotOverlay: true,
    tableName: 'Summers',
    displayTableName: 'Summer',
    columnName: 'timing',
    boxPlotOverLayMethods: [
      'fetchSummerBoxPlotData',
      'removeSummerBoxPlotData',
    ],
    colors: ['#d84315', '#9f0000'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'summerMagnitude10',
    display: 'Summer Baseflow',
    isBoxplotOverlay: true,
    tableName: 'Summers',
    displayTableName: 'Summer',
    columnName: 'magnitude10',
    boxPlotOverLayMethods: [
      'fetchSummerBoxPlotData',
      'removeSummerBoxPlotData',
    ],
    colors: ['#e64a19', '#ac0800'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'summerMagnitude50',
    display: 'Summer Magnitude 50P',
    isBoxplotOverlay: false,
    tableName: 'Summers',
    displayTableName: 'Summer',
    columnName: 'magnitude50',
    boxPlotOverLayMethods: [
      'fetchSummerBoxPlotData',
      'removeSummerBoxPlotData',
    ],
    colors: ['#f4511e', '#b91400'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
    hidden: true,
  },
  {
    name: 'summerDurationFlush',
    display: 'Summer Duration Flush',
    isBoxplotOverlay: false,
    tableName: 'Summers',
    displayTableName: 'Summer',
    columnName: 'durationFlush',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ff5722', '#c41c00'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'summerDurationWet',
    display: 'Summer Duration Wet',
    isBoxplotOverlay: false,
    tableName: 'Summers',
    displayTableName: 'Summer',
    columnName: 'durationWet',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ff7043', '#c63f17'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'summerNoFlow',
    display: 'Summer No Flow Count',
    isBoxplotOverlay: false,
    tableName: 'Summers',
    displayTableName: 'Summer',
    columnName: 'noFlowCount',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ff8a65', '#c75b39'],
    nonDimUnit: 'counts',
    dimUnit: 'counts',
  },
  {
    name: 'fallTiming',
    display: 'Fall Timing',
    isBoxplotOverlay: true,
    tableName: 'Falls',
    displayTableName: 'Fall',
    columnName: 'timing',
    boxPlotOverLayMethods: ['fetchFallBoxPlotData', 'removeFallBoxPlotData'],
    colors: ['#ff8f00', '#c56000'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'fallMagnitude',
    display: 'Fall Magnitude',
    isBoxplotOverlay: true,
    tableName: 'Falls',
    displayTableName: 'Fall',
    columnName: 'magnitude',
    boxPlotOverLayMethods: ['fetchFallBoxPlotData', 'removeFallBoxPlotData'],
    colors: ['#ffa000', '#c67100'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'fallTimingWet',
    display: 'Fall Timing Wet',
    isBoxplotOverlay: true,
    tableName: 'Falls',
    displayTableName: 'Fall',
    columnName: 'timingWet',
    boxPlotOverLayMethods: ['fetchFallBoxPlotData', 'removeFallBoxPlotData'],
    colors: ['#ffb300', '#c68400'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'fallDuration',
    display: 'Fall Duration',
    isBoxplotOverlay: false,
    tableName: 'Falls',
    displayTableName: 'Fall',
    columnName: 'duration',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ffc107', '#c79100'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'fallwinterMagWet',
    display: 'Winter Baseflow',
    isBoxplotOverlay: true,
    tableName: 'FallWinters',
    displayTableName: 'Winter',
    columnName: 'magWet',
    boxPlotOverLayMethods: [
      'fetchFallWinterBoxPlotData',
      'removeFallWinterBoxPlotData',
    ],
    colors: ['#00695c', '#003d33'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'winterMagnitude2',
    display: 'Winter Magnitude 2P',
    isBoxplotOverlay: true,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'magnitude2',
    boxPlotOverLayMethods: [
      'fetchWinterBoxPlotData',
      'removeWinterBoxPlotData',
    ],
    colors: ['#6a1b9a', '#38006b'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'winterMagnitude5',
    display: 'Winter Magnitude 5P',
    isBoxplotOverlay: true,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'magnitude5',
    boxPlotOverLayMethods: [
      'fetchWinterBoxPlotData',
      'removeWinterBoxPlotData',
    ],
    colors: ['#8e24aa', '#5c007a'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'winterMagnitude10',
    display: 'Winter Magnitude 10P',
    isBoxplotOverlay: true,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'magnitude10',
    boxPlotOverLayMethods: [
      'fetchWinterBoxPlotData',
      'removeWinterBoxPlotData',
    ],
    colors: ['#9c27b0', '#6a0080'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'winterMagnitude20',
    display: 'Winter Magnitude 20P',
    isBoxplotOverlay: true,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'magnitude20',
    boxPlotOverLayMethods: [
      'fetchWinterBoxPlotData',
      'removeWinterBoxPlotData',
    ],
    colors: ['#ab47bc', '#790e8b'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'winterMagnitude50',
    display: 'Winter Magnitude 50P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'magnitude50',
    boxPlotOverLayMethods: [
      'fetchWinterBoxPlotData',
      'removeWinterBoxPlotData',
    ],
    colors: ['#ba68c8', '#883997'],
    nonDimUnit: 'none',
    dimUnit: 'cfs',
  },
  {
    name: 'winterTiming2',
    display: 'Winter Timing 2P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'timing2',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#6a1b9a', '#38006b'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'winterTiming5',
    display: 'Winter Timing 5P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'timing5',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#8e24aa', '#5c007a'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'winterTiming10',
    display: 'Winter Timing 10P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'timing10',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#9c27b0', '#6a0080'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'winterTiming20',
    display: 'Winter Timing 20P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'timing20',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ab47bc', '#790e8b'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'winterTiming50',
    display: 'Winter Timing 50P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'timing50',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ba68c8', '#883997'],
    nonDimUnit: 'julian date',
    dimUnit: 'julian date',
  },
  {
    name: 'winterDuration2',
    display: 'Winter Duration 2P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'duration2',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#6a1b9a', '#38006b'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'winterDuration5',
    display: 'Winter Duration 5P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'duration5',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#8e24aa', '#5c007a'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'winterDuration10',
    display: 'Winter Duration 10P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'duration10',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#9c27b0', '#6a0080'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'winterDuration20',
    display: 'Winter Duration 20P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'duration20',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ab47bc', '#790e8b'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'winterDuration50',
    display: 'Winter Duration 50P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'duration50',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ba68c8', '#883997'],
    nonDimUnit: 'days',
    dimUnit: 'days',
  },
  {
    name: 'winterFrequency2',
    display: 'Winter Frequency 2P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'frequency2',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#6a1b9a', '#38006b'],
    nonDimUnit: 'counts',
    dimUnit: 'counts',
  },
  {
    name: 'winterFrequency5',
    display: 'Winter Frequency 5P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'frequency5',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#8e24aa', '#5c007a'],
    nonDimUnit: 'counts',
    dimUnit: 'counts',
  },
  {
    name: 'winterFrequency10',
    display: 'Winter Frequency 10P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'frequency10',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#9c27b0', '#6a0080'],
    nonDimUnit: 'counts',
    dimUnit: 'counts',
  },
  {
    name: 'winterFrequency20',
    display: 'Winter Frequency 20P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'frequency20',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ab47bc', '#790e8b'],
    nonDimUnit: 'counts',
    dimUnit: 'counts',
  },
  {
    name: 'winterFrequency50',
    display: 'Winter Frequency 50P',
    isBoxplotOverlay: false,
    tableName: 'Winters',
    displayTableName: 'Winter',
    columnName: 'frequency50',
    boxPlotOverLayMethods: ['', ''],
    colors: ['#ba68c8', '#883997'],
    nonDimUnit: 'counts',
    dimUnit: 'counts',
  },
];
