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
      <div className="FeaturedCollection col-8 aesthetic-purple-bg-color p4">

        <div style={bgDesign} className="FeaturedCollection__bg w100 relative">

          <Link to={linkDestination}>

            <div className="flex justify-center p1">

              <img className="col-6" src={this.props.image.src} alt="" />

              <h2 className="FeaturedCollection__collection-title aesthetic-arizona-lime-color aesthetic-font-modifier-gradient-arizona true-sketch-rg absolute ">
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
