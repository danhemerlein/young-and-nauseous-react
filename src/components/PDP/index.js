import React, { Component } from 'react';
import ProductImage from '../ProductImage/';
import './PDP.scss'


class PDP extends Component {

  render() {
    console.log(this.props.product);
    return (
      <div className="PDP flex">
  
        <div className="col-6">
          <ProductImage product={this.props.product} />
        </div>

        <div className="col-6 flex items-center justify-center flex-col">
          <h2
            className="PDP__product-title  true-sketch-rg  aesthetic-font-modifier-outline-purple  aesthetic-effect-text-glitch"
            data-glitch={this.props.product.title}
          >
            {this.props.product.title}
          </h2>

          <h4
            className="PDP__product-price  true-sketch-rg  aesthetic-font-modifier-outline-purple"
          > 
            {/* the price is stored in the variant */}
            ${this.props.product.variants[0].price}
          </h4>

          <div className="aesthetic-windows-95-button col-3">
            <button>place in bag</button>
          </div>

        </div>

      </div>
    );
  }
}

export default PDP;