import React, { Component } from "react";

import "./CollectionPage.scss";
import CollectionProductCard from "../CollectionProductCard";

class CollectionPage extends Component {
  render() {
    console.log(this.props.products.products);
    return (
      <div className="CollectionPage flex p2">
        {this.props.products.products.map((product, key) => {
          return (            
              <CollectionProductCard 
                key={key} 
                product={product}
              />
          );
        })}
      </div>
    );
  }
}

export default CollectionPage;
