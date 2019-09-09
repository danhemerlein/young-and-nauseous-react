import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./CollectionProductCard.scss";

class CollectionProductCard extends Component {
  
  render() {
    console.log(this.props.product);
    return (
      <div className="CollectionProductCard col-12 md:col-4 flex flex-col items-center justify-center">
        <Link to={`/${this.props.product.handle}`}>
          <div className="">
            <img
              className="w100"
              src={this.props.product.images[0].src}
              alt=""
            />
            {this.props.product.title}
          </div>
        </Link>
      </div>
    );
  }
}

export default CollectionProductCard;
