import React, { Component } from 'react';
import LineItem from '../LineItem/';
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
      <div className={`MiniCart flex flex-col items-center justify-center p_5 bg-black ${this.props.isCartOpen ? 'MiniCart--open' : ''}`}>
        <header className="MiniCart__header flex justify-between w100 color-white">
          
          B A G

          <button
            onClick={this.props.handleCartClose}
            className="MiniCart__close">
            ×
          </button>

        </header>
        <ul className="MiniCart__line-items color-white w100 my1">
          {line_items}
        </ul>
        <footer className="MiniCart__footer color-white w100">

          {/* <div className="MiniCart-info">
            <div className="MiniCart-info__total MiniCart-info__small">Subtotal</div>
            <div className="MiniCart-info__pricing">
              <span className="pricing">$ {this.props.checkout.subtotalPrice}</span>
            </div>
          </div> */}
          {/* <div className="MiniCart-info">
            <div className="MiniCart-info__total MiniCart-info__small">Taxes</div>
            <div className="MiniCart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalTax}</span>
            </div>
          </div> */}

          <div className="MiniCart-info flex justify-between w100">
            <div className="MiniCart-info__total MiniCart-info__small">T O T A L</div>
            <div className="MiniCart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalPrice}</span>
            </div>
          </div>

          <div className="flex items-center justify-center mt1 mb_5">

            <button className="MiniCart__checkout button" onClick={this.openCheckout}>Proceed To Bag</button>

          </div>

        </footer>
      </div>
    )
  }
}

export default MiniCart;