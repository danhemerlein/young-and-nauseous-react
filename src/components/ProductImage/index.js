import React, { Component } from 'react';
import './ProductImage.scss'

class ProductImage extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };
    
    this.findImage = this.findImage.bind(this);
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    return (
      <div className="ProductImage">
        {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`} /> : null}
      </div>
    );
  }
}

export default ProductImage;