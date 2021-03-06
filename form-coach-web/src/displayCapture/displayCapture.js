import React, { Component } from "react";
import { computed, decorate } from "mobx";
import { inject, observer } from "mobx-react";
import "./displayCapture.css";
import varianceCalc from "../wavecomparison";

import { LineChart, Line, XAxis, YAxis } from "recharts";

import IosBaseball from "react-ionicons/lib/IosBaseball";
import IosDisc from "react-ionicons/lib/IosDisc";
import IosBasketball from "react-ionicons/lib/IosBasketball";
import IosFootball from "react-ionicons/lib/IosFootball";
import IosFlag from "react-ionicons/lib/IosFlag";
import IosWater from "react-ionicons/lib/IosWater";

var DisplayCapture = inject("CaptureStore")(
  observer(
    class DisplayCapture extends Component {
      constructor(props) {
        super(props);

        this.props.CaptureStore.loadCapture("1oabhNVI50BiTrGrom6g");

        this.comp_capture = this.props.CaptureStore.captures.get(
          "1oabhNVI50BiTrGrom6g"
        );

        // this.props.CaptureStore.loadCapture(this.props.match.params.cid).then
      }

      capture = () =>
        this.props.CaptureStore.captures.get(this.props.match.params.cid);

      loadCapture = () => {
        if (!this.capture().loaded) {
          this.props.CaptureStore.loadCapture(this.capture().id);
        }
      };

      chooseIcon = () => {
        switch (this.capture().sport.toLowerCase()) {
          case "baseball":
            return (
              <IosBaseball className="loading-icon" color="#347eff" rotate />
            );

          case "disc golf":
            return <IosDisc className="loading-icon" color="#347eff" rotate />;

          case "basketball":
            return (
              <IosBasketball className="loading-icon" color="#347eff" rotate />
            );

          case "soccer":
            return (
              <IosFootball className="loading-icon" color="#347eff" rotate />
            );

          case "golf swing":
            return <IosFlag className="loading-icon" color="#347eff" rotate />;

          case "freestyle swim":
            return <IosWater className="loading-icon" color="#347eff" rotate />;

          default:
            return null;
        }
      };

      render() {
        this.loadCapture();

        return this.capture().loaded && this.comp_capture.loaded ? (
          <div className="display-capture">
            {Object.keys(this.capture().actions).length > 0
              ? [...Object.values(this.capture().actions)].map((value, i) => (
                  <div key={i}>
                    <span>
                      {varianceCalc(
                        value.action_data,
                        [...Object.values(this.comp_capture.actions)][0]
                          .action_data,
                        25
                      ).join(", ")}
                    </span>
                    <LineChart
                      width={500}
                      height={300}
                      data={value.action_data}
                    >
                      <XAxis tick={false} />
                      <YAxis tick={false} />
                      <Line
                        type="monotone"
                        dataKey="aMag"
                        stroke="#002c6e"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="gMag"
                        stroke="green"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </div>
                ))
              : "No Actions Recorded"}
          </div>
        ) : (
          <div className="display-capture loading">{this.chooseIcon()}</div>
        );
      }
    }
  )
);

decorate(DisplayCapture, {
  capture: computed
});

export default DisplayCapture;
