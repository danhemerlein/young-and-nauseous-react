import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./CollectionCard.scss";

class CollectionCard extends Component {
  render() {
    return (
      <div className="CollectionCard  col-12 md:col-4 aesthetic-arizona-lime-bg-color mx2 flex flex-col p2">

        <Link to={`/${this.props.collection.handle}`} className="h100 w100 block">

          <img src={this.props.collection.image.src} alt="" className="w100"/>

          <div className="flex flex-col justify-center items-center">
            <p className="playfair">{this.props.collection.title}</p>
          </div>

        </Link>

      </div>
    );
  }
}

export default CollectionCard;
