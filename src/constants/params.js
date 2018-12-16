export const params = {
  winter_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
  },

  fall_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
    // Don't calculate flow metrics if max flow is befow this value.
    min_flow_rate: 1,
    sigma: 0.2, // Smaller filter to find fall flush peak
    broad_sigma: 15, // Larger filter to find wet season peak
    wet_season_sigma: 12, // Medium sigma to find wet season initation peak
    peak_sensitivity: 0.005, // smaller value detects more peaks
    // larger value used for detection of wet season initiation
    peak_sensitivity_wet: 0.005,
    max_flush_duration: 40, // Maximum duration from start to end, for fall flush peak
    // <- * min_flush, to satisfy the min required to be called a flush
    min_flush_percentage: 0.1,
    // Return to wet season flow must be certain percentage of that year's max flow
    wet_threshold_perc: 0.2,
    // The peak identified to search after for wet season initation
    peak_detect_perc: 0.3,
    // Size of flush peak, from rising limb to top of peak, has great enough change
    flush_threshold_perc: 0.3,
    min_flush_threshold: 1, // minimum allowable magnitude threshold for fall flush flow
    // Latest accepted date for fall flush, in Julian Date counting from Oct 1st = 0. (i.e. Dec 15th = 75)
    date_cutoff: 75,
  },

  spring_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
    // max search date for the peak flow date
    max_peak_flow_date: 350,
    search_window_left: 20, // left side of search window set around max peak
    search_window_right: 50, // right side of search window set around max peak
    peak_sensitivity: 0.1, // smaller':> more peaks detection
    // Relative flow (Q-Qmin) of start of spring must be certain percentage of peak relative flow (Qmax-Qmin)
    peak_filter_percentage: 0.5,
    // If filtered max flow is below this, automatically set spring timing to max flow
    min_max_flow_rate: 0.1,
    window_sigma: 10, // Heavy filter to identify major peaks in entire water year
    // Smaller filter to identify small peaks in windowed data (smaller sigma val => less filter)
    fit_sigma: 1.3,
    sensitivity: 0.2, // 0.1 - 10, 10 being the most sensitive
    // the detected date's flow has be certain percentage of the max flow in that region
    min_percentage_of_max_flow: 0.5,
    lag_time: 4,
    // Earliest accepted date for spring timing, in Julian Date couting from Oct 1st = 0 (i.e. February 15 = 138)
    timing_cutoff: 138,
    // Don't calculate flow metrics if max flow is befow this value.
    min_flow_rate: 1,
  },

  summer_params: {
    max_zero_allowed_per_year: 270,
    max_nan_allowed_per_year: 100,
    // scalar to set amount of smoothing
    sigma: 7,
    // increased sensitivity returns smaller threshold for derivative
    sensitivity: 900,
    // identifies last major peak after which to search for start date
    peak_sensitivity: 0.2,
    // max search date for the peak flow date
    max_peak_flow_date: 325,
    // require that summer start is below this flow threshold. Represents percentage of the flow difference between annual max flow and summer minimum.
    min_summer_flow_percent: 0.125,
    // Don't calculate flow metrics if max flow is befow this value.
    min_flow_rate: 1,
  },

  general_params: {
    annual_result_low_Percentille_filter: 0,
    annual_result_high_Percentille_filter: 100,
    max_nan_allowed_per_year: 100,
  },
};

