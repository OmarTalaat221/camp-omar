export const barChartData = {
  labels: ["Mon", "Tue", "Wen", "Thus", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "y",
      lagend: "y",
      data: [35, 59, 80, 81, 56, 55, 40],
      borderColor: "#eb5d22",
      backgroundColor: "rgba(126,  55, 216, 0.6)",
      highlightFill: "rgba(6, 181, 221, 1)",
      highlightStroke: "#06b5dd",
      borderWidth: 2,
    },
    {
      label: "z",
      lagend: "z",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "#06b5dd",
      backgroundColor: "rgba(6, 181, 221, 0.8)",
      highlightFill: "rgba(6, 181, 221, 0.8)",
      highlightStroke: "#06b5dd",
      borderWidth: 2,
    },
  ],
  plugins: {
    datalabels: {
      display: false,
      color: "white",
    },
  },
};
export const barChartOptions = {
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
};

export const linegraphData = {
  labels: ["Mon", "Tue", "Wen", "Thus", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "My Second dataset",
      backgroundColor: "rgba(126,  55, 216, 0.3)",
      borderColor: "#eb5d22",
      pointColor: "#eb5d22",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#000",
      pointHighlightStroke: "rgba(30, 166, 236, 1)",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
    {
      label: "My First dataset",
      backgroundColor: "rgba(6, 181, 221, 0.5)",
      borderColor: "#06b5dd",
      pointColor: "#06b5dd",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#000",
      data: [10, 59, 80, 81, 56, 55, 40],
    },
  ],
  plugins: {
    datalabels: {
      display: false,
      color: "white",
    },
  },
};
export const linegraphOptions = {
  maintainAspectRatio: true,

  legend: {
    display: false,
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
};

export const radargraphData = {
  labels: ["Ford", "Chevy", "Toyota", "Honda", "Mazda"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(6, 181, 221, 0.5)",
      borderColor: "#06b5dd",
      pointBackgroundColor: "rgba(68, 102, 242, 0.4)",
      pointBorderColor: "#06b5dd",
      pointHoverBackgroundColor: "#06b5dd",
      pointHoverBorderColor: "rgba(6, 181, 221, 0.4)",
      data: [12, 3, 5, 18, 7],
    },
  ],
};
export const radargraphOption = {
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.2)",
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 3,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
};

export const lineChartData = {
  labels: ["", "10", "20", "30", "40", "50", "60", "70", "80"],
  datasets: [
    {
      backgroundColor: "rgba(21, 141, 247, 0.2)",
      borderColor: "#158df7",
      pointColor: "#158df7",
      data: [10, 20, 40, 30, 0, 20, 10, 30, 10],
      lineTension: 0,
    },
    {
      backgroundColor: "rgba(126,  55, 216, 0.2)",
      borderColor: "#eb5d22",
      pointColor: "#eb5d22",
      data: [20, 40, 10, 20, 40, 30, 40, 10, 20],
      lineTension: 0,
    },
    {
      backgroundColor: "rgba(253, 81, 125, 0.2)",
      borderColor: "#fd517d",
      pointColor: "#fd517d",
      data: [60, 10, 40, 30, 80, 30, 20, 90, 0],
      lineTension: 0,
    },
  ],
};
export const lineChartoption = {
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  legend: {
    display: false,
  },
  scaleShowVerticalLines: false,
  plugins: {
    datalabels: {
      display: false,
      color: "white",
    },
  },
};

export const doughnutData = {
  labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],

  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#eb5d22", "#fe80b2", "#80cf00"],
    },
  ],
};
export const doughnutOption = {
  maintainAspectRatio: false,

  legend: {
    display: false,
  },
  plugins: {
    datalabels: {
      display: false,
      color: "white",
    },
  },
};

export const polarData = {
  labels: [
    "Download Sales",
    "In-Store Sales",
    "Mail Sales",
    "Telesales",
    "Corporate Sales",
  ],
  datasets: [
    {
      label: ["Yellow", "Sky", "Black", "Grey", "Dark Grey"],
      pointHoverBackgroundColor: "rgba(126,  55, 216, 1)",
      data: [300, 50, 100, 40, 120],
      backgroundColor: ["#eb5d22", "#80cf00", "#fe80b2", "#06b5dd", "#fd517d"],
    },
  ],
};

export const polarOption = {
  legend: {
    display: false,
  },
};
