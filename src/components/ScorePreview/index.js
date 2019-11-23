import React, { Component } from "react";
import "./ScorePreview.scss";

class ScorePreview extends Component {
  render() {    
    return (
      <div
        className={`ScorePreview flex flex-col items-center justify-center playfair p1 aesthetic-pepsi-blue-bg-color ${
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

          <p className="my_5">{this.props.scorePreviewMessage}</p>

          <p className="ScorePreview__score my_5">your score is <span className="aesthetic-pepsi-red-color">{this.props.score}</span></p>

          <p className="my_5">acheive a score of span. <span className="aesthetic-pepsi-red-color">{this.props.scoreMax}</span> to unlock a scecret gift</p>

          <p className="my_5">only <span className="aesthetic-pepsi-red-color">{this.props.scoreDifference}</span> points remaining</p>

        </div>
       
      </div>
    );
  }
}

export default ScorePreview;
