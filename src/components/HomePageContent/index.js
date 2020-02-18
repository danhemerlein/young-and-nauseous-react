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
      <div className="HomePageContent col-12 md:col-8 aesthetic-purple-bg-color p2 md:p4">
        <h2 className="font-size-3 aesthetic-arizona-lime-color aesthetic-font-modifier-gradient-arizona true-sketch-rg block md:none text-center">
          {this.props.title}
        </h2>

        <div
          style={bgDesign}
          className="HomePageContent__bg w100 relative p2 md:p4"
        >
          <img className="w100" src={imgSrc} alt="" />

          <h2 className="HomePageContent__headline-desktop font-size-4 aesthetic-arizona-lime-color aesthetic-font-modifier-gradient-arizona true-sketch-rg absolute none md:block">
            {this.props.title}
          </h2>
        </div>
      </div>
    );
  }
}

export default HomePageContent;
