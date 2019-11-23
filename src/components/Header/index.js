import React, { Component } from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';

import Marquee from "../Marquee/";
import MiniCart from "../MiniCart/";
import ScorePreview from "../ScorePreview/";
import ScoreWarning from "../ScoreWarning/";

import './Header.scss'

class Header extends Component {

  render() {
    
    return (
      <div className="Header relative">
        <Marquee />

        <div className="aesthetic-arizona-pink-bg-color flex justify-between w100">
          <div className="col-3 p1">
            <Link to="/">
              <img
                className="w100"
                src="https://cdn.shopify.com/s/files/1/0269/5793/8787/files/YN-02-2.png?6"
                alt="Young & Nauseous"
              />
            </Link>
          </div>

          <div className="col-9 flex items-end justify-end pr1">

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
                          const id = 'collections-header-nav';

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
                  <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active mx1">
                      <button
                        onClick={() => {
                          const id = 'about-header-nav';

                          this.props.updateGame(id);

                          if (!this.props.game.includes(id)) {
                            this.props.setScorePreviewMessage('you navigated to the about page');
                            this.props.setScoreDifference(5);
                            this.props.addPointsToScore(5);
                          }
                        }}
                      >About</button>
                  </div>
                </Link>

                <Link to="/meet-the-models">
                  <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active ml1">
                      <button onClick={() => {
                        const id = 'meet-the-models-header-nav';

                        this.props.updateGame(id);

                        if (!this.props.game.includes(id)) {
                          this.props.setScorePreviewMessage('you navigated to the meet the models page');
                          this.props.setScoreDifference(5);
                          this.props.addPointsToScore(5);
                        }
                      }}>Meet The Models</button>
                  </div>
                </Link>

              </div>

            </div>

          </div>

        </div>

        <div
          className={cx("Header__mini-cart r0", {
            "Header__mini-cart--active": this.props.isMiniCartOpen
          })}
        >
          <MiniCart
            checkout={this.props.checkout}
            isCartOpen={this.props.isCartOpen}
            handleCartClose={this.props.handleCartClose}
            updateQuantityInCart={this.props.updateQuantityInCart}
            removeLineItemInCart={this.props.removeLineItemInCart}
          ></MiniCart>
        </div>

        <div
          className={cx("Header__score-preview l0", {
            "Header__score-preview--active": this.props.isScorePreviewOpen
          })}
        >

          <ScorePreview
            handleScorePreviewClose={this.props.handleScorePreviewClose}
            score={this.props.score}
            scoreMax={this.props.scoreMax}
            scoreDifference={this.props.scoreDifference}
            scorePreviewMessage={this.props.scorePreviewMessage}
          ></ScorePreview>

        </div>

        <div
          className={cx("Header__score-warning r0", {
            "Header__score-warning--active": this.props.isScoreWarningOpen
          })}
        >

          <ScoreWarning
            handleScoreWarningClose={this.props.handleScoreWarningClose}
            scoreWarningMessage={this.props.scoreWarningMessage}
            score={this.props.score}
          ></ScoreWarning>

        </div>

      </div>
    );
  }
}

export default Header;

