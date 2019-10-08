import React, { Component } from "react";

import Marquee from "../Marquee/";

import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="Footer aesthetic-arizona-pink-bg-color">
        <div className="p1 flex justify-between">
          <div className="col-6">
            <div className="aesthetic-windows-95-button my1">
              <button>Collections</button>
            </div>
            <div className="aesthetic-windows-95-button my1">
              <button>About</button>
            </div>
            <div className="aesthetic-windows-95-button my1">
              <button>Meet The Models</button>
            </div>
            <div className="aesthetic-windows-95-button my1">
              <button>Site Map</button>
            </div>
          </div>

          <div className="col-6 flex items-center flex-col">
            <h3 className="my1">Subscribe to the Email List</h3>

            <form action="" className="">
              <input
                className="aesthetic-windows-95-text-input my1"
                type="text"
                defaultValue="c:\aesthetic\src"
              />

              <div className="aesthetic-windows-95-button my1">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <Marquee />
      </div>
    );
  }
}

export default Footer;
