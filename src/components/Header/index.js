import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Header.scss'

class Header extends Component {

  render() {
    return (
      <div className="Header">

        <div className="bg-white p1 flex justify-between items-center w100">
          <div className="col-3">
            <Link to="/">
            <img
              className="w100"
              src="https://cdn.shopify.com/s/files/1/0269/5793/8787/files/YN-02-2.png?6"
              alt="The Young & Nauseous logo"
            />
            </Link>
          </div>

            <div className="">
              <button
                className="color-white bg-black"
              >
                Cart
              </button>
            </div>
        </div>

      </div>
    );
  }
}

export default Header;