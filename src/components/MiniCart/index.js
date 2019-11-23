import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MiniCartLineItem from '../MiniCartLineItem/';
import './MiniCart.scss'

class MiniCart extends Component {
  constructor(props) {
    super(props);

    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    window.open(this.props.checkout.webUrl);
  }

  render() {
    let line_items = this.props.checkout.lineItems.map((line_item) => {
      return (
        <MiniCartLineItem
          updateQuantityInCart={this.props.updateQuantityInCart}
          removeLineItemInCart={this.props.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });

    return (
      <div className={`MiniCart flex flex-col items-center justify-center p1 aesthetic-pepsi-blue-bg-color ${this.props.isCartOpen ? 'MiniCart--open' : ''}`}>
        <header className="MiniCart__header flex justify-between w100 aesthetic-pepsi-white-color bold">
          
          B A G

          <div className="aesthetic-windows-xp-button">

            <button
              onClick={this.props.handleCartClose}
              className="MiniCart__close">
              ×
            </button>

          </div>

        </header>
        <ul className="MiniCart__line-items aesthetic-pepsi-white-color w100 my1">
          {line_items}
        </ul>
        <footer className="MiniCart__footer aesthetic-pepsi-white-color w100">

          <div className="MiniCart-info flex justify-between w100">
            <div className="MiniCart-info__total MiniCart-info__small bold">T O T A L</div>
            <div className="MiniCart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalPrice}</span>
            </div>
          </div>

          <div className=" aesthetic-windows-xp-button flex items-center justify-center mt1 mb_5 col-8">

            <Link to='/bag'>

              <button className="MiniCart__checkout button">Proceed To Bag</button>

            </Link>

          </div>

        </footer>
      </div>
    )
  }
}

export default MiniCart;
