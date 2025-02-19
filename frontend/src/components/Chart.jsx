import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
export const Chart = (props) => {
  const options = {
    chart: { type: "column" },
    title: {
      text: "Assets",
      style: {
        color: "#544fc5",
        fontWeight: "bold",
      },
    },
    xAxis: { categories: props.advisors.map((adv) => adv.name) },
    yAxis: { title: { text: "Total Assets ($)" } },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Advisors",
        data: props.advisors.map((adv) => adv.total_assets),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
