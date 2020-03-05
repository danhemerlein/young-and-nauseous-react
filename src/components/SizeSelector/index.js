import React, { Component } from "react";

import "./SizeSelector.scss";

class SizeSelector extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
  }

  change = (event) => {
    this.setState({ value: event.target.value });
    this.props.clickHandler(event.target.value)
  }

  render() {

    console.log(this.props.sizes)

    let sizeListItem;

    sizeListItem = this.props.sizes.map((size, key) => {
      return (
        <option key={key} value={size}>
          {size}
        </option>
      )
    })

    return (
      <select onChange={this.change} value={this.state.value}>
        <option>--Please choose a size--</option>
        {sizeListItem}
      </select>
    );
  }
}

export default SizeSelector;
