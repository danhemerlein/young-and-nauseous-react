import React, { Component } from "react";
import "./ScorePreview.scss";

class ScorePreview extends Component {
  render() {
    console.log(this.props.sco)
    
    return (
      <div
        className={`ScorePreview flex flex-col items-center justify-center p1 aesthetic-pepsi-blue-bg-color ${
          this.props.isCartOpen ? "ScorePreview--open" : ""
        }`}
      >
        <div className="ScorePreview__header flex justify-between flex-col w100 aesthetic-pepsi-white-color bold">

          <div className="aesthetic-windows-xp-button">

            <button
              onClick={this.props.handleScorePreviewClose}
              className="ScorePreview__close"
            >
              ×
            </button>

          </div>

          <p className="ScorePreview__score my_5">your score is {this.props.score}</p>

          <p className="my_5">acheive a score of {this.props.scoreMax} to unlook a scecret gift</p>

          <p className="my_5">only {this.props.scoreDifference} points remaining</p>

        </div>
       
      </div>
    );
  }
}

export default ScorePreview;
