import React from "react";
import { Chart } from "react-google-charts";
import configDB from "../../../data/customizer/config";
const primary =
  localStorage.getItem("primary_color") || configDB.data.color.primary_color;
const secondary =
  localStorage.getItem("secondary_color") ||
  configDB.data.color.secondary_color;

export const GooglePieChart1 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Task", "Hours per Day"],
        ["Work", 6.7],
        ["Eat", 13.3],
        ["Commute", 20],
        ["Watch TV", 26.7],
        ["Sleep", 33.3],
      ]}
      options={{
        title: "My Daily Activities",
        colors: ["#06b5dd", primary, secondary, "#80cf00", "#fd517d"],
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export const GooglePieChart2 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Task", "Hours per Day"],
        ["Work", 6.7],
        ["Eat", 13.3],
        ["Commute", 20],
        ["Watch TV", 26.7],
        ["Sleep", 33.3],
      ]}
      options={{
        title: "My Daily Activities",
        colors: ["#06b5dd", primary, secondary, "#80cf00", "#fd517d"],
        is3D: true,
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
};

export const GooglePieChart3 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Task", "Hours per Day"],
        ["Work", 2],
        ["Eat", 2],
        ["Commute", 11],
        ["Watch TV", 2],
        ["Sleep", 7],
      ]}
      options={{
        title: "My Daily Activities",
        pieHole: 0.4,
        colors: ["#06b5dd", primary, secondary, "#80cf00", "#fd517d"],
      }}
    />
  );
};

export const GooglePieChart4 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Language", "Speakers (in millions)"],
        ["Assamese", 13],
        ["Bengali", 83],
        ["Bodo", 1.4],
        ["Dogri", 2.3],
        ["Gujarati", 46],
        ["Hindi", 300],
        ["Kannada", 38],
        ["Kashmiri", 5.5],
        ["Konkani", 5],
        ["Maithili", 20],
        ["Malayalam", 33],
        ["Manipuri", 1.5],
        ["Marathi", 72],
        ["Nepali", 2.9],
        ["Oriya", 33],
        ["Punjabi", 29],
        ["Sanskrit", 0.01],
        ["Santhali", 6.5],
        ["Sindhi", 2.5],
        ["Tamil", 61],
        ["Telugu", 74],
        ["Urdu", 52],
      ]}
      options={{
        title: "Indian Language Use",
        legend: "none",
        pieSliceText: "label",
        colors: [
          "#06b5dd",
          primary,
          "#000000",
          "#06b5dd",
          secondary,
          "#fd517d",
          "#80cf00",
          "#158df7",
          "#06b5dd",
          secondary,
          primary,
          "#fd517d",
          "#fd517d",
          secondary,
          "#80cf00",
          "#06b5dd",
          "#000000",
          "#ffc717",
          "#000000",
          secondary,
          primary,
          "#fd517d",
        ],
        slices: {
          4: { offset: 0.2 },
          12: { offset: 0.3 },
          14: { offset: 0.4 },
          15: { offset: 0.5 },
        },
      }}
      rootProps={{ "data-testid": "5" }}
    />
  );
};

