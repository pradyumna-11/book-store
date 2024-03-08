import { Component } from "react";
import Header from "../Header";
import CartItem from "../CartItem";
import CartContext from "../../CartContext";
import { Link } from "react-router-dom";
import "./index.css";

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { cartItems } = value;
          let sum = 0.0;
          const getTotalAmount = () => {
            for (let each of cartItems) {
              sum = sum + parseFloat(each.price.slice(1)) * each.quantity;
            }
            return sum;
          };
          getTotalAmount();
          return (
            <>
              <Header />
              <h1 className="my-bag-heading">My Bag</h1>
              <div className="my-cart-main-bg">
                {cartItems.length === 0 ? (
                  <div className="no-items-container">
                    <img
                      src="https://res.cloudinary.com/daxizvsge/image/upload/v1709824530/no-items_m5shzi.png"
                      alt="no-item"
                      className="no-items-img"
                    />
                    <Link to="/books" className="link-style">
                      <button className="continue-shopping-button">
                        Continue shopping
                      </button>
                    </Link>
                  </div>
                ) : (
                  <ul className="cart-items-container">
                    {cartItems.map((each) => (
                      <CartItem cartItemDetails={each} key={each.isbn13} />
                    ))}
                  </ul>
                )}
                <div className="checkout-container">
                  <h2 className="order-summary-heading">Order Summary</h2>
                  <hr className="line" />
                  <p className="amount-payable-text">
                    Amount Payable: <span className="total-amount">{sum}</span>
                  </p>
                  <p className="you-save-para">
                    You Save: <span className="you-save-amount">0/-</span>
                  </p>
                  <hr className="line" />
                  <Link className="link-style" to="/payment">
                    <button className="proceed-to-checkout-button">
                      Proceed to checkout
                    </button>
                  </Link>
                </div>
              </div>
            </>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Cart;
