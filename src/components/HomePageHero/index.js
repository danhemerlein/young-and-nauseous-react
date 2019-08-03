import React, { Component } from 'react';
import ProductImage from '../ProductImage/';
import './HomePageHero.scss'

class HomePageHero extends Component {

  render() {

    return (
      <div className="HomePageHero">
        <ProductImage
          product={this.props.product}
        ></ProductImage>
      </div>
    )
  }
}

export default HomePageHero;