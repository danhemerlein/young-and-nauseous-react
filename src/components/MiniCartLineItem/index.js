import React, { Component } from 'react';
import './MiniCartLineItem.scss'

class MiniCartLineItem extends Component {
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
    const lineItemId = this.props.line_item.id;
    const variantTitle = this.props.line_item.variant.title;

    return (
      <li className="MiniCartLineItem w100 my1">
        <div className="flex justify-between">

          <div className="col-8 flex flex-col">

            <div className="flex">
              <p>{this.props.line_item.title}</p>
              <button className="ml_5 pointer" onClick={() => { this.props.removeLineItemInCart(lineItemId) }}>×</button>
            </div>

            <p>({variantTitle})</p>
          </div>

          <div className="col-4 flex justify-end">
            <p>{this.props.line_item.variant.price}</p>
          </div>

        </div>

        <div className="flex mt_5">

          <button className="mr_5 pointer"onClick={() => {this.decrementQuantity(lineItemId)}}>-</button>

          <p>{this.props.line_item.quantity}</p>

          <button className="mx_5 pointer" onClick={() => {this.incrementQuantity(lineItemId)}}>+</button>




        </div>

      </li>
    );
  }
}

export default MiniCartLineItem;