import React, { Component } from "react";
import cx from "classnames";

import "./HamburgerMenu.scss";

class HamburgerMenu extends Component {

  render() {

    return (
      <button
        onClick={this.props.toggleMobileNav}
        className={cx(
          "HamburgerMenu pointer absolute md:none block b0 my0 p0", {
            "HamburgerMenu__open": this.props.isMobileNavOpen
          })}
        >
        <div
          className={cx("HamburgerMenu__menu", {
            animate: this.props.isMobileNavOpen
          })}
        ></div>
      </button>
    );
  }
}

export default HamburgerMenu;
