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
        title: variant.title,
        src: variant.image.src,
        id: variant.id
      }
      x.push(y);
    }

    for(let imageGraphModel of this.props.product.images) {
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

    const variantColor = this.state.variantObjs[index].title.toLowerCase().replace(' ', '-');
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
            cx('CollectionProductCard__hover-image-container w100 h100',
              {
                'none': variant.id !== this.state.activeVariantID
              },
              {
                'block': variant.id === this.state.activeVariantID
              })
          } data-color={variant.title.toLowerCase().replace(' ', '-')} key={variant.id}>

            <div className="CollectionProductCard__block relative h100 w100">

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

    let colorSwatchMarkup;

    if (this.props.product.variants.length > 1 && this.props.product.options[0].name === 'Color') {
      colorSwatchMarkup = this.state.variants.map((variant, key) => {
          let active = false
          if (variant.id === this.state.activeVariantID) {
            active = true;
          }
          return (
            <div className="mx_5" key={key}>
              <ColorSwatch
                clickHandler={this.colorSwatchClick}
                id={variant.id}
                color={variant.title}
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

    if (this.props.product.variants.length > 1 && this.props.product.options[0].name === 'Size') {
      sizeSelectorMarkup = 
        <div> 
          <SizeSelector
            variants={this.state.variantObjs}
          ></SizeSelector> 
        </div>
    } else {
      sizeSelectorMarkup = null;
    }

    return (
      <div className="CollectionProductCard col-12 md:col-4 aesthetic-windows-95-green-bg-color mx2 flex flex-col">
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
