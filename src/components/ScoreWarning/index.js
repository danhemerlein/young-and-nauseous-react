import React, { Component } from "react";
import "./ScoreWarning.scss";

class ScoreWarning extends Component {
  render() {
    return (
      <div
        className={`ScoreWarning flex flex-col items-center justify-center p1 aesthetic-pepsi-red-bg-color ${
          this.props.isCartOpen ? "ScoreWarning--open" : ""
          }`}
      >
        <div className="ScoreWarning__header flex justify-between flex-col w100 aesthetic-pepsi-white-color bold">

          <div className="aesthetic-windows-xp-button">

            <button
              onClick={this.props.handleScoreWarningClose}
              className="ScoreWarning__close"
            >
              ×
            </button>

          </div>

          <p className="playfair my_5">oops ! looks like you already clicked on that, explore the site to find more things to engage with : ]</p>

        </div>

      </div>
    );
  }
}

export default ScoreWarning;
