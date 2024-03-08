import { Component } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import CartContext from "../../CartContext";
import "./index.css";
class Payment extends Component {
  state = {
    paymentStatus: false,
    email: "",
    lastName: "",
    firstName: "",
    address: "",
    pinCode: "",
    phoneNumber: "",
    city: "",
    errorMsg: false,
  };

  completePayment = (event) => {
    event.preventDefault();
    const { email, address, firstName, lastName, pinCode, city, phoneNumber } =
      this.state;
    if (
      email !== "" &&
      address !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      pinCode !== "" &&
      city !== "" &&
      phoneNumber !== ""
    ) {
      this.setState((prevState) => ({
        paymentStatus: true,
        errorMsg: false,
      }));
    } else {
      this.setState({ paymentStatus: false, errorMsg: true });
    }
  };

  onchangeEmailInput = (event) => {
    this.setState({ email: event.target.value });
  };
  onchangeFirstNameInput = (event) => {
    this.setState({ firstName: event.target.value });
  };
  onchangeLastNameInput = (event) => {
    this.setState({ lastName: event.target.value });
  };
  onchangeAddressInput = (event) => {
    this.setState({ address: event.target.value });
  };
  onchangeCityInput = (event) => {
    this.setState({ city: event.target.value });
  };
  onchangePinCodeInput = (event) => {
    this.setState({ pinCode: event.target.value });
  };
  onchangePhoneNumberInput = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  render() {
    const { errorMsg, paymentStatus } = this.state;
    return (
      <CartContext.Consumer>
        {(value) => {
          const { cartItems } = value;
          let totalSum = 0.0;
          const getTotalAmount = () => {
            for (let each of cartItems) {
              totalSum =
                totalSum + parseFloat(each.price.slice(1)) * each.quantity;
            }
            return totalSum;
          };
          getTotalAmount();
          return (
            <>
              <Header />
              <div className="payment-page-main-bg">
                {paymentStatus === false ? (
                  <form
                    className="payment-form"
                    onSubmit={this.completePayment}
                  >
                    <h1 className="contact-heading">Contact</h1>
                    <input
                      type="email"
                      className="email-input"
                      placeholder="Email"
                      onChange={this.onchangeEmailInput}
                    />
                    <h1 className="shipping-heading">Shipping</h1>
                    <label className="country-label">Country/Region</label>
                    <p className="country-name">India</p>
                    <div className="names-container">
                      <input
                        type="text"
                        className="first-name-input"
                        placeholder="First Name"
                        onChange={this.onchangeFirstNameInput}
                      />
                      <input
                        type="text"
                        className="last-name-input"
                        placeholder="Last Name"
                        onChange={this.onchangeLastNameInput}
                      />
                    </div>
                    <input
                      type="text"
                      className="address-input"
                      placeholder="Address"
                      onChange={this.onchangeAddressInput}
                    />
                    <div className="location-input-container">
                      <input
                        type="text"
                        className="city-input"
                        placeholder="City"
                        onChange={this.onchangeCityInput}
                      />
                      <label className="country-label">State</label>
                      <select className="state-options">
                        <option className="state-option">Andhra Pradesh</option>
                        <option className="state-option">Telangana</option>
                        <option className="state-option">Tamil Nadu</option>
                        <option className="state-option">Kerala</option>
                        <option className="state-option">Madhya Pradesh</option>
                        <option className="state-option">Maharashtra</option>
                        <option className="state-option">Karnataka</option>
                        <option className="state-option">Odissa</option>
                        <option className="state-option">Rajasthan</option>
                        <option className="state-option">Gujarat</option>
                        <option className="state-option">Jharkhand</option>
                        <option className="state-option">
                          Himachal Pradesh
                        </option>
                      </select>
                      <input
                        type="number"
                        className="pincode-input"
                        placeholder="PIN code"
                        onChange={this.onchangePinCodeInput}
                      />
                      <input
                        type="number"
                        className="number-input"
                        placeholder="Enter your phone number"
                        onChange={this.onchangePhoneNumberInput}
                      />
                      {errorMsg && (
                        <p className="error-msg">
                          *Please Fill all the details
                        </p>
                      )}
                      <button className="payment-button" type="submit">
                        Pay {totalSum}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="payment-success-container">
                    <img
                      src="https://res.cloudinary.com/daxizvsge/image/upload/v1709869636/tick-mark_enl0s6.webp"
                      alt="tick-mark"
                      className="tick-img"
                    />
                    <p className="greet-msg">
                      Your order has been placed.Thank you for shopping.
                    </p>
                    <Link to="/books" className="link-style">
                      <button className="continue-shopping-button">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Payment;
