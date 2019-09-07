import React, { Component } from 'react';

import FeaturedCollection from '../FeaturedCollection/';

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
    console.log(this.props.collections);

    const heroImage = {
      backgroundImage: "url(https://cdn.shopify.com/s/files/1/0269/5793/8787/files/rockinwithlights_8.png?20)",
      backgroundPosition: "center",
      // backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    };


    return (
      <div className="HomePageHero w100">

        <div style={heroImage} className="HomePageHero__featured-image w100 bg-blue"></div>

        <div className="bg-pink w100 flex flex-col justify-center items-center p2">

          <h2 className="HomePageHero__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
            Young & Nauseous is a lifestyle and apparel brand based in Brooklyn, New York 
          </h2>

          <div className="HomePageHero__featured-collection-container aesthetic-windows-xp-modal">

            <div className="aesthetic-windows-xp-modal-title-bar">

              <div className="aesthetic-windows-xp-modal-title-bar-text">
                C O L L E C T I O N S
              </div>

              <div className="aesthetic-windows-xp-modal-title-bar-controls">

                <div className="aesthetic-windows-xp-button-title-bar">
                  <button>
                    _
                  </button>
                </div>

                <div className="aesthetic-windows-xp-button-title-bar-close">
                  <button>
                    X
                  </button>
                </div>
                
              </div>

            </div>

            <div className="aesthetic-windows-xp-modal-content">

              <div className="bg-blue p4">

                <FeaturedCollection
                  image={this.props.collections.image}
                  title={this.props.collections.title}
                  bg={"https://cdn.shopify.com/s/files/1/0269/5793/8787/files/rockinwithlights_8.png?20"}
                />

                <div className="flex justify-end pt4">

                  <FeaturedCollection
                    image={this.props.collections.image}
                    title={this.props.collections.title}
                    bg={"https://cdn.shopify.com/s/files/1/0269/5793/8787/files/56_rockingwithlights.png?21"}
                    offset={true}
                  />

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageHero;