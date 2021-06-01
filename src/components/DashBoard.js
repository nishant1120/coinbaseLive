import React from "react";
import { Line } from "react-chartjs-2";
import "../App.css";

const Dashboard = ({ price, data }) => {
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    devicePixelRatio: 1,
    alignToPixels: true,
    plugins:{legend:{labels:{font:{
      size:16,
      color:"#ffffff"
    }}}},
    scales: {
      xAxes: [{ 
          gridLines: {
              display: false,
          },
          ticks: {
            fontColor: "white", // this here
          },
      }],
      yAxes: [{
          display: false,
          gridLines: {
              display: false,
          },
      }],
  }
  
  };
  // if (price === "0.00") {
  //   return <div className="error">Please select a currency pair or time duration</div>;
  // }
  return (
    <div className="dashboard">
      <div className="price">{`$${price} `}</div>

      <div className="chart-container">
        <Line data={data} options={opts} />
      </div>
    </div>
  );
};

export default Dashboard;
