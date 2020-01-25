import React, { Component } from 'react';
import './LineItem.scss'

class LineItem extends Component {
  constructor(props) {
    super(props);

    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
  }

  decrementQuantity(lineItemId) {
    const updatedQuantity = this.props.line_item.quantity - 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  incrementQuantity(lineItemId) {
    const updatedQuantity = this.props.line_item.quantity + 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  render() {
    return (
      <li className="LineItem col-12 md:col-8 aesthetic-arizona-lime-bg-color mx2 flex p2">

        <div className="LineItem__img col-6 flex items-center justify-center">

          {this.props.line_item.variant.image ? <img src={this.props.line_item.variant.image.src} alt={`${this.props.line_item.title} product shot`} class="w100"/> : null}

        </div>

        <div className="LineItem__content-row col-6 mx2 flex items-center justify-center flex-col">

          <div className="m2">

            <p className="LineItem__title  text-center  playfair">
              {this.props.line_item.title}
            </p>

            <p className="LineItem__variant-title text-center  playfair">
              {this.props.line_item.variant.title}
            </p>

          </div>

          <div className="m2 flex justify-center items-center">

            <div className="aesthetic-windows-xp-button mx_5">

              <button className="LineItem__quantity-update" onClick={() => this.decrementQuantity(this.props.line_item.id)}>-</button>

            </div>

            <span className="LineItem__quantity">{this.props.line_item.quantity}</span>

            <div className="aesthetic-windows-xp-button mx_5">

              <button className="LineItem__quantity-update" onClick={() => this.incrementQuantity(this.props.line_item.id)}>+</button>

            </div>

          </div>

          <div className="m2">

            <p className="LineItem__price flex justify-center items-center">
              <span>$</span> <span>{(this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2)}</span>
            </p>

          </div>

          <div className="aesthetic-windows-xp-button col-6">

            <button className="LineItem__remove" onClick={() => this.props.removeLineItemInCart(this.props.line_item.id)}>remove item</button>

          </div>

        </div>

      </li>
    );
  }
}

export default LineItem;
