import React, { Component } from 'react';

import ColorSwatch from '../ColorSwatch/';
import SizeSelector from '../SizeSelector/';

import cx from 'classnames';
import './PDP.scss';

class PDP extends Component {

  constructor(props) {
    super(props)

    this.state = {
      variants:                [],
      imageSrcs:               [],
      variantObjs:             [],
      hasHover:                false,
      activeVariantID:         '',
      activeColor:             '',
      activeSize:              '',
      availableOptions:        [],
      availableColors:         [],
      availableSizes:          [],
      productWithColorAndSize: false,
    }
  }

  componentDidMount() {
    let imageSrcs =         [];
    let variants =          [];
    let variantObjs =       [];
    let availableOptions =  [];
    let availableColors =   [];
    let availableSizes =    [];

    for (let option of this.props.product.options) {
      availableOptions.push(option.name);
    }

    for (let variant of this.props.product.variants) {
      variants.push(variant);
      let variantObj = {
        title: variant.title,
        src: variant.image.src,
        id: variant.id
      }
      variantObjs.push(variantObj);

      // if the product has two options, color and size
      if (availableOptions.length > 1 ) {
        // color
        availableColors.push(variant.title.split(" / ")[0]);
        // size
        availableSizes.push(variant.title.split(" / ")[1]);

        this.setState({
          productWithColorAndSize: true,
        })
      }
    }

    const uz = [...new Set(availableColors)];
    const ul = [...new Set(availableSizes)];

    for (let imageGraphModel of this.props.product.images) {
      imageSrcs.push(imageGraphModel.src)
    }

    console.log(this.props.product.variants);
    let onLoadColor;
    let onLoadSize;

    if (availableOptions.includes('Color')) {
      onLoadColor = this.props.product.variants[0].title.split(' / ')[0];

      this.setState({
        activeColor: onLoadColor.toLowerCase()
      });
    }

    if (availableOptions.includes('Size')) {
      if (availableOptions.length > 1 ) {
        onLoadSize = this.props.product.variants[0].title.split(' / ')[1];
      } else {
        onLoadSize = this.props.product.variants[0].title.split(' / ')[0];
      }

      this.setState({
        activeSize: onLoadSize.toLowerCase()
      });
    }

    let onLoadVariant;

    // if the product has two options, color and size
    if (availableOptions.length > 1 ) {
      for (let obj of variantObjs) {
        if (obj.title === onLoadColor + " / " + onLoadSize) {
            onLoadVariant = obj.id;
        }
      }
    } else {
      onLoadVariant = this.props.product.variants[0].id;
    }

    this.setState({
      variants:           variants,
      imageSrcs:          imageSrcs,
      variantObjs:        variantObjs,
      activeVariantID:    onLoadVariant,
      availableOptions:   availableOptions,
      availableColors:    uz,
      availableSizes:     ul,
    });

    if (
      this.props.product.images.length ===
      (this.props.product.variants.length * 2)
    ) {
      this.setState({
        hasHover: true,
      })
    }
  }

  setActiveVariant = (id) => {
    this.setState({
      activeVariantID: id
    });
  }

  colorSwatchClick = (str) => {
    // make this only update the color, not the whole variant by ID
    // this.setState({
    //   activeVariantID: str,
    // })

    this.setState({
      activeColor: str,
    })
  }

  sizeSelectorClick = (str) => {
    // make this only update the size, not the whole variant by ID
    this.setState({
      activeVariantID: str,
    })
  }

  renderGalleryRow = (imageGroup, index) => {
    const image1SRC = imageGroup;

    const image2SRC = imageGroup[1];

    const variantTitle = this.state.variantObjs[index].title
    .toLowerCase().replace(' ', '-');

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
      } data-color={variantTitle} key={variantID}>

        <div className="PDP__block relative h100 w100">

