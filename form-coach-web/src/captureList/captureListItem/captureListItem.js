import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./captureListItem.css";
import * as moment from "moment";

import IosBaseball from "react-ionicons/lib/IosBaseball";
import IosDisc from "react-ionicons/lib/IosDisc";
import IosBasketball from "react-ionicons/lib/IosBasketball";
import IosFootball from "react-ionicons/lib/IosFootball";
import IosFlag from "react-ionicons/lib/IosFlag";
import IosWater from "react-ionicons/lib/IosWater";
import IosArrowForward from "react-ionicons/lib/IosArrowForward";

class CaptureListItem extends Component {
  chooseIcon = () => {
    switch (this.props.capture.sport.toLowerCase()) {
      case "baseball":
        return <IosBaseball color="#347eff" />;

      case "disc golf":
        return <IosDisc color="#347eff" />;

      case "basketball":
        return <IosBasketball color="#347eff" />;

      case "soccer":
        return <IosFootball color="#347eff" />;

      case "golf swing":
        return <IosFlag color="#347eff" />;

      case "freestyle swim":
        return <IosWater color="#347eff" />;

      default:
        return null;
    }
  };

  formattedSport = () => {
    var sport = this.props.capture.sport;
    var output = [];

    sport
      .split(" ")
      .forEach(
        (word, i) => (output[i] = word.charAt(0).toUpperCase() + word.slice(1))
      );

    return output.join(" ");
  };

  render() {
    return (
      <NavLink
        className="capture-list-item-link"
        to={"/capture/" + this.props.capture.id}
      >
        <div className="capture-list-item">
          <div className="capture-list-item-sport-info">
            {this.chooseIcon()}
            &nbsp;&nbsp;
            {this.formattedSport()}
            &nbsp;&nbsp;
            <span className="capture-datetime">
              {moment
                .unix(this.props.capture.date._seconds)
                .format("MM/DD/YYYY hh:mm a")}
            </span>
          </div>

          <IosArrowForward style={{ alignSelf: "right" }} />
        </div>
      </NavLink>
    );
  }
}

export default CaptureListItem;
