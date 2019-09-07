import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Products from './components/Products/';
import Cart from './components/Cart/';
import HomePageHero from './components/HomePageHero/';
import Header from './components/Header/';
import PDP from './components/PDP/';

import './App.scss'
import './styles/app.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
      featuredProductId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM5OTU3MzUxOTU3NDc=",
      featuredProduct: undefined,
      collections: undefined,
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
    }).then(() => {
      this.props.client.collection.fetchAllWithProducts().then((collections) => {

        // Do something with the collections
        this.setState({
          collections: collections[0],
        });
      });

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
    if (this.state.featuredProduct === undefined || this.state.collections === undefined) {
      return "loading..."
    } else {
        // console.log(this.state);
        return (
          <div className="App">
            <header className="App__header">
              {/* <div className="bg-white p1 flex justify-between items-center w100">
                <div className="col-3">
                    <img
                      className="w100"
                      src="https://cdn.shopify.com/s/files/1/0269/5793/8787/files/YN-02-2.png?6"
                      alt="The Young & Nauseous logo"
                    />
                </div>

                {!this.state.isCartOpen && (
                  <div className="App__view-cart-wrapper">
                    <button
                      className="App__view-cart color-white bg-black"
                      onClick={() =>
                        this.setState({ isCartOpen: true })
                      }
                    >
                      Cart
                    </button>
                  </div>
                )}
              </div> */}
            </header>
            
            <Router>
              <Switch>
                <Route
                 exact path="/"
                  render={() => (
                    <div>
                      <Header 

                        
                      />
                      <HomePageHero
                        addVariantToCart={this.addVariantToCart}
                        client={this.props.client}
                        key={this.state.featuredProduct.id}
                        product={this.state.featuredProduct}
                        collections={this.state.collections}
                        addToCart={this.addVariantToCart}
                      />
                    </div>
                  )}
                />

                <Route
                  exact path="/y&n-tote"
                  render={() => (
                    <div>
                      <Header


                      />
                      <PDP product={this.state.featuredProduct} />

                    </div>
                  )}
                />

                <Route
                  exact path="/shop-all"
                  render={() => (
                    <div>
                      <Products
                        products={this.state.products}
                        client={this.props.client}
                        addVariantToCart={this.addVariantToCart}
                      />
                    </div>
                  )}
                />

                <Route
                  exact path="/cart"
                  render={() => (
                    <Cart
                      checkout={this.state.checkout}
                      isCartOpen={this.state.isCartOpen}
                      handleCartClose={this.handleCartClose}
                      updateQuantityInCart={this.updateQuantityInCart}
                      removeLineItemInCart={this.removeLineItemInCart}
                    />
                  )}
                />

              </Switch>
            </Router>
          </div>
        );
      }
    }
}

export default App;