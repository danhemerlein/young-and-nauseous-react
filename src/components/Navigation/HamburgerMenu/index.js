import React, { Component } from "react";
import cx from "classnames";


import "./HamburgerMenu.scss";

class HamburgerMenu extends Component {

  componentDidMount () {
      console.log(this.props)

  }

  render() {


    return (
      <button
        onClick={this.props.toggleMobileNav}
        className={cx("HamburgerMenu pointer absolute md:none block r0 b0 t0")}>
        <div
          className={cx(
            "HamburgerMenu__menu",
            {
              animate: this.props.isMobileNavOpen
            }
          )}
        ></div>
      </button>
    );
  }
}

export default HamburgerMenu;
