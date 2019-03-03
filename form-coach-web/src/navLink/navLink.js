import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./navLink.css";

class NavLinkItem extends Component {
  render() {
    return (
      <NavLink className="nav-link" to={this.props.link}>
        <div className="nav-link-text">{this.props.linkName}</div>
      </NavLink>
    );
  }
}

export default NavLinkItem;
