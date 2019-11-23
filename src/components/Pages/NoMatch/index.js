import React, { Component } from "react";
import { Link } from "react-router-dom";


import "./NoMatch.scss";

class NoMatch extends Component {
  render() {
    return (
      <div className="NoMatch flex flex-col items-center bg-pink w100 p2">

        <h2 className="HomePageHero__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
          this is a 404 page, you might want to <Link to="/">go home</Link>
        </h2>

      </div>
    );
  }
}

export default NoMatch;
