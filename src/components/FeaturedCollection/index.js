import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './FeaturedCollection.scss'

class FeaturedCollection extends Component {

  render() {
    const bgDesign = {
      backgroundImage: `url(${this.props.bg})`,
      backgroundPosition: "center",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    };
    const linkDestination = "/" + this.props.linkDestination;
    return (
      <div className="FeaturedCollection col-12 md:col-8 aesthetic-purple-bg-color p2 md:m4">
        <h2 className="font-size-3 aesthetic-arizona-lime-color aesthetic-font-modifier-gradient-arizona true-sketch-rg text-center mb2 block md:none">
          {this.props.title}
        </h2>
        <div style={bgDesign} className="FeaturedCollection__bg w100 relative">
          <Link to={linkDestination}>
            <div className="flex justify-center p1">
              <img className="col-6" src={this.props.image.src} alt="" />

              <h2 className="FeaturedCollection__collection-title-desktop font-size-4 aesthetic-arizona-lime-color aesthetic-font-modifier-gradient-arizona true-sketch-rg absolute none md:block">
                {this.props.title}
              </h2>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default FeaturedCollection;
