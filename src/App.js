import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Products from './components/Products/';
import Cart from './components/Cart/';
import HomePageHero from './components/HomePageHero/';
import Header from './components/Header/';
import Footer from './components/Footer/';
import AboutPage from './components/AboutPage/';
import CollectionPage from './components/CollectionPage/';
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
      collections: [],
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
          collections: collections,
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
    const productRoutes = this.state.products.map((product, key) => {
      const handle = `/${product.handle}`
      return (
        <Route
          exact
          path={handle}
          render={() => (
            <div>
              <Header
                checkout={this.state.checkout}
                isCartOpen={this.state.isCartOpen}
                handleCartClose={this.handleCartClose}
                updateQuantityInCart={this.updateQuantityInCart}
                removeLineItemInCart={this.removeLineItemInCart}
              />
              <PDP 
                product={this.state.products[key]}
                addToCart={this.addVariantToCart}
              />
              <Footer />
            </div>
          )}
          />
        )
      });

    const collectionRoutes = this.state.collections.map((collection, key) => {
      const handle = `/${collection.handle}`
      return (
        <Route
          exact
          path={handle}
          render={() => (
            <div>
              <Header
                checkout={this.state.checkout}
                isCartOpen={this.state.isCartOpen}
                handleCartClose={this.handleCartClose}
                updateQuantityInCart={this.updateQuantityInCart}
                removeLineItemInCart={this.removeLineItemInCart}
              />
              <CollectionPage products={this.state.collections[key]} />
              <Footer />
            </div>
          )}
        />
      )
    })

    if (this.state.featuredProduct === undefined || !this.state.collections.length || !this.state.products.length) {
      return "loading..."
    } else {
        return (
          <div className="App">
            <header className="App__header"></header>

            <Router>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <div>
                      <Header 
                        checkout={this.state.checkout}
                        isCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                      />
                      <HomePageHero
                        addVariantToCart={this.addVariantToCart}
                        client={this.props.client}
                        key={this.state.featuredProduct.id}
                        product={this.state.featuredProduct}
                        collections={this.state.collections}
                        addToCart={this.addVariantToCart}
                      />
                      <Footer />
                    </div>
                  )}
                />

                {collectionRoutes}

                {productRoutes}

                <Route
                  exact
                  path="/about"
                  render={() => (
                    <div>
                      <Header
                        checkout={this.state.checkout}
                        isCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                      />
                      <AboutPage />
                      <Footer />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/y&n-tote"
                  render={() => (
                    <div>
                      <Header
                        checkout={this.state.checkout}
                        isCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                      />
                      <PDP product={this.state.featuredProduct} />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/shop-all"
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
                  exact
                  path="/cart"
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