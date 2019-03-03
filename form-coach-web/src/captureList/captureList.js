import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./captureList.css";

import CaptureListItem from "./captureListItem/captureListItem";

var CaptureList = inject("CaptureStore")(
  observer(
    class CaptureList extends Component {
      render() {
        return (
          <div className="capture-list">
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
