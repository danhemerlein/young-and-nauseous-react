import React, { Component } from "react";
import { Link } from "react-router-dom";

import ColorSwatch from '../ColorSwatch/';

import "./CollectionProductCard.scss";

class CollectionProductCard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      variants: [],
      imageSrcs: [],
      hasHover: false,
    }
  }

  componentDidMount() {
    let k = [];
    let j = [];
    for (let variant of this.props.product.variants) {
      k.push(variant);
    }

    for(let imageGraphModel of this.props.product.images) {
      j.push(imageGraphModel.src)
    }

    this.setState({
      variants: k,
      imageSrcs: j,
    })

    if (this.props.product.images.length === (this.props.product.variants.length * 2)) {
      this.setState({
        hasHover: true,
      })
    }

  }

  colorSwatchClick() {
    console.log('you are clicking on the color swatch');
  }

  renderGalleryRow = (imageGroup, index) => {
    const image1SRC = imageGroup;

    const image2SRC = imageGroup[index+1];

    if (index === 0 ) {
      return (
        <div className="CollectionProductCard__hover-image-container w100 h100">

          <div className="CollectionProductCard__block relative h100 w100">

            <img
              src={image1SRC}
              alt=""
              className="CollectionProductCard__overlay flex justify-center items-center absolute l0 t0 r0 b0 h100 w100"
            />

            <img           
              src={image2SRC}
              alt=""
              className="CollectionProductCard__top flex justify-center items-center h100 w100"
            />

          </div>

        </div>
      );
    } else {
      return (
        <div className="CollectionProductCard__hover-image-container flex justify-center items-center w100 h100 none">
          <div className="CollectionProductCard__block relative h100 w100">

            <img
              src={image1SRC}
              alt=""
              className="CollectionProductCard__overlay flex justify-center items-center absolute l0 t0 r0 b0 h100 w100"
            />

            <img
              src={image2SRC}
              alt=""
              className="CollectionProductCard__top flex justify-center items-center h100 w100"
            />

          </div>
        </div>
      )
    }
  };

  
  render() {

    const images = this.state.imageSrcs;

    const imageMatrix = images.reduce(
      (rows, image, index) =>
        (index % 2 === 0
          ? rows.push([image])
          : rows[rows.length - 1].push(image)) && rows,
      []
    );

    console.log(imageMatrix);

    let imageMarkup;

    if (this.state.hasHover) {
      imageMarkup = imageMatrix.map((imageGroup, index) =>
        this.renderGalleryRow(imageGroup, index, imageMatrix)
      );
    }

    return (
      <div className="CollectionProductCard col-12 md:col-4 aesthetic-windows-95-green-bg-color mx2 flex flex-col">
        <Link to={`/${this.props.product.handle}`} className="h100 w100 block">

          <div className="flex flex-col justify-center items-center">

            {imageMarkup}

            <p className="my1">{this.props.product.title}</p>

            {/* the price is stored in the variant */}
            <p className="my1">${this.props.product.variants[0].price}</p>

          </div>

        </Link>

        <div className="flex flex items-center justify-center my1">
          {this.state.variants.map((variant, key) => {
            return (
                <div className="mx_5" key={key}>
                  <ColorSwatch
                    clickHandler={this.colorSwatchClick}
                    color={variant.title}
                  ></ColorSwatch>
                </div>
              )
          })}
        </div>

      </div>
    );
  }
}

export default CollectionProductCard;
