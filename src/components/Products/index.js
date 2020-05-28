import React, { Component } from 'react';
import Product from '../Product';
import './Products.scss'


class Products extends Component {
  render() {
    let products = this.props.products.map((product) => {
      return (
        <Product
          addVariantToCart={this.props.addVariantToCart}
          client={this.props.client}
          key={product.id.toString()}
          product={product}
        />
      );
    });

    return (
      <div className="Product-wrapper">
        {products}
      </div>
    );
  }
}

export default Products;