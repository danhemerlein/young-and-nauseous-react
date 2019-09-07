import React, { Component } from 'react';
import './HomePageContent.scss'

class HomePageContent extends Component {

  render() {
    const bgDesign = {
      backgroundImage: `url(${this.props.bg})`,
      backgroundPosition: "center",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    };
    let imgSrc = this.props.image;
    return (

      <div className="HomePageContent col-8 aesthetic-purple-bg-color p4">

        <div style={bgDesign} className="HomePageContent__bg w100 relative p4">

          <img className="w100" src={imgSrc} alt="" />

          <h2 className="HomePageContent__headline aesthetic-arizona-lime-color aesthetic-font-modifier-gradient-arizona true-sketch-rg absolute ">{this.props.title}</h2>

        </div>

      </div>
    );
  }
}

export default HomePageContent;