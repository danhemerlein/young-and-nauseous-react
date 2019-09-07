import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Header.scss'

class Header extends Component {

  render() {
    return (
      <div className="Header">

        <div className="bg-white  flex justify-between w100">
          <div className="col-3 p1">
            <Link to="/">
            <img
              className="w100"
              src="https://cdn.shopify.com/s/files/1/0269/5793/8787/files/YN-02-2.png?6"
              alt="The Young & Nauseous logo"
            />
            </Link>
          </div>

          <div className="col-9 flex items-end justify-end">

            <div className="aesthetic-windows-95-tabbed-container">

              <div className="aesthetic-windows-95-tabbed-container-tabs">

                <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active">
                  <button>
                    Cart
                  </button>
                </div>

                <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active">
                  <button>
                    About
                  </button>
                </div>

                <div className="aesthetic-windows-95-tabbed-container-tabs-button is-active">
                  <button>
                    Meet The Models
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Header;