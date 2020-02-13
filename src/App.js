import React, { Component }                       from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cart                                       from './components/Cart/';
import HomePageHero                               from './components/HomePageHero/';
import Header                                     from './components/Header/';
import Footer                                     from './components/Footer/';
import AboutPage                                  from './components/Pages/AboutPage';
import CollectionPage                             from './components/CollectionPage/';
import PDP                                        from './components/PDP/';
import Collections                                from './components/Collections/';
import MeetTheModels                              from './components/Pages/MeetTheModels';
import SiteMap                                    from './components/Pages/SiteMap';
import NoMatch                                    from './components/Pages/NoMatch';

import './App.scss'
import './styles/app.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen:           false,
      isScorePreviewOpen:   false,
      isScoreWarningOpen:   false,
      checkout:             { lineItems: [] },
      products:             [],
      shop:                 {},
      // featuredProductId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM5OTU3MzUxOTU3NDc=",
      featuredProduct:      undefined,
      collections:          [],
      score:                0,
      scoreMax:             100,
      scoreDifference:      0,
      scorePreviewMessage:  null,
      game:                 [],
      gameComplete:         false,
      isMobileNavOpen:      false,
    };

    this.handleCartClose              = this.handleCartClose.bind(this);
    this.addVariantToCart             = this.addVariantToCart.bind(this);
    this.updateQuantityInCart         = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart         = this.removeLineItemInCart.bind(this);
    this.addPointsToScore             = this.addPointsToScore.bind(this);
    this.setScoreDifference           = this.setScoreDifference.bind(this);
    this.handleScorePreviewClose      = this.handleScorePreviewClose.bind(this);
    this.setScorePreviewMessage       = this.setScorePreviewMessage.bind(this);
    this.updateGame                   = this.updateGame.bind(this);
    this.openScoreWarning             = this.openScoreWarning.bind(this);
    this.handleScoreWarningClose      = this.handleScoreWarningClose.bind(this);
    this.toggleMobileNav              = this.toggleMobileNav.bind(this);
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
      // this.props.client.product.fetch(this.state.featuredProductId).then((product) => {
      //   this.setState({
      //     featuredProduct: product,
      //   });
      // })
    }).then(() => {
      this.props.client.collection.fetchAllWithProducts().then((collections) => {

        const filteredCollections = collections.filter(collection => {
          return collection.handle !== 'secret-gift';
        })

        // Do something with the collections
        this.setState({
          collections: filteredCollections,
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

    setTimeout(() => {
      this.setState({
        isCartOpen: false,
      })
    }, 5000);

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

  updateGame(id) {
    if(!this.state.game.includes(id)) {
      this.setState({
        game: this.state.game.concat(id),
      })
    } else {
      this.openScoreWarning();
    }
  }

  setScoreDifference(n) {
    this.setState({
      scoreDifference: this.state.scoreDifference + n,
    })
  }

  addPointsToScore(n) {
    this.setState({
      score: this.state.score + n,
      isScorePreviewOpen: true,
    });
  }

  setScorePreviewMessage(s) {
    this.setState({
      scorePreviewMessage: s,
    })
  }

  handleScorePreviewClose() {
    this.setState({
      isScorePreviewOpen: false
    });
  }

  openScoreWarning() {

    this.setState({
      isScoreWarningOpen: true,
    });

    setTimeout(() => {
      this.setState({
        isScoreWarningOpen: false,
      })

    }, 5000);

  }

  handleScoreWarningClose() {
    this.setState({
      isScoreWarningOpen: false
    });
  }

  toggleMobileNav() {
    this.setState({
      isMobileNavOpen: !this.state.isMobileNavOpen,
    });

    console.log(this.state.isMobileNavOpen);
  }



  render() {
      const productRoutes = this.state.products.map((product, key) => {
      const handle = `/${product.handle}`;
      if (product.handle !== 'secret-gift' ) {
        return (
          <Route
            key={key}
            exact
            path={handle}
            render={() => (
              <div>
                <Header
                  checkout={this.state.checkout}
                  isMiniCartOpen={this.state.isCartOpen}
                  handleCartClose={this.handleCartClose}
                  updateQuantityInCart={this.updateQuantityInCart}
                  removeLineItemInCart={this.removeLineItemInCart}
                  cartQty={this.state.checkout.lineItems.length}
                  isScorePreviewOpen={this.state.isScorePreviewOpen}
                  handleScorePreviewClose={this.handleScorePreviewClose}
                  isScoreWarningOpen={this.state.isScoreWarningOpen}
                  handleScoreWarningClose={this.handleScoreWarningClose}
                  score={this.state.score}
                  scoreMax={this.state.scoreMax}
                  scoreDifference={
                    this.state.scoreMax - this.state.scoreDifference
                  }
                  scorePreviewMessage={this.state.scorePreviewMessage}
                  setScorePreviewMessage={this.setScorePreviewMessage}
                  addPointsToScore={this.addPointsToScore}
                  setScoreDifference={this.setScoreDifference}
                  updateGame={this.updateGame}
                  game={this.state.game}
                  isMobileNavOpen={this.state.isMobileNavOpen}
                  toggleMobileNav={this.toggleMobileNav}
                />
                <PDP
                  product={this.state.products[key]}
                  addToCart={this.addVariantToCart}
                  setScorePreviewMessage={this.setScorePreviewMessage}
                  addPointsToScore={this.addPointsToScore}
                  setScoreDifference={this.setScoreDifference}
                  updateGame={this.updateGame}
                  game={this.state.game}
                />
                <Footer
                  setScorePreviewMessage={this.setScorePreviewMessage}
                  addPointsToScore={this.addPointsToScore}
                  setScoreDifference={this.setScoreDifference}
                  updateGame={this.updateGame}
                  game={this.state.game}
                />
              </div>
            )}
          />
        );
        }
      });

    const collectionRoutes = this.state.collections.map((collection, key) => {
      const handle = `/${collection.handle}`
      return (
        <Route
          key={key}
          exact
          path={handle}
          render={() => (
            <div>
              <Header
                checkout={this.state.checkout}
                isMiniCartOpen={this.state.isCartOpen}
                handleCartClose={this.handleCartClose}
                updateQuantityInCart={this.updateQuantityInCart}
                removeLineItemInCart={this.removeLineItemInCart}
                cartQty={this.state.checkout.lineItems.length}
                isScorePreviewOpen={this.state.isScorePreviewOpen}
                handleScorePreviewClose={this.handleScorePreviewClose}
                isScoreWarningOpen={this.state.isScoreWarningOpen}
                handleScoreWarningClose={this.handleScoreWarningClose}
                score={this.state.score}
                scoreMax={this.state.scoreMax}
                scoreDifference={
                  this.state.scoreMax - this.state.scoreDifference
                }
                scorePreviewMessage={this.state.scorePreviewMessage}
                setScorePreviewMessage={this.setScorePreviewMessage}
                addPointsToScore={this.addPointsToScore}
                setScoreDifference={this.setScoreDifference}
                updateGame={this.updateGame}
                game={this.state.game}
                isMobileNavOpen={this.state.isMobileNavOpen}
                toggleMobileNav={this.toggleMobileNav}
              />
              <CollectionPage
                products={this.state.collections[key]}
                collectionHandle={collection.handle}
              />
              <Footer
                setScorePreviewMessage={this.setScorePreviewMessage}
                addPointsToScore={this.addPointsToScore}
                setScoreDifference={this.setScoreDifference}
                updateGame={this.updateGame}
                game={this.state.game}
              />
            </div>
          )}
        />
      );
    })

    if (!this.state.collections.length || !this.state.products.length) {

      const loadingStyle = {
        height: '100vh',
      };

      return (

        <div className="play-fair color-pink bg-blue flex justify-center items-center" style={loadingStyle}>
          loading...
        </div>

      )

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
                        isMiniCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                        cartQty={this.state.checkout.lineItems.length}
                        isScorePreviewOpen={this.state.isScorePreviewOpen}
                        handleScorePreviewClose={this.handleScorePreviewClose}
                        isScoreWarningOpen={this.state.isScoreWarningOpen}
                        handleScoreWarningClose={this.handleScoreWarningClose}
                        score={this.state.score}
                        scoreMax={this.state.scoreMax}
                        scoreDifference={
                          this.state.scoreMax - this.state.scoreDifference
                        }
                        scorePreviewMessage={this.state.scorePreviewMessage}
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                        isMobileNavOpen={this.state.isMobileNavOpen}
                        toggleMobileNav={this.toggleMobileNav}
                      />
                      <HomePageHero
                        addVariantToCart={this.addVariantToCart}
                        client={this.props.client}
                        // key={this.state.featuredProduct.id}
                        product={this.state.featuredProduct}
                        collections={this.state.collections}
                        addToCart={this.addVariantToCart}
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                      <Footer
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
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
                        isMiniCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                        cartQty={this.state.checkout.lineItems.length}
                        isScorePreviewOpen={this.state.isScorePreviewOpen}
                        handleScorePreviewClose={this.handleScorePreviewClose}
                        isScoreWarningOpen={this.state.isScoreWarningOpen}
                        handleScoreWarningClose={this.handleScoreWarningClose}
                        score={this.state.score}
                        scoreMax={this.state.scoreMax}
                        scoreDifference={
                          this.state.scoreMax - this.state.scoreDifference
                        }
                        scorePreviewMessage={this.state.scorePreviewMessage}
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                      <AboutPage />
                      <Footer
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/collections"
                  render={() => (
                    <div>
                      <Header
                        checkout={this.state.checkout}
                        isMiniCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                        isScorePreviewOpen={this.state.isScorePreviewOpen}
                        handleScorePreviewClose={this.handleScorePreviewClose}
                        isScoreWarningOpen={this.state.isScoreWarningOpen}
                        handleScoreWarningClose={this.handleScoreWarningClose}
                        score={this.state.score}
                        scoreMax={this.state.scoreMax}
                        scoreDifference={
                          this.state.scoreMax - this.state.scoreDifference
                        }
                        scorePreviewMessage={this.state.scorePreviewMessage}
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                      <Collections collections={this.state.collections} />
                      <Footer
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/meet-the-models"
                  render={() => (
                    <div>
                      <Header
                        checkout={this.state.checkout}
                        isMiniCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                        isScorePreviewOpen={this.state.isScorePreviewOpen}
                        handleScorePreviewClose={this.handleScorePreviewClose}
                        isScoreWarningOpen={this.state.isScoreWarningOpen}
                        handleScoreWarningClose={this.handleScoreWarningClose}
                        score={this.state.score}
                        scoreMax={this.state.scoreMax}
                        scoreDifference={
                          this.state.scoreMax - this.state.scoreDifference
                        }
                        scorePreviewMessage={this.state.scorePreviewMessage}
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                      <MeetTheModels />
                      <Footer
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/site-map"
                  render={() => (
                    <div>
                      <Header
                        checkout={this.state.checkout}
                        isMiniCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                        isScorePreviewOpen={this.state.isScorePreviewOpen}
                        handleScorePreviewClose={this.handleScorePreviewClose}
                        isScoreWarningOpen={this.state.isScoreWarningOpen}
                        handleScoreWarningClose={this.handleScoreWarningClose}
                        score={this.state.score}
                        scoreMax={this.state.scoreMax}
                        scoreDifference={
                          this.state.scoreMax - this.state.scoreDifference
                        }
                        scorePreviewMessage={this.state.scorePreviewMessage}
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                      <SiteMap />
                      <Footer
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/bag"
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

                <Route
                  render={() => (
                    <div>
                      <Header
                        checkout={this.state.checkout}
                        isMiniCartOpen={this.state.isCartOpen}
                        handleCartClose={this.handleCartClose}
                        updateQuantityInCart={this.updateQuantityInCart}
                        removeLineItemInCart={this.removeLineItemInCart}
                        isScorePreviewOpen={this.state.isScorePreviewOpen}
                        handleScorePreviewClose={this.handleScorePreviewClose}
                        isScoreWarningOpen={this.state.isScoreWarningOpen}
                        handleScoreWarningClose={this.handleScoreWarningClose}
                        score={this.state.score}
                        scoreMax={this.state.scoreMax}
                        scoreDifference={
                          this.state.scoreMax - this.state.scoreDifference
                        }
                        scorePreviewMessage={this.state.scorePreviewMessage}
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />

                      <NoMatch />
                      <Footer
                        setScorePreviewMessage={this.setScorePreviewMessage}
                        addPointsToScore={this.addPointsToScore}
                        setScoreDifference={this.setScoreDifference}
                        updateGame={this.updateGame}
                        game={this.state.game}
                      />
                    </div>
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
