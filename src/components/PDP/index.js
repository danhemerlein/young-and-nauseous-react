import React, { Component } from 'react';

import ColorSwatch from '../ColorSwatch/';

import cx from 'classnames';
import './PDP.scss';

class PDP extends Component {

  constructor(props) {
    super(props)

    this.state = {
      variants: [],
      imageSrcs: [],
      variantObjs: [],
      hasHover: false,
      activeVariantID: '',
    }
  }

  componentDidMount() {
    let k = [];
    let j = [];
    let x = [];

    for (let variant of this.props.product.variants) {
      k.push(variant);
      let y = {
        color: variant.title,
        src: variant.image.src,
        id: variant.id
      }
      x.push(y);
    }

    for (let imageGraphModel of this.props.product.images) {
      j.push(imageGraphModel.src)
    }

    const onLoadVariant = this.props.product.variants[0].id;

    this.setState({
      variants: k,
      imageSrcs: j,
      variantObjs: x,
      activeVariantID: onLoadVariant
    })

    if (this.props.product.images.length === (this.props.product.variants.length * 2)) {
      this.setState({
        hasHover: true,
      })
    }

  }

  colorSwatchClick = (str) => {

    this.setState({
      activeVariantID: str,
    })
  }

  renderGalleryRow = (imageGroup, index) => {
    const image1SRC = imageGroup;

    const image2SRC = imageGroup[1];

    const variantColor = this.state.variantObjs[index].color.toLowerCase().replace(' ', '-');
    const variantID = this.state.variantObjs[index].id;

    return (

      <div className={
        cx('PDP__hover-image-container w100 h100',
          {
            'none': variantID !== this.state.activeVariantID
          },
          {
            'block': variantID === this.state.activeVariantID
          })
      } data-color={variantColor} key={variantID}>

        <div className="PDP__block relative h100 w100">

          <img
            src={image1SRC}
            alt=""
            className="PDP__overlay flex justify-center items-center absolute l0 t0 r0 b0 h100 w100"
          />

          <img
            src={image2SRC}
            alt=""
            className="PDP__top flex justify-center items-center h100 w100"
          />

        </div>

      </div>
    );
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

    let imageMarkup;

    if (this.state.hasHover) {
      imageMarkup = imageMatrix.map((imageGroup, index) =>
        this.renderGalleryRow(imageGroup, index, imageMatrix)
      );
    } else {
      imageMarkup = this.state.variantObjs.map((variant, index) => {
        return (
          <div className={
            cx('PDP__hover-image-container w100 h100',
              {
                'none': variant.id !== this.state.activeVariantID
              },
              {
                'block': variant.id === this.state.activeVariantID
              })
          } data-color={variant.color.toLowerCase().replace(' ', '-')} key={variant.id}>

            <div className="PDP__block relative h100 w100">

              <img
                src={variant.src}
                alt=""
                className="h100 w100"
              />

            </div>

          </div>
        )
      })
    }

    return (
      <div className="PDP flex overflow-hidden">
  
        <div className="col-6">

          {imageMarkup}

        </div>

        <div className="col-6 flex items-center justify-center flex-col">
          <h2
            className="PDP__product-title  true-sketch-rg  aesthetic-font-modifier-outline-purple  aesthetic-effect-text-glitch"
            data-glitch={this.props.product.title}
          >
            {this.props.product.title}
          </h2>

          <h4
            className="PDP__product-price  true-sketch-rg  aesthetic-font-modifier-outline-purple my1"
          > 
            {/* the price is stored in the variant */}
            ${this.props.product.variants[0].price}
          </h4>

          <div className="flex flex items-center justify-center my1">
            {this.state.variants.map((variant, key) => {
              return (
                <div className="mx_5" key={key}>
                  <ColorSwatch
                    clickHandler={this.colorSwatchClick}
                    id={variant.id}
                    color={variant.title}
                  ></ColorSwatch>
                </div>
              )
            })}
          </div>

          <div className="aesthetic-windows-95-button col-3">
            <button onClick={() => { this.props.addToCart(this.state.activeVariantID, 1) }}> place in bag</button>
          </div>

        </div>

      </div>
    );
  }
}

export default PDP;