import React, { Component } from "react";
import { Link } from "react-router-dom";

import Marquee from "../Marquee/";

import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="Footer aesthetic-arizona-pink-bg-color">
        <div className="p1 flex justify-between">
          <div className="col-6">

            <Link to="/collections">
              <div className="aesthetic-windows-95-button my1">
                  <button
                    onClick={() => {
                      const id = 'collections-footer-nav';

                      this.props.updateGame(id);

                      if (!this.props.game.includes(id)) {
                        this.props.setScorePreviewMessage('you navigated to the collections page');
                        this.props.setScoreDifference(5);
                        this.props.addPointsToScore(5);
                      }
                    }}
                  >Collections</button>
              </div>
            </Link>

            <Link to="/about">
              <div className="aesthetic-windows-95-button my1">
                <button
                  onClick={() => {
                    const id = 'about-footer-nav';

                    this.props.updateGame(id);

                    if (!this.props.game.includes(id)) {
                      this.props.setScorePreviewMessage('you navigated to the about page');
                      this.props.setScoreDifference(5);
                      this.props.addPointsToScore(5);
                    }
                  }}
                >About
                </button>
              </div>
            </Link>

            <Link to="meet-the-models">
              <div className="aesthetic-windows-95-button my1">
                  <button
                    onClick={() => {
                      const id = 'meet-the-models-footer-nav';

                      this.props.updateGame(id);

                      if (!this.props.game.includes(id)) {
                        this.props.setScorePreviewMessage('you navigated to the meet the models page');
                        this.props.setScoreDifference(5);
                        this.props.addPointsToScore(5);
                      }
                    }}
                  
                  >Meet The Models</button>
              </div>
            </Link>

            <Link to="site-map">
              <div className="aesthetic-windows-95-button my1">
                  <button
                    onClick={() => {
                      const id = 'site-map-footer-nav';

                      this.props.updateGame(id);

                      if (!this.props.game.includes(id)) {
                        this.props.setScorePreviewMessage('you navigated to the site map');
                        this.props.setScoreDifference(5);
                        this.props.addPointsToScore(5);
                      }
                    }}
                  >Site Map</button>
              </div>
            </Link>
          </div>

          <div className="col-6 flex items-center flex-col">
            <form action="" className="">
              <label className="block my1">Subscribe to the Email List</label>

              <input
                className="aesthetic-windows-95-text-input my1"
                type="text"
                defaultValue="c:\aesthetic\src"
              />

              <div className="aesthetic-windows-95-button my1">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <Marquee />
      </div>
    );
  }
}

export default Footer;
