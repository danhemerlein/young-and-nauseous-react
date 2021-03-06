import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./DesktopHeaderNav.scss";

class DesktopHeaderNav extends Component {
  render() {
    return (
      <div className="col-9 none md:flex items-end justify-end pr1">
        <div className="aesthetic-windows-95-tabbed-container">
          <div className="aesthetic-windows-95-tabbed-container-tabs">
            <Link to="/bag">
              <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active mx1">
                <button>Bag</button>
              </div>
            </Link>

            <Link to="/collections">
              <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active mx1">
                <button
                  onClick={() => {
                    const id = "collections-header-nav";

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
              <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active mx1">
                <button
                  onClick={() => {
                    const id = "about-header-nav";

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
              <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active ml1">
                <button
                  onClick={() => {
                    const id = "meet-the-models-header-nav";

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
        </div>
      </div>
    );
  }
}

export default DesktopHeaderNav;
