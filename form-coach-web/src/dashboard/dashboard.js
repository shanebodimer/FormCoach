import React, { Component } from "react";
import "./dashboard.css";

import { LineChart, Line, XAxis, YAxis, ReferenceLine } from "recharts";

class Dashboard extends Component {
  render() {
    const data = [
      {
        name: "Mon",
        improvement: 1
      },
      {
        name: "Tue",
        improvement: 6
      },
      {
        name: "Wed",
        improvement: 7
      },
      {
        name: "Thur",
        improvement: 9
      },
      {
        name: "Fri",
        improvement: 10
      }
    ];

    return (
      <div className="dashboard">
        <div className="row">
          <div className="column">
            <h2>Improvement Tracker</h2>
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis tick={false} />
              <ReferenceLine
                y={8.5}
                label="Goal"
                stroke="orange"
                strokeDasharray="5 3"
              />
              <Line
                type="monotone"
                dataKey="improvement"
                stroke="#60D2FC"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </div>
          <div className="column">
            <h2>Test</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
