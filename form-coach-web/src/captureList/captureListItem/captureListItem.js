import React, { Component } from "react";
import "./captureListItem.css";

class CaptureListItem extends Component {
  render() {
    return <div className="captureListItem">{this.props.capture.sport}</div>;
  }
}

export default CaptureListItem;
