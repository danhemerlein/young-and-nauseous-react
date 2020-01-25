import React, { Component } from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';

import Marquee from "../Marquee/";
import MiniCart from "../MiniCart/";
import ScorePreview from "../ScorePreview/";
import ScoreWarning from "../ScoreWarning/";
import DesktopHeaderNav from "../Navigation/DesktopHeaderNav";
import MobileHeaderNav from "../Navigation/MobileHeaderNav";

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

          <DesktopHeaderNav
            setScorePreviewMessage={this.props.setScorePreviewMessage}
            addPointsToScore={this.props.addPointsToScore}
            setScoreDifference={this.props.setScoreDifference}
            updateGame={this.props.updateGame}
            game={this.props.game}
          />

          <MobileHeaderNav
            setScorePreviewMessage={this.props.setScorePreviewMessage}
            addPointsToScore={this.props.addPointsToScore}
            setScoreDifference={this.props.setScoreDifference}
            updateGame={this.props.updateGame}
            game={this.props.game}
          />
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

