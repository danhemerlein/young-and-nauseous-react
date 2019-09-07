import React, { Component } from "react";

import "./Marquee.scss";

class Marquee extends Component {
  render() {
    return (
      <div className="Marquee">
        <div className="Marquee__inner aesthetic-light-blue-bg-color">
          <span className="Marquee__span">
            Young & Nauseous is a lifestyle and apparel brand based in Brooklyn,
            New York
          </span>
          <span className="Marquee__span">
            Young & Nauseous is a lifestyle and apparel brand based in Brooklyn,
            New York
          </span>
        </div>
      </div>
    );
  }
}

export default Marquee;
