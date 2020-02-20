import React, { Component } from "react";

import productColors from "../../utils/productColors";

import "./ColorSwatch.scss";

class ColorSwatch extends Component {

  constructor(props) {
    super(props)

    this.state = {
      color: "",
    }
  }

  componentDidMount() {

    if (this.props.productTitle !== 'Unisex Sweatshirt') {
      for (let color in productColors) {
        var x = this.props.color.toLowerCase().split(' ').join('-').replace('/', '');
        if (color === x) {
          this.setState({
            color: productColors[x],
          })
        }
      }
    } else {
       for (let color in productColors) {
        // refactor this

        var y = this.props.color.toLowerCase().split(' ').join('-').replace('/',
        '').split('--')[0];

        if (color === y) {
          this.setState({
            color: productColors[y],
          })
        }
      }
    }

  }

  render() {
    const color = this.state.color;
    let bgColor;

    if (this.props.active) {
      bgColor = {
        backgroundColor: color,
        boxShadow: `0 0 0 3px white, 0 0 0 5px ${color}`
      };
    } else {
      bgColor = {
        backgroundColor: color,
      };
    }


    return (
      <div
        className="ColorSwatch pointer"
        onClick={() => {this.props.clickHandler(this.props.id)}} style={bgColor}>
      </div>
    );
  }
}

export default ColorSwatch;
