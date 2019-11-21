import React, { Component } from "react";

import "./Collections.scss";
import CollectionCard from "../CollectionCard";

class Collections extends Component {

  render() {
    return (
      <div className="Collections flex flex-col justify-center items-center p2 aesthetic-25-transparent-bg-color flex-wrap">
        {this.props.collections.map((collection, key) => {
          return (
            <CollectionCard 
              collection={collection}
              key={key}
            />
          );
        })}
      </div>
    );
  }
}

export default Collections;
