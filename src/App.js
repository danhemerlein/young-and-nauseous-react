import React, { Component } from 'react';
import Products from './components/Products/';
import Product from './components/Product/';
import Cart from './components/Cart/';

import './App.scss'
import './styles/app.scss';
import { loadPartialConfig } from '@babel/core';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
      featuredProductId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM3NTk0NTg0ODQyOTg=",
      featuredProduct: null,
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  componentDidMount() {
    this._asyncRequest = this.props.client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
    }).then(() => {
      this.props.client.product.fetchAll().then((res) => {
        this.setState({
          products: res,
        });
      });
    }).then(() => {
      this.props.client.shop.fetchInfo().then((res) => {
        this.setState({
          shop: res,
        });
      });
    }).then(() => {
      this.props.client.product.fetch(this.state.featuredProductId).then((product) => {
        this.setState({
          featuredProduct: product,
        });
      })
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  addVariantToCart(variantId, quantity) {
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  render() {
    if (this.state.featuredProduct === null) {
      return "loading..."
    } else {
        return (
          <div className="App">
            <header className="App__header">
              
              <div className="bg-black p1 flex justify-between items-center">
                <h1 className="App__headline true-sketch-rg bg-black color-white">{this.state.shop.name}</h1>

                {!this.state.isCartOpen &&
                  <div className="App__view-cart-wrapper">
                    <button className="App__view-cart color-white bg-black" onClick={() => this.setState({ isCartOpen: true })}>Cart</button>
                  </div>
                }
              </div>
              
            </header>

            <Product
              addVariantToCart={this.addVariantToCart}
              client={this.props.client}
              key={this.state.featuredProduct.id}
              product={this.state.featuredProduct}
            />

            <Products
              products={this.state.products}
              client={this.props.client}
              addVariantToCart={this.addVariantToCart}
            />
            
            <Cart
              checkout={this.state.checkout}
              isCartOpen={this.state.isCartOpen}
              handleCartClose={this.handleCartClose}
              updateQuantityInCart={this.updateQuantityInCart}
              removeLineItemInCart={this.removeLineItemInCart}
            />
          </div>
        );
      }
    }
}

export default App;