import React, { Component } from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';

import Marquee from "../Marquee/";
import MiniCart from "../MiniCart/";
import ScorePreview from "../ScorePreview/";

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

                <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active mx1">
                  <Link to="/cart">
                    <button>Cart</button>
                  </Link>
                </div>

                <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active mx1">
                  <Link to="/collections">
                    <button>Collections</button>
                  </Link>
                </div>

                <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active mx1">
                  <Link to="/about">
                    <button>About</button>
                  </Link>
                </div>

                <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active ml1">
                  <button>Meet The Models</button>
                </div>

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
        ></ScorePreview>

        </div>
      </div>
    );
  }
}

export default Header;

