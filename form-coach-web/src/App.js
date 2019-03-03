import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./App.css";

import CaptureList from "./captureList/captureList";
import Display from "./display/display";

import FormCoachLogo from "./logo.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logo">
          <div className="logo-section">
            <img
              src={FormCoachLogo}
              draggable="false"
              className="logo-image"
              alt="Logo"
            />
            <span className="logo-name">BlueTrace</span>
          </div>
          <div className="logo-section-spacer" />
        </div>
        <div className="content">
          <div className="capture-list">
            <h2>Captures</h2>
            <CaptureList />
          </div>
          <div className="capture-display">
            <h2>Dashboard</h2>
            <Display />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
