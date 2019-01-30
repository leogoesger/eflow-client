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
    broad_sigma: 15,
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
    map: 'Wet Season',
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
      description:
        'Maximum zero-flow days allowed in a single water year. If value is exceeded, then calculations will not be performed.',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
      description:
        'Maximum NA value days allowed in a single water year. If value is exceeded, then calculations will not be performed.',
    },
  },

  fall_params: {
    map: 'Wet Season Initiation',
    min_flush_percentage: {
      min: 0,
      max: 100,
      step: 1,
      map: 'Min Flush %',
      description: '',
    },
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
      description:
        'Maximum zero-flow days allowed in a single water year. If value is exceeded, then calculations will not be performed.',
    },
    broad_sigma: {
      min: 0,
      max: 25,
      step: 1,
      map: 'Large Smoothing Filter',
      description:
        'Large smoothing filter used to find start timing of the wet season. Recommended value between 10-20. ',
    }, // Larger filter to find wet season peak
    peak_detect_perc: {
      min: 0,
      max: 1,
      step: 0.1,
      map: 'Peak Detect %',
      description:
        'The relative magnitude required for the start of the wet season peak',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
      description:
        'Maximum NA value days allowed in a single water year. If value is exceeded, then calculations will not be performed.',
    },
    min_flow_rate: {
      min: 0,
      max: 1000,
      step: 100,
      map: 'Min Flow rate',
      description:
        "Don't calculate flow metrics if max flow is befow this value.",
    },
    max_flush_duration: {
      min: 0,
      max: 100,
      step: 1,
      map: 'Max Flush duration',
      description:
        'Maximum allowed duration of the wet season initation peak, from the start to the end of the peak. ',
    },
    wet_threshold_perc: {
      min: 0,
      max: 1,
      step: 0.01,
      map: 'Wet Threshold %',
      description:
        "The flow at the start of the wet season must be a certain percentage of that year's max flow.",
    },
    peak_sensitivity: {
      min: 0.001,
      max: 5,
      step: 0.01,
      map: 'Peak Sensitivity',
    },
    sigma: {
      min: 0,
      max: 25,
      step: 1,
      map: 'Small Peak Detection Filter',
      description:
        'Small smoothing filter to find fall flush peak. Recommended value between 0.1-0.5. ',
    },
    wet_season_sigma: {
      min: 0,
      max: 25,
      step: 1,
      map: 'Large Peak Detection Filter',
      description:
        'Medium smoothing filter to find wet season initation peak. Recommended value between 5-15. ',
    },
    peak_sensitivity_wet: {
      min: 0.001,
      max: 5,
      step: 0.01,
      map: 'Peak Sensitivity - Wet Season Start',
      description:
        'Sensitivity factor for identifying the peak that signals the start of the wet season. A smaller value detects more peaks.',
    },
    flush_threshold_perc: {
      min: 0,
      max: 1,
      step: 0.1,
      map: 'Peak Percent Change',
      description:
        'Size of the wet season initiation peak, from rising limb to top of the peak, must reach this amount of relative change',
    },
    min_flush_threshold: {
      min: 0,
      max: 1,
      step: 0.1,
      map: 'Min Flush Threshold',
      description:
        'Minimum allowable magnitude for wet season initiation peak flow.',
    }, // minimum allowable magnitude threshold for fall flush flow
    // Latest accepted date for fall flush, in Julian Date counting from Oct 1st = 0. (i.e. Dec 15th = 75)
    date_cutoff: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Date Cutoff',
      description:
        'Latest accepted date for fall flush, in Julian Dates counting from Oct 1st = 0 (i.e. Dec 15th = 75).',
    },
  },
  spring_params: {
    map: 'Spring Recession',
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
      description:
        'Maximum zero-flow days allowed in a single water year. If value is exceeded, then calculations will not be performed.',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
      description:
        'Maximum NA value days allowed in a single water year. If value is exceeded, then calculations will not be performed. ',
    },
    max_peak_flow_date: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Peak Flow Date',
      description:
        'Max search date for the spring recession pulse flow, in Julian Dates counting from Oct 1st = 0 (i.e. Dec 15th = 75). ',
    },
    search_window_left: {
      min: 0,
      max: 100,
      step: 5,
      map: 'Left Search Window',
      description:
        'Search window for the spring recession date extends this many days before the max peak.',
    },
    search_window_right: {
      min: 0,
      max: 100,
      step: 5,
      map: 'Right Search Window',
      description:
        'Search window for the spring recession date extends this many days after the max peak.',
    },
    peak_sensitivity: {
      min: 0.01,
      max: 10,
      step: 0.02,
      map: 'Peak Sensitivity',
      description:
        'Amount of sensitivity when searching for potential spring recession peaks, where 10 is the most sensitive. ',
    },
    peak_filter_percentage: {
      min: 0,
      max: 1,
      step: 0.01,
      map: 'Relative Flow Threshold',
      description:
        'Relative flow (Q-Qmin) of the spring recession must be a certain percentage of peak relative flow (Q-Qmin)/(Qmax-Qmin)',
    },
    min_max_flow_rate: {
      min: 0,
      max: 50,
      step: 1,
      map: 'Minimum Flow Rate',
      description:
        "If the smoothed max flow is below this value, automatically set spring timing to the year's max flow. This is only recommended for extremely low flow years. ",
    },
    window_sigma: {
      min: 0,
      max: 25,
      step: 1,
      map: 'Large Peak Detection Filter',
      description:
        'Large smoothing filter used to find general location of spring recession. Recommended value between 5-15.',
    },
    fit_sigma: {
      min: 0,
      max: 25,
      step: 1,
      map: 'Small Peak Detection Filter',
      description:
        'Small smoothing filter used to detect peaks within a windowed range of data around the spring recession. Recommended value between 0.1-5. ',
    },
    sensitivity: {
      min: 0.1,
      max: 10,
      step: 0.1,
      map: 'Peak Slope Sensitivity',
      description:
        'Sets the amount of flow increase required in the four days leading up to the spring recession peak. The value ranges from 0.1-10, with 10 requiring the most slope increase. ',
    },
    min_percentage_of_max_flow: {
      min: 0,
      max: 1,
      step: 0.1,
      map: 'Relative Flow Threshold',
      description:
        'The detected spring recession peak magnitude must be a certain percent of max flow. Values range from 0-1, with a recommended value at or near 0.5. ',
    },
    lag_time: {
      min: 0,
      max: 50,
      step: 1,
      map: 'Lag Time',
      description:
        'Number of days that the final spring recession timing is lagged past the spring recession peak time. This is meant to eliminate effects of isolated storms on the magnitude value. Recommended value between 0-10 days. ',
    },
    timing_cutoff: {
      min: 0,
      max: 366,
      step: 1,
      map: 'TIming Cutoff',
      description:
        'Earliest allowed date for spring timing, in Julian Dates couting from Oct 1st = 0 (i.e. February 15 = 138).',
    },
    min_flow_rate: {
      min: 0,
      max: 1000,
      step: 1,
      map: 'Minimum Flow Rate',
      description:
        'Minimum flow rate needed in the water year for spring metrics to be calculated. ',
    },
  },

  summer_params: {
    map: 'Dry Season',
    max_zero_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Zero allowed/year',
      description:
        'Maximum zero-flow days allowed in a single water year. If value is exceeded, then calculations will not be performed. ',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN allowed/year',
      description:
        'Maximum NA value days allowed in a single water year. If value is exceeded, then calculations will not be performed. ',
    },
    sigma: {
      min: 0,
      max: 25,
      step: 1,
      map: 'Smoothing Filter',
      description:
        'Smoothing filter used to detect dry season timing. Recommended value between 5-15. ',
    },
    sensitivity: {
      min: 0,
      max: 1000,
      step: 10,
      map: 'Recession Slope Sensitivity',
      description:
        'Sets the max threshold for rate of change required for the start of the dry season. A higher value means a smaller degree of rate of change is required (stricter requirement). ',
    },
    peak_sensitivity: {
      min: 0,
      max: 10,
      step: 0.1,
      map: 'Peak Sensitivity',
      description:
        'Set sensitivity when searching for last major peak before dry season. A smaller value detects more peaks in the data. Recommended value between 0.01-0.5.',
    },
    max_peak_flow_date: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max Peak Flow Date',
      description:
        'Latest search date for the peak flow date, after which dry season is identified. ',
    },
    min_summer_flow_percent: {
      min: 0,
      max: 1,
      step: 0.1,
      map: 'Min Summer Flow %',
      description:
        'Summer start date must be below this flow threshold percentage. ',
    },
    min_flow_rate: {
      min: 0,
      max: 1000,
      step: 10,
      map: 'Min Flow Rate',
      description:
        'Minimum flow rate needed in the water year for dry season metrics to be calculated. ',
    },
  },

  general_params: {
    map: 'General Parameters',
    annual_result_low_Percentille_filter: {
      min: 0,
      max: 50,
      step: 1,
      map: 'Annual Result Low Percentile Filter',
      description:
        'Optionally filter outputs to only include results above this percentile (e.g., 10th percentile). Leave at 0 to not filter results. ',
    },
    annual_result_high_Percentille_filter: {
      min: 51,
      max: 100,
      step: 1,
      map: 'Annual Result Max Percentile Filter',
      description:
        'Optionally filter outputs to only include results below this percentile (e.g., 90th percentile). Leave at 100 to not filter results.  ',
    },
    max_nan_allowed_per_year: {
      min: 0,
      max: 366,
      step: 1,
      map: 'Max NaN Allowed/Year',
      description:
        'Set a maximum amount of NA values allowed per water year, above which no metrics will be calculated. ',
    },
  },
};
