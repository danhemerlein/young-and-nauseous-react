import React, { Component } from 'react';
import LineItem from '../LineItem/';
import './Cart.scss'

class Cart extends Component {
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
        <LineItem
          updateQuantityInCart={this.props.updateQuantityInCart}
          removeLineItemInCart={this.props.removeLineItemInCart}
          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });

    return (
      <div className={`Cart aesthetic-purple-bg-color p2 flex items-center flex-col${this.props.isCartOpen ? 'Cart--open' : ''}`}>

        <header className="Cart__header w100">
          <h1 className="playfair w100 bold text-center">B A G</h1>
        </header>

        <ul className="Cart__line-items mt4 flex items-center justify-center">
          {line_items}
        </ul>

        <footer className="Cart__footer  aesthetic-bg-gradient col-12 md:col-8 flex items-center justify-center flex-col p2 text-center">
          <div className="Cart-info clearfix my1">

            <p className="Cart-info__total Cart-info__small playfair bold">S U B T O T A L</p>

            <div className="Cart-info__pricing">
              <span className="pricing playfair bold">$ {this.props.checkout.subtotalPrice}</span>
            </div>

          </div>

          {/* <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalTax}</span>
            </div>
          </div> */}

          <div className="Cart-info clearfix my1">
            <div className="Cart-info__total Cart-info__small playfair">T O T A L</div>
            <div className="Cart-info__pricing">
              <p className="pricing playfair bold">$ {this.props.checkout.totalPrice}</p>
            </div>
          </div>

          <div className="aesthetic-windows-xp-button h100 col-4">

            <button className="Cart__checkout button playfair bold" onClick={this.openCheckout}>C H E C K O U T</button>

          </div>

        </footer>

      </div>
    )
  }
}

export default Cart;