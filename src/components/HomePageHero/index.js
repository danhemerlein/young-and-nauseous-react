import React, { Component } from 'react';

import FeaturedCollection from '../FeaturedCollection/';
import HomePageContent from '../HomePageContent/';

import './HomePageHero.scss'
import debounce from "../../utils/debounce";

class HomePageHero extends Component {

  setHeightHPH = () => {
    const header = document.querySelector('.Header');
    const HomePageHeroMobile = document.querySelector('.HomePageHero__featured-image--mobile');
    const HomePageHeroDesktop = document.querySelector('.HomePageHero__featured-image--desktop');

    const HPHHeight = (window.innerHeight - header.offsetHeight);

    HomePageHeroMobile.style.height = HPHHeight + "px";
    HomePageHeroDesktop.style.height = HPHHeight + "px";
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

    const heroImageMobile = {
      backgroundImage: "url(https://cdn.shopify.com/s/files/1/0269/5793/8787/files/homepage-hero.jpg?v=1577076174",
      backgroundPosition: "top",
      backgroundSize: 'cover',
      backgroundRepeat: "no-repeat",
      overflow: "hidden"
    };

    const heroImageDesktop = {
      backgroundImage: "url(https://cdn.shopify.com/s/files/1/0269/5793/8787/files/homepage-hero.jpg?v=1577076174",
      backgroundPosition: "25% 30%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflow: "hidden"
    };

    return (
      <div className="HomePageHero w100">
        <div className="p4 block md:none bg-blue">
          <div
            style={heroImageMobile}
            className="HomePageHero__featured-image--mobile w100"
          ></div>
        </div>

        <div className="py4 px8 none md:block bg-blue">
          <div
            style={heroImageDesktop}
            className="HomePageHero__featured-image--desktop w100"
          ></div>
        </div>

        <div className="bg-pink w100 flex flex-col justify-center items-center p2">
          <h2 className="HomePageHero__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
            Young & Nauseous is a lifestyle and apparel brand based in Brooklyn,
            New York
          </h2>

          <div className="HomePageHero__featured-collection-container aesthetic-windows-xp-modal">
            <div className="aesthetic-windows-xp-modal-title-bar">
              <div className="aesthetic-windows-xp-modal-title-bar-text">
                C O L L E C T I O N S
              </div>

              <div className="aesthetic-windows-xp-modal-title-bar-controls">
                <div className="aesthetic-windows-xp-button-title-bar">
                  <button
                    onClick={() => {
                      const id =
                        "HomePageHero-featured-collection-minimize-button";

                      this.props.updateGame(id);

                      if (!this.props.game.includes(id)) {
                        this.props.setScorePreviewMessage(
                          "you clicked a weird - button !"
                        );
                        this.props.setScoreDifference(1);
                        this.props.addPointsToScore(1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>

                <div className="aesthetic-windows-xp-button-title-bar-close">
                  <button
                    onClick={() => {
                      const id =
                        "HomePageHero-featured-collection-close-button";

                      this.props.updateGame(id);

                      if (!this.props.game.includes(id)) {
                        this.props.setScorePreviewMessage(
                          "you clicked a weird x button !"
                        );
                        this.props.setScoreDifference(1);
                        this.props.addPointsToScore(1);
                      }
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>

            <div className="aesthetic-windows-xp-modal-content">
              <div className="bg-blue p4">
                {/* <FeaturedCollection
                  image={this.props.collections[0].image}
                  title={this.props.collections[0].title}
                  linkDestination="totes"
                  bg={
                    "https://cdn.shopify.com/s/files/1/0269/5793/8787/files/rockinwithlights_8.png?20"
                  }
                /> */}

                <div className=" pt4">
                  <FeaturedCollection
                    image={this.props.collections[0].image}
                    title={this.props.collections[0].title}
                    linkDestination="hats"
                    bg={
                      "https://cdn.shopify.com/s/files/1/0269/5793/8787/files/56_rockingwithlights.png?21"
                    }
                  />
                </div>

                <div className="flex justify-end pt4">
                  <FeaturedCollection
                    image={this.props.collections[1].image}
                    title={this.props.collections[1].title}
                    linkDestination="accessories"
                    bg={
                      "https://cdn.shopify.com/s/files/1/0269/5793/8787/files/rockinwithlights_8.png?20"
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="HomePageHero__headline true-sketch-rg  aesthetic-font-modifier-outline-purple text-center py4">
            we never skimp on the gram
          </h2>

          <div className="HomePageHero__featured-collection-container aesthetic-windows-95-modal">
            <div className="aesthetic-windows-95-modal-title-bar">
              <div className="aesthetic-windows-95-modal-title-bar-text">
                Y O U N G & N A U S E O U S
              </div>

              <div className="aesthetic-windows-95-modal-title-bar-controls">
                <div className="aesthetic-windows-95-button-title-bar">
                  <button
                    onClick={() => {
                      const id =
                        "HomePageHero-featured-modal-title-close-button";

                      this.props.updateGame(id);

                      if (!this.props.game.includes(id)) {
                        this.props.setScorePreviewMessage(
                          "you clicked a weird x button !"
                        );
                        this.props.setScoreDifference(1);
                        this.props.addPointsToScore(1);
                      }
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>

            <div className="aesthetic-windows-95-modal-content">
              <div className="bg-blue p4">
                <HomePageContent
                  image={
                    "https://cdn.shopify.com/s/files/1/0269/5793/8787/files/dan-minikit_825527dc-778a-4546-9eca-2bdd64629640.jpg?25"
                  }
                  title="About"
                  bg={
                    "https://cdn.shopify.com/s/files/1/0269/5793/8787/files/55_rockingwithlights.png?25"
                  }
                />

                <div className="flex justify-end pt4">
                  <HomePageContent
                    image={
                      "https://cdn.shopify.com/s/files/1/0269/5793/8787/files/meet-the-models-placeholder.jpg?26"
                    }
                    title="Meet The Models"
                    bg={
                      "https://cdn.shopify.com/s/files/1/0269/5793/8787/files/48_rockingwithlights.png?23"
                    }
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
