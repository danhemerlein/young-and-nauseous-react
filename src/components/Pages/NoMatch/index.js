import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./NoMatch.scss";

class NoMatch extends Component {

  render() {
    return (
      <div className="NoMatch flex flex-col items-center justify-center bg-pink w100 p2">
        <h1 className="NoMatch__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
          this is a 404 page,
        </h1>
        <h1 className="NoMatch__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py1">
          you might want to
        </h1>
        <h1 className="NoMatch__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
          <Link to="/">
            <span className="aesthetic-blue-color ">go home</span>
          </Link>
        </h1>
      </div>
    );
  }
}

export default NoMatch;
