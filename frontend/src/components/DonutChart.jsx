import React from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const DonutChart = (props) => {
  const options = {
    chart: { type: "pie" },
    title: {
      text: "Advisor Market Share",

      style: {
        color: "#544fc5",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      pie: {
        innerSize: "80%",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Asset Value",
        data: props.advisors.map((adv) => ({
          name: adv.name,
          y: adv.total_assets,
        })),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