export const paramRange = {
  winter_params: {
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
    },
    map: 'Winter Season',
  },

  fall_params: {
    map: 'Fall Season',
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
    },
    // Don't calculate flow metrics if max flow is befow this value.
    min_flow_rate: { min: 0, max: 1500, step: 1, map: 'Min Flow rate' },
    sigma: { min: 0, max: 366, step: 0.1, map: 'Sigma' }, // Smaller filter to find fall flush peak
    broad_sigma: { min: 0, max: 366, step: 0.1, map: 'Broad Sigma' }, // Larger filter to find wet season peak
    wet_season_sigma: { min: 0, max: 366, step: 0.1, map: 'Wet Season Sigma' }, // Medium sigma to find wet season initation peak
    peak_sensitivity: {
      min: 0,
      max: 366,
      step: 0.001,
      map: 'Peak Sensitivity',
    }, // smaller value detects more peaks
    // larger value used for detection of wet season initiation
    peak_sensitivity_wet: {
      min: 0,
      max: 366,
      step: 0.001,
      map: 'Peak Sensitivity Wet',
    },
    max_flush_duration: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Flush duration',
    }, // Maximum duration from start to end, for fall flush peak
    // <- * min_flush, to satisfy the min required to be called a flush
    min_flush_percentage: { min: 0, max: 100, step: 0.01, map: 'Min Flush %' },
    // Return to wet season flow must be certain percentage of that year's max flow
    wet_threshold_perc: {
      min: 0,
      max: 100,
      step: 0.01,
      map: 'Wet Threshold %',
    },
    // The peak identified to search after for wet season initation
    peak_detect_perc: { min: 0, max: 100, step: 0.01, map: 'Peak Detect %' },
    // Size of flush peak, from rising limb to top of peak, has great enough change
    flush_threshold_perc: {
      min: 0,
      max: 100,
      step: 0.01,
      map: 'Flush Threshold %',
    },
    min_flush_threshold: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Min Flush Threshold',
    }, // minimum allowable magnitude threshold for fall flush flow
    // Latest accepted date for fall flush, in Julian Date counting from Oct 1st = 0. (i.e. Dec 15th = 75)
    date_cutoff: { min: 0, max: 366, step: 1, map: 'Date Cutoff' },
  },

  spring_params: {
    map: 'Spring Season',
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
    },
    // max search date for the peak flow date
    max_peak_flow_date: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Peak Flow Date',
    },
    search_window_left: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Left Search Window',
    }, // left side of search window set around max peak
    search_window_right: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Right Search Window',
    }, // right side of search window set around max peak
    peak_sensitivity: {
      min: 0,
      max: 366,
      step: 0.001,
      map: 'Peak Sensitivity',
    }, // smaller':> more peaks detection
    // Relative flow (Q-Qmin) of start of spring must be certain percentage of peak relative flow (Qmax-Qmin)
    peak_filter_percentage: {
      min: 0,
      max: 100,
      step: 0.01,
      map: 'Peak Filter %',
    },
    // If filtered max flow is below this, automatically set spring timing to max flow
    min_max_flow_rate: {
      min: 0,
      max: 100,
      step: 0.01,
      map: 'Min Max Flow Rate',
    },
    window_sigma: { min: 0, max: 366, step: 0.1, map: 'Window Sigma' }, // Heavy filter to identify major peaks in entire water year
    // Smaller filter to identify small peaks in windowed data (smaller sigma val => less filter)
    fit_sigma: { min: 0, max: 366, step: 0.1, map: 'Fit Sigma' },
    sensitivity: { min: 0, max: 10, step: 0.1, map: 'Sensitivity' }, // 0.1 - 10, 10 being the most sensitive
    // the detected date's flow has be certain percentage of the max flow in that region
    min_percentage_of_max_flow: {
      min: 0,
      max: 100,
      step: 0.1,
      map: 'Min % of Max Flow',
    },
    lag_time: { min: 0, max: 366, step: 1, map: 'Lag Time' },
    // Earliest accepted date for spring timing, in Julian Date couting from Oct 1st = 0 (i.e. February 15 = 138)
    timing_cutoff: { min: 0, max: 366, step: 1, map: 'TIming Cutoff' },
    // Don't calculate flow metrics if max flow is befow this value.
    min_flow_rate: { min: 0, max: 366, step: 1, map: 'Min Flow Rate' },
  },

  summer_params: {
    map: 'Summer Season',
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
    },
    // scalar to set amount of smoothing
    sigma: { min: 0, max: 366, step: 0.1, map: 'Sigma' },
    // increased sensitivity returns smaller threshold for derivative
    sensitivity: { min: 0, max: 1000, step: 1, map: 'Sensitivity' },
    // identifies last major peak after which to search for start date
    peak_sensitivity: {
      min: 0,
      max: 366,
      step: 0.001,
      map: 'Peak Sensitivity',
    },
    // max search date for the peak flow date
    max_peak_flow_date: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Peak Flow Date',
    },
    // require that summer start is below this flow threshold. Represents percentage of the flow difference between annual max flow and summer minimum.
    min_summer_flow_percent: {
      min: 0,
      max: 100,
      step: 0.1,
      map: 'Min Summer Flow %',
    },
    // Don't calculate flow metrics if max flow is befow this value.
    min_flow_rate: { min: 0, max: 366, step: 0.001, map: 'Min Flow Rate' },
  },

  general_params: {
    map: 'General Parameters',
    annual_result_low_Percentille_filter: {
      min: 0,
      max: 49,
      step: 1,
      map: 'Annual Result Low Percentile Filter',
    },
    annual_result_high_Percentille_filter: {
      min: 51,
      max: 100,
      step: 1,
      map: 'Annual Result Max Percentile Filter',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN Allowed/Year',
    },
  },
};
