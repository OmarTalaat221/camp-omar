import "chartjs-plugin-datalabels";
import configDB from "../../../../data/customizer/config";
const primary = localStorage.getItem("primary_color") || configDB.data.color.primary_color;
const secondary = localStorage.getItem("secondary_color") || configDB.data.color.secondary_color;

export const chartist1data = {
  series: [
    {
      data: [400, 580, 200, 450, 650, 800],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 250,
      width: 370,
      toolbar: {
        show: false,
      },
    },
    colors: ["#fe80b2"],
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["J", "F", "M", "A", "M", "J"],
      labels: {
        show: true,
        style: {
          colors: "#fe80b2",
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
  },
};

export const chartist2data = {
  series: [
    {
      data: [400, 580, 200, 450, 650, 800],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 250,
      width: 370,
      toolbar: {
        show: false,
      },
    },
    colors: ["#158df7"],
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["J", "F", "M", "A", "M", "J"],
      labels: {
        show: true,
        style: {
          colors: "#158df7",
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  },
};

// export const chartist1Listener = {
//   draw: function (ctx) {
//     if (ctx.type === "bar") {
//       ctx.element.attr({
//         x1: ctx.x1 + 0.05,
//         style: "stroke-width: 15px ; stroke-linecap: round",
//       });
//     }
//   },
//   created: function (ctx) {
//     var defs = ctx.svg.elem("defs");
//     defs
//       .elem("linearGradient", {
//         id: "gradient",
//         x1: 0,
//         y1: 1,
//         x2: 0,
//         y2: 0,
//       })
//       .elem("stop", {
//         offset: 0,
//         "stop-color": primary,
//       })
//       .parent()
//       .elem("stop", {
//         offset: 1,
//         "stop-color": primary,
//       });
//   },
// };

// export const chartist2data = {
//   labels: ["J", "F", "M", "A", "M", "J"],
//   series: [[400, 580, 200, 450, 650, 800]],
// };
// export const chartist2option = {
//   low: 0,
//   offset: 0,
//   axisY: {
//     labelInterpolationFnc: function (value) {
//       return value / 1000 + "k";
//     },
//     showLabel: false,
//     showGrid: false,
//     offset: -26,
//   },
//   chartPadding: {
//     right: 0,
//   },
//   axisX: {
//     showGrid: false,
//   },
// };

export const chartist2Listener = {
  draw: function (ctx) {
    if (ctx.type === "bar") {
      ctx.element.attr({
        style: "stroke-width: 15px ; stroke-linecap: round",
      });
    }
  },
};

export const chartistecommerce1data = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
  series: [
    [400, 900, 800, 1000, 700, 1000],
    [1000, 500, 600, 400, 700, 400],
  ],
};

export const chartistecommerce1option = {
  stackBars: true,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  axisY: {
    low: 0,
    showGrid: false,
    showLabel: false,
    offset: 0,
    labelInterpolationFnc: function (value) {
      return value / 1000 + "k";
    },
  },
  height: "80px",
  width: "120px",
};

export const chartistecommerce2data = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
  series: [
    [400, 900, 800, 1000, 700, 1000],
    [1000, 500, 600, 400, 700, 400],
  ],
};

export const chartistecommerce2option = {
  stackBars: true,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  axisY: {
    low: 0,
    showGrid: false,
    showLabel: false,
    offset: 0,
    labelInterpolationFnc: function (value) {
      return value / 1000 + "k";
    },
  },
  height: "80px",
  width: "120px",

  colors: ["#ffffff"],
  fill: {
    opacity: 1,
  },
};

export const chartistecommerce3data = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
  series: [
    [400, 900, 800, 1000, 700, 1000],
    [1000, 500, 600, 400, 700, 400],
  ],
};

export const chartistecommerce3option = {
  stackBars: true,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  axisY: {
    low: 0,
    showGrid: false,
    showLabel: false,
    offset: 0,
    labelInterpolationFnc: function (value) {
      return value / 1000 + "k";
    },
  },
  height: "80px",
  width: "120px",
};

export const chartistecommerce4data = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
  series: [
    [400, 900, 800, 1000, 700, 1000],
    [1000, 500, 600, 400, 700, 400],
  ],
};

export const chartistecommerce4option = {
  stackBars: true,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  axisY: {
    low: 0,
    showGrid: false,
    showLabel: false,
    offset: 0,
    labelInterpolationFnc: function (value) {
      return value / 1000 + "k";
    },
  },
  height: "80px",
  width: "120px",

  colors: ["#ffffff"],
  fill: {
    opacity: 1,
  },
};

// export const chartistcrypto1data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   series: [
//     [1.3, 2, 1, 2.5, 1.9, 3.0],
//     [1, 0.7, 1.2, 2, 1.2, 2.3],
//   ],
// };

// export const chartistcrypto1option = {
//   fullWidth: true,
//   low: 0,
//   offset: 0,
//   showArea: false,
//   showPoint: false,
//   chartPadding: {
//     left: -22,
//     right: -25,
//     bottom: 0,
//     top: 30,
//   },
//   axisY: {
//     low: 0,
//     showGrid: false,
//     showLabel: false,
//     offset: 0,
//     scaleMinSpace: 40,
//   },
//   axisX: {
//     showGrid: false,
//     showLabel: false,
//     offset: 0,
//   },
// };
