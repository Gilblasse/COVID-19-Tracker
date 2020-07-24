import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { historicalURL } from "../../constants/APIS";
import numeral from "numeral";

function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    getHistoricalData();
  }, []);

  const getHistoricalData = async () => {
    const res = await fetch(historicalURL);
    const historicalData = await res.json();
    console.log(numeral(10000.23).format("+0,0"));
    setData(historicalData);
  };

  const buildChartData = () => {};

  console.log("Data: ", data);
  return (
    <div>
      <Line />
    </div>
  );
}

export default LineGraph;