export const GoogleAreaChart1 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Year", "Sales", "Expenses"],
        ["2019", 1000, 400],
        ["2020", 1170, 460],
        ["2021", 660, 1120],
        ["2022", 1030, 540],
      ]}
      options={{
        title: "Company Performance",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        width: "100%",
        height: 400,
        colors: [primary, secondary],
      }}
    />
  );
};
export const GoogleAreaChart2 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Year", "Cars", "Trucks", "Drones", "Segways"],
        ["2019", 100, 400, 2000, 400],
        ["2020", 500, 700, 530, 800],
        ["2021", 2000, 1000, 620, 120],
        ["2022", 120, 201, 2501, 540],
      ]}
      options={{
        title: "Company Performance",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        width: "100%",
        height: 400,
        colors: [primary, secondary, "#fd517d", "#158df7"],
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
};

export const GoogleGhantChart = () => {
  return (
    <Chart
      width={"100%"}
      height={"300px"}
      chartType="Gantt"
      loader={<div>Loading Chart</div>}
      data={[
        [
          { type: "string", label: "Task ID" },
          { type: "string", label: "Task Name" },
          { type: "date", label: "Start Date" },
          { type: "date", label: "End Date" },
          { type: "number", label: "Duration" },
          { type: "number", label: "Percent Complete" },
          { type: "string", label: "Dependencies" },
        ],
        [
          "Research",
          "Find sources",
          new Date(2022, 0, 1),
          new Date(2022, 0, 5),
          null,
          100,
          null,
        ],
        [
          "Write",
          "Write paper",
          null,
          new Date(2022, 0, 9),
          3 * 24 * 60 * 60 * 1000,
          25,
          "Research,Outline",
        ],
        [
          "Cite",
          "Create bibliography",
          null,
          new Date(2022, 0, 7),
          1 * 24 * 60 * 60 * 1000,
          20,
          "Research",
        ],
        [
          "Complete",
          "Hand in paper",
          null,
          new Date(2022, 0, 10),
          1 * 24 * 60 * 60 * 1000,
          0,
          "Cite,Write",
        ],
        [
          "Outline",
          "Outline paper",
          null,
          new Date(2022, 0, 6),
          1 * 24 * 60 * 60 * 1000,
          100,
          "Research",
        ],
      ]}
      options={{
        gantt: {
          criticalPathEnabled: false, // Critical path arrows will be the same as other arrows.
          arrow: {
            angle: 100,
            width: 5,
            color: "#eb5d22",
            radius: 0,
          },

          palette: [
            {
              color: secondary,
              dark: primary,
              light: primary,
            },
          ],
        },
        backgroundColor: "transparent",
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export const GoogleLineChart = () => {
  return (
    <Chart
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          "month",
          "Guardians of the Galaxy",
          "The Avengers",
          "Transformers: Age of Extinction",
        ],
        [1, 37.8, 80.8, 41.8],
        [2, 30.9, 10.5, 32.4],
        [3, 40.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 20, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 9.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
      ]}
      options={{
        chart: {
          title: "Box Office Earnings in First Two Weeks of Opening",
          subtitle: "in millions of dollars (USD)",
        },
        colors: [primary, secondary, "#80cf00"],
        height: 350,
        width: "100%",
        backgroundColor: "transparent",
        chartArea: {
          left: 0,
          top: 0,
          bottom: 0,
        },
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
};

export const GoogleColumnChart1 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={[
        ["Year", "Sales", "Expenses  .", "Profit"],
        ["2019", 1e3, 400, 250],
        ["2020", 1170, 460, 300],
        ["2021", 660, 1120, 400],
        ["2022", 1030, 540, 450],
      ]}
      options={{
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2020-2022",
        },
        bars: "vertical",
        vAxis: {
          format: "decimal",
        },
        height: 400,
        width: "100%",
        colors: [primary, secondary, "#80cf00"],
        backgroundColor: "transparent",
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
};
export const GoogleColumnChart2 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={[
        ["Year", "Sales", "Expenses  .", "Profit"],
        ["2019", 1e3, 400, 250],
        ["2020", 1170, 460, 300],
        ["2021", 660, 1120, 400],
        ["2022", 1030, 540, 450],
      ]}
      options={{
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2020-2022",
        },
        bars: "horizontal",
        vAxis: {
          format: "decimal",
        },
        height: 400,
        width: "100%",
        backgroundColor: "transparent",
        colors: [primary, secondary, "#80cf00"],
      }}
    />
  );
};

export const GoogleComboChart = () => {
  return (
    <Chart
      width={"100%"}
      height={"500px"}
      chartType="ComboChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          "Month",
          "Bolivia",
          "Ecuador",
          "Madagascar",
          "Papua New Guinea",
          "Rwanda",
          "Average",
        ],
        ["2018/05", 165, 938, 522, 998, 450, 614.6],
        ["2019/06", 135, 1120, 599, 1268, 288, 682],
        ["2020/07", 157, 1167, 587, 807, 397, 623],
        ["2021/08", 139, 1110, 615, 968, 215, 609.4],
        ["2022/09", 136, 691, 629, 1026, 366, 569.6],
      ]}
      options={{
        title: "Monthly Coffee Production by Country",
        vAxis: { title: "Cups" },
        hAxis: { title: "Month" },
        seriesType: "bars",
        series: { 5: { type: "line" } },
        height: 500,
        backgroundColor: "transparent",
        width: "100%",
        colors: ["#06b5dd", primary, secondary, "#80cf00", "#fd517d"],
      }}
    />
  );
};

export const GoogleBarChart2 = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          "Element",
          "Density",
          { role: "style" },
          {
            sourceColumn: 1,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        ["Copper", 10, primary, 10],
        ["Silver", 12, secondary, 12],
        ["Gold", 14, "#80cf00", 14],
        ["Platinum", 16, "color: #fd517d", 16],
      ]}
      options={{
        title: "Density of Precious Metals, in g/cm^3",
        height: 400,
        bar: { groupWidth: "95%" },
        backgroundColor: "transparent",
        legend: { position: "none" },
      }}
    />
  );
};

export const GoogleTreeChart = () => {
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="WordTree"
      loader={<div>Loading Chart</div>}
      data={[
        ["Phrases"],
        ["cats are better than dogs"],
        ["cats eat kibble"],
        ["cats are better than hamsters"],
        ["cats are awesome"],
        ["cats are people too"],
        ["cats eat mice"],
        ["cats meowing"],
        ["cats in the cradle"],
        ["cats eat mice"],
        ["cats in the cradle lyrics"],
        ["cats eat kibble"],
        ["cats for adoption"],
        ["cats are family"],
        ["cats eat mice"],
        ["cats are better than kittens"],
        ["cats are evil"],
        ["cats are weird"],
        ["cats eat mice"],
      ]}
      options={{
        wordtree: {
          format: "implicit",
          word: "cats",
          backgroundColor: "transparent",
        },
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};
