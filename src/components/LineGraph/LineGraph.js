import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { historicalURL } from "../../constants/APIS";
import numeral from "numeral";

export default function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    getHistoricalData();
  }, []);

  const getHistoricalData = async () => {
    const res = await fetch(historicalURL);
    const historicalData = await res.json();
    const chartData = buildChartData(historicalData);

    setData(chartData);
  };

  const buildChartData = (data, caseType = "cases") => {
    let chartData = [];
    let prevDateValue;

    Object.entries(data[caseType]).forEach(([date, value]) => {
      prevDateValue && chartData.push({ x: date, y: value - prevDateValue });
      prevDateValue = value;
    });

    return chartData;
  };

  return (
    <div>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
