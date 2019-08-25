import React, { Component } from 'react';
import ProductImage from '../ProductImage/';
import './HomePageHero.scss'
import debounce from "../../utils/debounce";


class HomePageHero extends Component {

  setHeightHPH = () => {
    const header = document.querySelector('.App__header');
    const HomePageHero = document.querySelector('.HomePageHero');

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

    return (
      <div className="HomePageHero w100 h100">
        <div className="bg-pink w100 flex w100 h100 justify-center items-center p2">

          <div className="bg-cover col-6 flex items-center justify-center h100 p2">
            <div className="col-6">
              <ProductImage
                product={this.props.product}
              ></ProductImage>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default HomePageHero;