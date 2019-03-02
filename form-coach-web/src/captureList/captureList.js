import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./captureList.css";

import CaptureListItem from "./captureListItem/captureListItem";

var CaptureList = inject("CaptureStore")(
  observer(
    class CaptureList extends Component {
      render() {
        console.log(this.props.CaptureStore.captures);
        return (
          <div className="captureList">
            {this.props.CaptureStore.asList.map((value, i) => {
              return <CaptureListItem key={i} capture={value} />;
            })}
          </div>
        );
      }
    }
  )
);

export default CaptureList;
