import { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Books from "./Components/Books";
import BookDetails from "./Components/BookDetails";
import CartContext from "./CartContext";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import NotFound from "./Components/NotFound";

class App extends Component {
  state = { cartItems: [] };

  addCartItem = (obj) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, obj],
    }));
  };

  removeCartItem = (isbn13) => {
    const { cartItems } = this.state;
    const removedItemsList = cartItems.filter(
      (eachItem) => eachItem.isbn13 !== isbn13
    );
    this.setState({ cartItems: [...removedItemsList] });
  };

  updateQuantity = (obj) => {
    this.removeCartItem(obj.isbn13);
    this.addCartItem(obj);
  };

  render() {
    const { cartItems } = this.state;
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          updateQuantity: this.updateQuantity,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:isbn13" component={BookDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/payment" component={Payment} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    );
  }
}

export default App;
