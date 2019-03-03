import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import NavLinkItem from "./navLink/navLink";

import Dashboard from "./dashboard/dashboard";
import CaptureList from "./captureList/captureList";
import DisplayCapture from "./displayCapture/displayCapture";

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
            <span className="logo-name">Bluetrace</span>
          </div>
          <div className="logo-section-spacer" />
        </div>
        <div className="content">
          <div className="nav-list">
            <NavLinkItem link="/" linkName="Dashboard" />
            <h2>Recent Captures</h2>
            <CaptureList />
          </div>
          <div className="capture-display">
            <Route path="/" exact component={Dashboard} />
            <Route path="/capture/:cid" component={DisplayCapture} />
          </div>
        </div>
        <div className="footer">
          <hr />
          &copy; 2019 Bluetrace
        </div>
      </div>
    );
  }
}

export default App;
