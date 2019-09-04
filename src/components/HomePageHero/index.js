import React, { Component } from 'react';

import PDP from '../PDP/';

import './HomePageHero.scss'
import debounce from "../../utils/debounce";


class HomePageHero extends Component {

  setHeightHPH = () => {
    const header = document.querySelector('.Header');
    const HomePageHero = document.querySelector('.HomePageHero__featured-image');

    const HPHHeight = (window.innerHeight - header.offsetHeight);

    HomePageHero.style.height = HPHHeight + "px";
  }

  debounceHPHHeight = () => {
    debounce(this.setHeightHPH(), 100);
  }

  componentDidMount = () => {
    this.setHeightHPH();
    window.addEventListener("resize", this.debounceHPHHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debounceHPHHeight);
  }

  render() {
    const heroImage = {
      backgroundImage: "url(https://image.shutterstock.com/z/stock-photo-portrait-of-a-young-beautiful-fashionable-girl-wearing-sunglasses-model-in-a-stylish-black-hat-768372805.jpg)",
      backgroundPosition: "center",
      backgroundSize: 'cover',
      overflow: 'hidden',
    };
    return (
      <div className="HomePageHero w100">

        <div style={heroImage} className="HomePageHero__featured-image w100"></div>

        <div className="bg-pink w100 flex w100 justify-center items-center p2">

          <PDP product={this.props.product} />

        </div>
        
      </div>
    );
  }
}

export default HomePageHero;