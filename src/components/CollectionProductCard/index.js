import React, { Component } from "react";
import { Link } from "react-router-dom";

import ColorSwatch from '../ColorSwatch/';
import SizeSelector from '../SizeSelector/';

import cx from 'classnames';
import "./CollectionProductCard.scss";

class CollectionProductCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      variants: [],
      imageSrcs: [],
      variantObjs: [],

      hasColors: false,
      availableColors: [],
      activeColor: 'black',

      hasSizes: false,
      availableSizes: [],
      activeSize: null,

      hasHover: false,
      activeVariantID: ""
    };
  }

  componentDidMount() {

    console.log(this.props.product);

    let variants        = [];
    let imageSrcs       = [];
    let variantObjs     = [];
    let availableColors = [];
    let availableSizes  = [];
    let activeColor;
    let hasSizes;
    let hasColors;

    for (let variant of this.props.product.variants) {
      variants.push(variant);
      let y = {
        title: variant.title,
        src: variant.image.src,
        id: variant.id
      }
      variantObjs.push(y);
    }

    for (let option of this.props.product.options) {
      if (option.name === 'Color') {
        hasColors = true;
      }
      if (option.name === 'Size') {
        hasSizes = true;
      }
    }

    console.log(hasSizes);
    console.log(hasColors);

    // if the product has both colors and sizes
    if (hasColors && hasSizes) {
      for (let variant of this.props.product.variants) {
        let variantSplit = variant.title.split(' / ');
        availableColors.push(variantSplit[0]);
        availableSizes.push(variantSplit[1]);
      }
    }

    // if the product only has sizes
    if (!hasColors && hasSizes) {
      for (let variant of this.props.product.variants) {
        let variantSplit = variant.title.split(" / ");
        availableSizes.push(variantSplit[0]);
      }
    }

    // if the product only has colors

    if (hasColors && !hasSizes) {
      for (let variant of this.props.product.variants) {
        let variantSplit = variant.title.split(" / ");
        availableColors.push(variantSplit[0]);
      }
    }

    console.log('available Colors',availableColors);
    console.log('available Sizes', availableSizes);

    const availableColorsWashed = [...new Set(availableColors)];
    const availableSizesWashed  = [...new Set(availableSizes)];

    for(let imageGraphModel of this.props.product.images) {
      imageSrcs.push(imageGraphModel.src)
    }

    const onLoadVariant = this.props.product.variants[0].id;

    this.setState({
      variants: variants,
      imageSrcs: imageSrcs,
      variantObjs: variantObjs,
      activeVariantID: onLoadVariant,
      availableColors: availableColorsWashed,
      availableSizes: availableSizesWashed,
      hasSizes: hasSizes,
      hasColors: hasColors
    });

    if (this.props.product.images.length === (this.props.product.variants.length * 2)) {
      this.setState({
        hasHover: true,
      })
    }

  }

  colorSwatchClick = (str) => {

    this.setState({
      activeColor: str.toLowerCase().replace(" ", "-")
    });

  }

  renderGalleryRow = (imageGroup, index) => {
    const image1SRC = imageGroup;

    const image2SRC = imageGroup[1];

    const variantColor = this.state.variantObjs[index].title
      .toLowerCase()
      .replace(" ", "-");

    const variantID = this.state.variantObjs[index].id;

      return (

        <div className={
          cx('CollectionProductCard__hover-image-container w100 h100',
            {
              'none': variantID !== this.state.activeVariantID
            },
            {
              'block': variantID === this.state.activeVariantID
          })
        } data-color={variantColor} key={variantID}>

          <div className="CollectionProductCard__block relative h100 w100">

            <img
              src={image1SRC}
              alt=""
              className="CollectionProductCard__overlay flex justify-center
              items-center absolute l0 t0 r0 b0 h100 w100"
            />

            <img
              src={image2SRC}
              alt=""
              className="CollectionProductCard__top flex justify-center
              items-center h100 w100"
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
        if (this.state.hasColors) {
          imageMarkup = this.state.variantObjs.map((variant, index) => {
            let variantColor = variant.title.split(' / ')[0].toLowerCase().replace(' ', '-');

            console.log(variantColor);

            console.log(this.state.activeColor);

            return (
              <div
                className={cx(
                  "w100 h100",
                  {
                    none: variantColor !== this.state.activeColor
                  },
                  {
                    block: variantColor === this.state.activeColor
                  }
                )}
                data-color={variantColor}
                key={variant.id}
              >
                <div className="CollectionProductCard__block relative h100 w100">
                  <img src={variant.src} alt="" className="h100 w100" />
                </div>
              </div>
            );
          })
        }
      }

    let colorSwatchMarkup;

    if (this.state.hasColors) {
      colorSwatchMarkup = this.state.availableColors.map((color, key) => {
          let active = false
          if (color.toLowerCase().replace(' ', '-')
          === this.state.activeColor) {
            active = true;
          }
          return (
            <div className="mx_5" key={key}>
              <ColorSwatch
                clickHandler={this.colorSwatchClick}
                color={color}
                active={active}
              ></ColorSwatch>
            </div>
          )
        })
    } else {
      colorSwatchMarkup = null;
    }

    // this is the markup for the size selector for accessories
    let sizeSelectorMarkup;

    if (this.state.hasSizes) {
      sizeSelectorMarkup = null;
        // <div>
        //   <SizeSelector
        //     sizes={this.state.variantObjs}
        //   ></SizeSelector>
        // </div>
    } else {
      sizeSelectorMarkup = null;
    }

    return (
      <div className="CollectionProductCard p2 col-12 md:col-4 aesthetic-windows-95-green-bg-color mx2 flex flex-col">
        <Link to={`/${this.props.product.handle}`} className="h100 w100 block">

          <div className="flex flex-col justify-center items-center">

            {imageMarkup}

            <p className="CollectionProductCard__product-title my1 playfair text-center aesthetic-pepsi-white-color">{this.props.product.title}</p>

            {/* the price is stored in the variant */}
            <p className="CollectionProductCard__product-price mb1 playfair text-center aesthetic-pepsi-white-color">${this.props.product.variants[0].price}</p>

          </div>

        </Link>

        <div className="flex flex items-center justify-center my1">
          {colorSwatchMarkup}
        </div>

        <div className="flex flex items-center justify-center my1">
          <ul>
            {sizeSelectorMarkup}
          </ul>
        </div>

      </div>
    );
  }
}


export default CollectionProductCard;
