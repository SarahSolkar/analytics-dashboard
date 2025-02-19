import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
export const PieChart = (props) => {
  const options = {
    chart: { type: "pie" },
    title: { text: "Advisor Market Share" },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Total Assets",
        data: props.advisors.map((adv) => ({
          name: adv.name,
          y: adv.total_assets,
        })),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
