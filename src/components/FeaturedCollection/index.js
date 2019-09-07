import React, { Component } from 'react';
import './FeaturedCollection.scss'

class FeaturedCollection extends Component {

  render() {
    console.log(this.props.image)
    const bgDesign = {
      backgroundImage: `url(${this.props.bg})`,
      backgroundPosition: "center",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    };
    let imgSrc = this.props.image.src;
    console.log(imgSrc);
    return (

      <div className="FeaturedCollection col-8 aesthetic-purple-bg-color p4">

        <div style={bgDesign} className="FeaturedCollection__bg w100 relative">

          <img className="w100" src={imgSrc} alt="" />

          <h2 className="FeaturedCollection__collection-title aesthetic-arizona-lime-color aesthetic-font-modifier-gradient-arizona true-sketch-rg absolute ">{this.props.title}</h2>

        </div>

      </div>
    );
  }
}

export default FeaturedCollection;