          <img
            src={image1SRC}
            alt=""
            className="PDP__overlay flex justify-center items-center absolute
            l0 t0 r0 b0 h100 w100"
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
    const productHandle = this.props.product.handle;
    const productTitle= this.props.product.title;

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

      let colorsRendered = [];

      imageMarkup = this.state.variantObjs.map((variant, index) => {

        let dataColor;

        if (this.state.productWithColorAndSize) {

          dataColor = variant.title.toLowerCase()
          .split(' / ')[0].split(' ').join('-');

          if (!colorsRendered.includes(dataColor)) {
            colorsRendered.push(dataColor);

             return (
               <div
                 className={cx(
                   "PDP__hover-image-container w100 h100",
                   {
                     none: dataColor !== this.state.activeColor
                   },
                   {
                     block: dataColor === this.state.activeColor
                   }
                 )}
                 data-color={dataColor}
                 key={variant.id}
               >
                 <div className="PDP__block relative h100 w100">
                   <img
                     src={variant.src}
                     alt={variant.title}
                     className="h100 w100"
                   />
                 </div>
               </div>
             );
          }

        } else {
          dataColor = variant.title.toLowerCase().replace(' / ', '-')
          return null;
        }

      })
    }

    let colorSwatchMarkUp;

    if (this.state.availableOptions.includes('Color')) {

      colorSwatchMarkUp =
        <div className="flex flex items-center justify-center my1">
          {this.state.availableColors.map((color, key) => {
            let active = false;

            if (
              color.toLowerCase().replace(' ', '-') ===
              this.state.activeColor
            ) {
              active = true;
            }

            let colorFormat = color.toLowerCase().replace(' ', '-');

            return (
              <div className="mx_5 color-white" key={key}>
               <ColorSwatch
                  clickHandler={this.colorSwatchClick}
                  productTitle={this.props.product.title}
                  color={colorFormat}
                  active={active}
                ></ColorSwatch>
              </div>
            )

          })}
        </div>
    } else {
      colorSwatchMarkUp = null;
    }

    let sizeSelectorMarkUp;

    console.log(this.state.availableSizes);
    if (
      this.state.availableOptions.includes('Size')
    ) {
      sizeSelectorMarkUp = (
        <div className="my1">
          <SizeSelector
            clickHandler={this.sizeSelectorClick}
            sizes={this.state.availableSizes}
          ></SizeSelector>
        </div>
      );
    } else {
      sizeSelectorMarkUp = null;
    }

    return (
      <div className="PDP flex overflow-hidden flex-col lg:flex-row">
        <div className="col-12 lg:col-6 p4 aesthetic-bg-gradient">
          {imageMarkup}
        </div>

        <div className="col-12 lg:col-6 flex items-center justify-center
        flex-col aesthetic-25-transparent-bg-color p0 md:p4">
          <div className="aesthetic-75-transparent-bg-color p2 flex
          items-center justify-center flex-col">
            <h2
              className="PDP__product-title  true-sketch-rg  aesthetic-font-modifier-outline-purple  aesthetic-effect-text-glitch"
              data-glitch={this.props.product.title}
            >
              {this.props.product.title}
            </h2>

            <h4 className="PDP__product-price  true-sketch-rg  aesthetic-font-modifier-outline-purple my1">
              {/* the price is stored in the variant */}$
              {this.props.product.variants[0].price}
            </h4>

            {colorSwatchMarkUp}

            {sizeSelectorMarkUp}

            <div className="aesthetic-windows-95-button col-3 my1">
              <button
                onClick={() => {
                  this.props.addToCart(this.state.activeVariantID, 1);

                  // this.props.updateGame(productHandle);

                  if (!this.props.game.includes(productHandle)) {
                    this.props.setScorePreviewMessage(
                      `hell yeah, you added ${productTitle} to your cart`
                    );
                    this.props.setScoreDifference(20);
                    this.props.addPointsToScore(20);
                  }
                }}
              >
                {" "}
                place in bag
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
