import React, { Component } from "react";

import "./AboutPage.scss";

class AboutPage extends Component {
  render() {
    return (
      <div className="AboutPage flex flex-col items-center bg-pink w100 p2">

        <h2 className="HomePageHero__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
          Young & Nauseous is a lifestyle and apparel brand based in Brooklyn,
          New York
        </h2>

        <h2 className="HomePageHero__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
          Young & Nauseous was started by Dan Hemerlein from his bed while he was stoned and bored
        </h2>

      </div>
    );
  }
}

export default AboutPage;
