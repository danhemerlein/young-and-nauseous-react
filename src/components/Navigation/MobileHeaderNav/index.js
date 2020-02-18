import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./MobileHeaderNav.scss";

class MobileHeaderNav extends Component {
  render() {
    return (
      <div
        className={`MobileHeaderNav flex flex-col items-center justify-center playfair p1 aesthetic-pepsi-blue-bg-color ${
          this.props.isCartOpen ? "MobileHeaderNav--open" : ""
        }`}
      >
        <div className="ScorePreview__header flex justify-between flex-col w100 aesthetic-pepsi-white-color bold">
          <div className="aesthetic-windows-xp-button">
            <button
              onClick={this.props.toggleMobileNav}
              className="ScorePreview__close"
            >
              ×
            </button>
          </div>
        </div>

        <Link to="/bag">
          <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active my2">
            <button onClick={this.props.toggleMobileNav}>Bag</button>
          </div>
        </Link>

        <Link to="/collections">
          <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active my2">
            <button
              onClick={() => {
                const id = "collections-mobile-nav";

                this.props.toggleMobileNav();

                this.props.updateGame(id);

                if (!this.props.game.includes(id)) {
                  this.props.setScorePreviewMessage(
                    "you navigated to the collections page"
                  );
                  this.props.setScoreDifference(5);
                  this.props.addPointsToScore(5);
                }
              }}
            >
              Collections
            </button>
          </div>
        </Link>

        <Link to="/about">
          <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active my2">
            <button
              onClick={() => {
                const id = "about-mobile-nav";

                this.props.toggleMobileNav();

                this.props.updateGame(id);

                if (!this.props.game.includes(id)) {
                  this.props.setScorePreviewMessage(
                    "you navigated to the about page"
                  );
                  this.props.setScoreDifference(5);
                  this.props.addPointsToScore(5);
                }
              }}
            >
              About
            </button>
          </div>
        </Link>

        <Link to="/meet-the-models">
          <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active my2">
            <button
              onClick={() => {
                const id = "meet-the-models-mobile-nav";

                this.props.toggleMobileNav();

                this.props.updateGame(id);

                if (!this.props.game.includes(id)) {
                  this.props.setScorePreviewMessage(
                    "you navigated to the meet the models page"
                  );
                  this.props.setScoreDifference(5);
                  this.props.addPointsToScore(5);
                }
              }}
            >
              Meet The Models
            </button>
          </div>
        </Link>
      </div>
    );
  }
}

export default MobileHeaderNav;
