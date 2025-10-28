import configDB from "../../../../data/customizer/config";
const primary =
  localStorage.getItem("primary_color") || configDB.data.color.primary_color;
const secondary =
  localStorage.getItem("secondary_color") ||
  configDB.data.color.secondary_color;

export const apexcharts1 = {
  options: {
    chart: {
      height: 120,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 2,
        left: 10,
        blur: 2,
        color: primary,
        opacity: 0.5,
      },
    },
    tooltip: {
      enabled: true,
      theme: true,
      fillSeriesColor: false,
      onDatasetHover: {
        highlightDataSeries: true,
      },
      style: {
        fontSize: "12px",
        background: "#eb5d22",
        color: "#fff",
      },
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      lineCap: "butt",
      width: [8],
      curve: "smooth",
    },
    colors: ["#ffffff"],
    grid: {
      show: false,
      padding: {
        top: -25,
        left: 0,
        right: 0,
        bottom: 25,
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan"],
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      crosshairs: {
        stroke: {
          color: "#ffffff",
        },
      },
    },
  },
  series: [
    {
      name: "Series 1",
      data: [50, 40, 60, 38, 52],
    },
  ],
};

export const apexcharts2 = {
  series: [
    {
      name: "Series 1",
      data: [40, 60, 40, 60, 55, 65],
    },
  ],
  options: {
    chart: {
      height: 130,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 2,
        left: 10,
        blur: 2,
        color: secondary,
        opacity: 0.5,
      },
    },
    tooltip: {
      enabled: true,
      theme: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      lineCap: "butt",
      width: [8],
      curve: "smooth",
    },
    colors: ["#ffffff"],
    grid: {
      show: false,
      padding: {
        top: -25,
        left: 0,
        right: 0,
        bottom: 25,
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan"],
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      crosshairs: {
        stroke: {
          color: "#ffffff",
        },
      },
    },
  },
};

export const apexcharts3 = {
  series: [
    {
      name: "Series 1",
      data: [70, 50, 70, 50, 60],
    },
  ],
  options: {
    chart: {
      height: 120,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 2,
        left: 10,
        blur: 2,
        color: "#fbbc30",
        opacity: 0.5,
      },
    },
    tooltip: {
      enabled: true,
      theme: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      lineCap: "butt",
      width: [8],
      curve: "smooth",
    },
    colors: ["#ffffff"],
    grid: {
      show: false,
      padding: {
        top: -25,
        left: 0,
        right: 0,
        bottom: 30,
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan"],
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      crosshairs: {
        stroke: {
          color: "#ffffff",
        },
      },
    },
  },
};

export const apexcharts4 = {
  series: [
    {
      name: "Series 1",
      data: [30, 20, 70, 40, 60, 50],
    },
  ],
  options: {
    chart: {
      height: 130,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 2,
        left: 10,
        blur: 2,
        color: "#06b5ca",
        opacity: 0.5,
      },
    },
    tooltip: {
      enabled: true,
      theme: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      lineCap: "butt",
      width: [8],
      curve: "smooth",
    },
    colors: ["#ffffff"],
    grid: {
      show: false,
      padding: {
        top: -25,
        left: 0,
        right: 0,
        bottom: 25,
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan"],
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      crosshairs: {
        stroke: {
          color: "#ffffff",
        },
      },
    },
  },
};

export const apexchartsradial = {
  series: [60, 67, 80],
  options: {
    chart: {
      height: 340,
      type: "radialBar",
      fullWidth: true,
    },
    plotOptions: {
      padding: {
        left: 0,
        right: 0,
      },
      radialBar: {
        hollow: {
          size: "40%",
        },
        track: {
          show: false,
        },
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return 75;
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.2,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    responsive: [
      {
        breakpoint: 360,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    colors: [primary, secondary, "#158df7"],
    labels: ["UK", "New York", "Chaina"],
    stroke: {
      lineCap: "round",
    },
  },
};
const series = {
  monthDataSeries1: {
    prices: [
      8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85,
      8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25,
      8600.65, 9120.5, 9340.85,
    ],
    dates: [
      "13 Nov 2022",
      "14 Nov 2022",
      "15 Nov 2022",
      "16 Nov 2022",
      "17 Nov 2022",
      "20 Nov 2022",
      "21 Nov 2022",
      "22 Nov 2022",
      "23 Nov 2022",
      "24 Nov 2022",
      "27 Nov 2022",
      "28 Nov 2022",
      "29 Nov 2022",
      "30 Nov 2022",
      "01 Dec 2022",
      "04 Dec 2022",
      "05 Dec 2022",
      "06 Dec 2022",
      "07 Dec 2022",
      "08 Dec 2022",
    ],
  },
};
export const apexcharts5 = {
  series: [
    {
      name: "STOCK ABC",
      data: [
        8121.85, 8128.0, 8122.9, 8165.5, 8340.7, 8514.3, 8423.5, 8514.3,
        8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9,
        8496.25, 8876.0, 9040.65, 9240.85,
      ],
    },
  ],
  options: {
    chart: {
      height: 230,
      type: "area",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      theme: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [8],
      curve: "straight",
    },
    fill: {
      opacity: 0.4,
      type: "solid",
      colors: [secondary],
    },

    labels: series.monthDataSeries1.dates,
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        bottom: -40,
        top: -30,
      },
    },
    xaxis: {
      type: "datetime",
      crosshairs: {
        stroke: {
          color: "#ffffff",
        },
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      horizontalAlign: "left",
    },
    colors: ["#fff"],
  },
};

export const apexcharts6 = {
  series: [
    {
      name: "STOCK ABC",
      data: [
        8121.85, 8128.0, 8520.87, 8620.5, 8750.7, 8680.3, 8640.0, 8599.45,
        8581.85, 8689.75, 8575.7, 8645.9, 8899.95, 8998.86, 9090.42, 9040.0,
        9190.85, 9040.0, 9140.65, 9240.85,
      ],
    },
  ],
  options: {
    chart: {
      height: 230,
      type: "area",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      theme: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [8],
      curve: "straight",
    },
    fill: {
      opacity: 0.4,
      type: "solid",
      colors: [primary],
    },

    labels: series.monthDataSeries1.dates,
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        bottom: -40,
        top: -30,
      },
    },
    xaxis: {
      type: "datetime",
      crosshairs: {
        stroke: {
          color: "#ffffff",
        },
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      horizontalAlign: "left",
    },
    colors: ["#fff"],
  },
};
export const bitcoinapexcharts1 = {
  series: [
    {
      name: "series1",
      data: [2.5, 2, 3.1, 3.8, 2.6, 3.1, 2.1, 2.4, 1.8, 0],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      width: 480,
      height: 250,
      type: "area",
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    xaxis: {
      show: false,
      offset: 0,
      low: 0,
      type: "datetime",
      categories: [
        "2022-09-19T00:00:00",
        "2022-09-19T01:30:00",
        "2022-09-19T02:30:00",
        "2022-09-19T03:30:00",
        "2022-09-19T04:30:00",
        "2022-09-19T05:30:00",
        "2022-09-19T06:30:00",
        "2022-09-19T07:30:00",
        "2022-09-19T08:30:00",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    fill: {
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0,
        inverseColors: false,
        opacityTo: 1,
        opacityFrom: 0.75,
        stops: [0, 100],
      },
    },
    colors: [secondary],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

export const bitcoinapexcharts2 = {
  series: [
    {
      name: "series1",
      data: [2.2, 3.2, 2.6, 2, 2.3, 3.8, 3, 2.6, 0],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      type: "area",
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    xaxis: {
      show: false,
      offset: 0,
      low: 0,
      type: "datetime",
      categories: [
        "2022-09-19T00:00:00",
        "2022-09-19T01:30:00",
        "2022-09-19T02:30:00",
        "2022-09-19T03:30:00",
        "2022-09-19T04:30:00",
        "2022-09-19T05:30:00",
        "2022-09-19T06:30:00",
        "2022-09-19T07:30:00",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      offset: 0,
      low: 0,
    },
    grid: {
      show: false,
      offset: 0,
      low: 0,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    fill: {
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityTo: 1,
        opacityFrom: 0.9,
        stops: [0, 100],
      },
    },
    colors: [primary],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

export const bitcoinapexcharts3 = {
  series: [
    {
      name: "series1",
      data: [2.5, 2, 2.6, 3.2, 3.8, 3.1, 3.2, 2.4, 1.8, 0],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 250,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    xaxis: {
      show: false,
      type: "datetime",
      categories: [
        "2022-09-19T00:00:00",
        "2022-09-19T01:30:00",
        "2022-09-19T02:30:00",
        "2022-09-19T03:30:00",
        "2022-09-19T04:30:00",
        "2022-09-19T05:30:00",
        "2022-09-19T06:30:00",
        "2022-09-19T07:30:00",
        "2022-09-19T08:30:00",
      ],
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: -40,
      },
    },
    fill: {
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0,
        inverseColors: false,
        opacityTo: 1,
        opacityFrom: 0.8,
        stops: [0, 100],
      },
    },
    colors: ["#ffc200"],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

export const candlesticapexcharts = {
  series: [
    {
      data: [
        {
          x: new Date(1538789400000),
          y: [6624.61, 6632.2, 6617, 6626.02],
        },
        {
          x: new Date(1538791200000),
          y: [6627, 6627.62, 6584.22, 6603.02],
        },
        {
          x: new Date(1538793000000),
          y: [6605, 6608.03, 6598.95, 6604.01],
        },
        {
          x: new Date(1538794800000),
          y: [6604.5, 6614.4, 6602.26, 6608.02],
        },
        {
          x: new Date(1538796600000),
          y: [6608.02, 6610.68, 6601.99, 6608.91],
        },
        {
          x: new Date(1538798400000),
          y: [6608.91, 6618.99, 6608.01, 6612],
        },
        {
          x: new Date(1538800200000),
          y: [6612, 6615.13, 6605.09, 6612],
        },
        {
          x: new Date(1538802000000),
          y: [6612, 6624.12, 6608.43, 6622.95],
        },
        {
          x: new Date(1538803800000),
          y: [6623.91, 6623.91, 6615, 6615.67],
        },
        {
          x: new Date(1538805600000),
          y: [6618.69, 6618.74, 6610, 6610.4],
        },
        {
          x: new Date(1538807400000),
          y: [6611, 6622.78, 6610.4, 6614.9],
        },
        {
          x: new Date(1538809200000),
          y: [6614.9, 6626.2, 6613.33, 6623.45],
        },
        {
          x: new Date(1538811000000),
          y: [6623.48, 6627, 6618.38, 6620.35],
        },
        {
          x: new Date(1538812800000),
          y: [6615, 6627.4, 6584.1, 6603.0],
        },
        {
          x: new Date(1538814600000),
          y: [6615.53, 6617.93, 6610, 6615.19],
        },
        {
          x: new Date(1538816400000),
          y: [6615.19, 6621.6, 6608.2, 6620],
        },
        {
          x: new Date(1538818200000),
          y: [6619.54, 6625.17, 6614.15, 6620],
        },
        {
          x: new Date(1538820000000),
          y: [6620.33, 6634.15, 6617.24, 6624.61],
        },
        {
          x: new Date(1538821800000),
          y: [6625.95, 6626, 6611.66, 6617.58],
        },
      ],
    },
  ],
  options: {
    labels: ["J", "F", "M", "A", "M", "J"],
    chart: {
      type: "candlestick",
      toolbar: {
        show: false,
      },

      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        blur: 8,
        opacity: 0.08,
        color: "#168df7",
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: primary,
          downward: secondary,
        },
      },
    },
    xaxis: {
      type: "datetime",
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: true,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.2,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      type: "datetime",
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  },
};

export const apexchartsareaspaline = {
  series: [
    {
      name: "",
      data: [50, 45, 55, 50, 60, 56, 58, 50, 65, 60, 50, 60, 52, 55, 52],
    },
  ],
  options: {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      padding: {
        right: 0,
      },
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },

    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      type: "datetime",
      labels: {
        low: 0,
        offsetX: 0,
        show: true,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        "2022-09-19T00:00:00",
        "2022-09-19T01:30:00",
        "2022-09-19T02:30:00",
        "2022-09-19T03:30:00",
        "2022-09-19T04:30:00",
        "2022-09-19T05:30:00",
        "2022-09-19T06:30:00",
        "2022-09-19T07:30:00",
        "2022-09-19T08:30:00",
        "2022-09-19T09:30:00",
        "2022-09-19T10:30:00",
        "2022-09-19T11:30:00",
        "2022-09-19T12:30:00",
        "2022-09-19T13:30:00",
        "2022-09-19T14:30:00",
      ],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    colors: [secondary],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 1.0,
        stops: [0, 85, 100],
      },
    },
  },
};

export const apexecommerce1 = {
  series: [
    {
      data: [400, 900, 800, 1000, 700, 1000],
    },
    {
      data: [1000, 500, 600, 400, 700, 400],
    },
  ],
  options: {
    chart: {
      type: "bar",
      stacked: true,
      height: 80,
      width: "120",
      toolbar: {
        show: false,
      },
    },
    colors: ["#FFFFFF", "#bfabdf"],
    stroke: {
      colors: ["transparent"],
      width: 5,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "90%",
        horizontal: false,
        borderRadius: 1,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

export const apexecommerce2 = {
  series: [
    {
      data: [400, 900, 800, 1000, 700, 1000],
    },
    {
      data: [1000, 500, 600, 400, 700, 400],
    },
  ],
  options: {
    chart: {
      type: "bar",
      stacked: true,
      height: 80,
      width: "120",
      toolbar: {
        show: false,
      },
    },
    colors: ["#FFFFFF", "#ff7aae"],
    stroke: {
      colors: ["transparent"],
      width: 5,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "90%",
        horizontal: false,
        borderRadius: 1,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

export const apexecommerce3 = {
  series: [
    {
      data: [400, 900, 800, 1000, 700, 1000],
    },
    {
      data: [1000, 500, 600, 400, 700, 400],
    },
  ],
  options: {
    chart: {
      type: "bar",
      stacked: true,
      height: 80,
      width: "120",
      toolbar: {
        show: false,
      },
    },
    colors: ["#FFFFFF", "#f3e0b2"],
    stroke: {
      colors: ["transparent"],
      width: 5,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "90%",
        horizontal: false,
        borderRadius: 1,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

export const apexecommerce4 = {
  series: [
    {
      data: [400, 900, 800, 1000, 700, 1000],
    },
    {
      data: [1000, 500, 600, 400, 700, 400],
    },
  ],
  options: {
    chart: {
      type: "bar",
      stacked: true,
      height: 80,
      width: "120",
      toolbar: {
        show: false,
      },
    },
    colors: ["#FFFFFF", "#B3E6F8"],
    stroke: {
      colors: ["transparent"],
      width: 5,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "90%",
        horizontal: false,
        borderRadius: 1,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

export const apexchartsecommerceradial = {
  series: [6 * 12],
  options: {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 20,
          size: "50%",
        },
        track: {
          show: true,
          background: "#ffffff",
          opacity: 0.4,
        },
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: "#ffffff",
            offsetY: 10,
          },
          value: {
            offsetY: -40,
            fontSize: "22px",
            color: "#ffffff",
            formatter: function (val) {
              return val + "/100";
            },
          },
        },
      },
    },

    fill: {
      colors: ["#ffffff"],
      opacity: 1,
    },

    stroke: {
      dashArray: 5,
    },
    labels: ["Customer Ratio"],
    responsive: [
      {
        breakpoint: 1700,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
  },
};

export const apexchartswidgets1 = {
  series: [
    {
      name: "series1",
      data: [1.2, 2.3, 1.7, 3.2, 1.8, 3.2, 1],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 170,
      type: "line",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [4],
    },
    xaxis: {
      show: false,
      type: "datetime",
      categories: [
        "2022-09-19T00:00:00",
        "2022-09-19T01:30:00",
        "2022-09-19T02:30:00",
        "2022-09-19T03:30:00",
        "2022-09-19T04:30:00",
        "2022-09-19T05:30:00",
        "2022-09-19T06:30:00",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
      padding: {
        left: 15,
        right: 15,
        top: -15,
        bottom: 20,
      },
    },
    colors: ["#ffffff"],

    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

export const chartistcrypto1 = {
  series: [
    {
      name: "series1",
      data: [1.3, 2, 1, 2.5, 1.9, 3.0],
    },
    {
      name: "series1",
      data: [1, 0.7, 1.2, 2, 1.2, 2.3],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FFFFFF"],
    stroke: {
      width: [2, 3, 1],
      curve: "smooth",
      dashArray: [0, 8, 5],
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

export const apexchartswidgets2 = {
  series: [
    {
      name: "series1",
      data: [1.2, 2.3, 1.7, 3.2, 1.8, 3.2, 1],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 170,
      type: "line",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [4],
    },
    xaxis: {
      show: false,
      type: "datetime",
      categories: [
        "2022-09-19T00:00:00",
        "2022-09-19T01:30:00",
        "2022-09-19T02:30:00",
        "2022-09-19T03:30:00",
        "2022-09-19T04:30:00",
        "2022-09-19T05:30:00",
        "2022-09-19T06:30:00",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
      padding: {
        left: 15,
        right: 15,
        top: -15,
        bottom: 20,
      },
    },
    colors: ["#ffffff"],

    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

export const apexchartswidgets3 = {
  series: [
    {
      name: "series1",
      data: [1.2, 2.3, 1.7, 3.2, 1.8, 3.2, 1],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 170,
      type: "line",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [3],
    },
    xaxis: {
      show: false,
      type: "datetime",
      categories: [
        "2022-09-19T00:00:00",
        "2022-09-19T01:30:00",
        "2022-09-19T02:30:00",
        "2022-09-19T03:30:00",
        "2022-09-19T04:30:00",
        "2022-09-19T05:30:00",
        "2022-09-19T06:30:00",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
      padding: {
        left: 15,
        right: 15,
        top: -15,
        bottom: 20,
      },
    },
    colors: ["#ffffff"],

    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};
function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y,
    });
    i++;
  }
  return series;
}
export const apexchartswidgets4 = {
  series: [
    {
      name: "Jan",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "Feb",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "Mar",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "Apr",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "May",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "Jun",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "Jul",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "Aug",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: "Sep",
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 350,
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,

        colorScale: {
          ranges: [
            {
              from: -30,
              to: 5,
              name: "low",
              color: "#06b5dd",
            },
            {
              from: 6,
              to: 20,
              name: "medium",
              color: secondary,
            },
            {
              from: 21,
              to: 45,
              name: "high",
              color: primary,
            },
            {
              from: 46,
              to: 55,
              name: "extreme",
              color: "#ffc717",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    legend: {
      markers: {
        offsetY: 0,
      },
    },
    title: {
      text: "HeatMap Chart with Color Range",
      fontWeight: "500",
      offsetX: 20,
      offsetY: 15,
    },
  },
};

export const apexchartswidgets5 = {
  series: [44, 55, 13],
  options: {
    chart: {
      width: 350,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },

    responsive: [
      {
        breakpoint: 360,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },
    colors: [primary, secondary, "#ffc717"],
  },
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
const colors = [
  "#eb5d22",
  "#fe80b2",
  "#80cf00",
  "#06b5dd",
  "#ffc717",
  "#fd517d",
  "#158df7",
];
const arrayData = [
  {
    y: 400,
    quarters: [
      {
        x: "Q1",
        y: 120,
      },
      {
        x: "Q2",
        y: 90,
      },
      {
        x: "Q3",
        y: 100,
      },
      {
        x: "Q4",
        y: 90,
      },
    ],
  },
  {
    y: 430,
    quarters: [
      {
        x: "Q1",
        y: 120,
      },
      {
        x: "Q2",
        y: 110,
      },
      {
        x: "Q3",
        y: 90,
      },
      {
        x: "Q4",
        y: 110,
      },
    ],
  },
  {
    y: 448,
    quarters: [
      {
        x: "Q1",
        y: 70,
      },
      {
        x: "Q2",
        y: 100,
      },
      {
        x: "Q3",
        y: 140,
      },
      {
        x: "Q4",
        y: 138,
      },
    ],
  },
  {
    y: 470,
    quarters: [
      {
        x: "Q1",
        y: 150,
      },
      {
        x: "Q2",
        y: 60,
      },
      {
        x: "Q3",
        y: 190,
      },
      {
        x: "Q4",
        y: 70,
      },
    ],
  },
  {
    y: 540,
    quarters: [
      {
        x: "Q1",
        y: 120,
      },
      {
        x: "Q2",
        y: 120,
      },
      {
        x: "Q3",
        y: 130,
      },
      {
        x: "Q4",
        y: 170,
      },
    ],
  },
  {
    y: 580,
    quarters: [
      {
        x: "Q1",
        y: 170,
      },
      {
        x: "Q2",
        y: 130,
      },
      {
        x: "Q3",
        y: 120,
      },
      {
        x: "Q4",
        y: 160,
      },
    ],
  },
];
function makeData() {
  const dataSet = shuffleArray(arrayData);
  const dataYearSeries = [
    {
      x: "2017",
      y: dataSet[0].y,
      color: colors[0],
      quarters: dataSet[0].quarters,
    },
    {
      x: "2018",
      y: dataSet[1].y,
      color: colors[1],
      quarters: dataSet[1].quarters,
    },
    {
      x: "2019",
      y: dataSet[2].y,
      color: colors[2],
      quarters: dataSet[2].quarters,
    },
    {
      x: "2020",
      y: dataSet[3].y,
      color: colors[3],
      quarters: dataSet[3].quarters,
    },
    {
      x: "2021",
      y: dataSet[4].y,
      color: colors[4],
      quarters: dataSet[4].quarters,
    },
    {
      x: "2022",
      y: dataSet[5].y,
      color: colors[5],
      quarters: dataSet[5].quarters,
    },
  ];

  return dataYearSeries;
}

export const apexchartswidgets6 = {
  series: [
    {
      data: makeData(),
    },
  ],
  options: {
    chart: {
      id: "barYear",
      height: 450,
      width: "100%",
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        barHeight: "20%",
        dataLabels: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },

    tooltip: {
      x: {
        show: false,
      },
    },
    title: {
      text: "Yearly Results",
      offsetX: 15,
      offsetY: 15,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
    },
  },
};

export const apexchartswidgets7 = {
  series: [
    {
      name: "High - 2013",
      data: [20, 25, 20, 36, 32],
    },
  ],
  options: {
    chart: {
      height: 180,
      type: "line",
      shadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [primary],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },

    grid: {
      show: false,
      padding: {
        top: -15,
        bottom: -25,
      },
    },
    markers: {
      size: 5,
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
    },

    yaxis: {
      min: 5,
      max: 40,
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
  },
};
export const apexchartswidgets8 = {
  series: [
    {
      name: "High - 2013",
      data: [30, 20, 40, 28, 36],
    },
  ],
  options: {
    chart: {
      height: 180,
      type: "line",
      shadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [secondary],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },

    grid: {
      show: false,
      padding: {
        top: -15,
        bottom: -25,
      },
    },
    markers: {
      size: 5,
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
    },

    yaxis: {
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
      min: 5,
      max: 40,
    },
  },
};

export const apexchartswidgets9 = {
  series: [
    {
      name: "Music",
      data: [1, 15, 26, 20, 33, 27],
    },
    {
      name: "Photos",
      data: [3, 33, 21, 42, 19, 32],
    },
    {
      name: "Files",
      data: [0, 39, 52, 11, 29, 43],
    },
  ],
  options: {
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },

    xaxis: {
      axisBorder: {
        show: true,
        color: "#cccccc",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 0,
      },
    },

    chart: {
      height: 360,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: [primary, secondary, "#ffc717"],

    subtitle: {
      text: "Statistics",
      offsetY: 55,
      offsetX: 20,
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },
    labels: [
      "01/15/2022",
      "01/16/2022",
      "01/17/2022",
      "01/18/2022",
      "01/19/2022",
      "01/20/2022",
    ],
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -20,
    },
  },
};

export const apexchartswidgets10 = {
  series: [71, 63, 77],
  options: {
    chart: {
      type: "radialBar",
      width: 490,
      height: 360,
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: true,
        hollow: {
          margin: 5,
          size: "48%",
          background: "transparent",
        },
        track: {
          show: false,
        },
        startAngle: -180,
        endAngle: 180,
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: [primary, secondary, "#ffc717"],

    labels: ["June", "May", "April"],
    legend: {
      show: true,
      floating: true,
      position: "bottom",
      horizontalAlign: "right",
    },
  },
};
