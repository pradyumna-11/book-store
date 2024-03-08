import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import Header from "../Header";
import CartContext from "../../CartContext";
import "./index.css";

const spcificBookDetailsConstStatus = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class BookDetails extends Component {
  state = {
    bookSpecificDetails: {},
    specificBookDetailsPageStatus: spcificBookDetailsConstStatus.loading,
    quantity: 1,
  };

  componentDidMount() {
    this.getSpecificBookDetails();
  }

  getSpecificBookDetails = async () => {
    this.setState({
      specificBookDetailsPageStatus: spcificBookDetailsConstStatus.loading,
    });
    const { match } = this.props;
    const { params } = match;
    const { isbn13 } = params;
    const options = {
      method: "GET",
    };
    const response = await fetch(
      `https://api.itbook.store/1.0/books/${isbn13}`,
      options
    );

    if (response.ok === true) {
      const bookItemDetails = await response.json();
      const parsedData = {
        title: bookItemDetails.title,
        subtitle: bookItemDetails.subtitle,
        authors: bookItemDetails.authors,
        desc: bookItemDetails.desc,
        imageUrl: bookItemDetails.image,
        isbn13: bookItemDetails.isbn13,
        language: bookItemDetails.language,
        price: bookItemDetails.price,
        publisher: bookItemDetails.publisher,
        rating: bookItemDetails.rating,
        publishedYear: bookItemDetails.year,
        pages: bookItemDetails.pages,
      };
      this.setState({
        bookSpecificDetails: parsedData,
        specificBookDetailsPageStatus: spcificBookDetailsConstStatus.success,
      });
    } else {
      this.setState({
        specificBookDetailsPageStatus: spcificBookDetailsConstStatus.failure,
      });
    }
  };

  increaseQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  decreaseQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  };
  renderSpecificBookPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  );

  renderSpecificBookPageFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1705590349/erroring_1_pn7sxb.png"
        alt="failure-img"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong,Please try again.</p>
      <button className="retry-books-button" onClick={this.getBooksData()}>
        Retry
      </button>
    </div>
  );

  renderSpecificBookPageSuccess = (addCartItem, cartItems) => {
    const { bookSpecificDetails, quantity } = this.state;
    const {
      title,
      subtitle,
      publishedYear,
      price,
      imageUrl,
      isbn13,
      rating,
      desc,
      authors,
    } = bookSpecificDetails;
    const insertItem = () => {
      const newObj = {
        title,
        imageUrl,
        price,
        quantity,
        isbn13,
      };
      addCartItem(newObj);
    };
    let index = 0;
    const length = cartItems.length;
    if (length !== 0) {
      for (let i = 0; i < length; i++) {
        if (cartItems[i].isbn13 === isbn13) {
          index = 1;
        }
      }
    }

    const addToCartButton =
      index === 0 ? (
        <button className="add-to-bag-button" onClick={insertItem}>
          Add to bag
        </button>
      ) : (
        <p className="add-to-bag-button bag-para">Added to bag</p>
      );
    return (
      <>
        <img src={imageUrl} alt="book-item-img" className="book-details-img" />
        <div className="specific-book-details-container">
          <h1 className="selected-title">{title}</h1>
          <h3 className="selected-subtitle">{subtitle}</h3>
          <p className="selected-price">
            Price : <span className="selected-price-amount">{price}</span>
          </p>
          <p className="selected-published-year">
            Published Year :{" "}
            <span className="selected-year">{publishedYear}</span>
          </p>
          <p className="authors">Authors : {authors}</p>
          <p className="selected-rating">Rating : {rating}</p>
          <p className="description">{desc}</p>
          <div className="quantity-buttons-container">
            <button className="increase-button" onClick={this.increaseQuantity}>
              +
            </button>
            <p className="quantity">{quantity}</p>
            <button className="decrease-button" onClick={this.decreaseQuantity}>
              -
            </button>
          </div>
          {addToCartButton}
        </div>
      </>
    );
  };

  renderSpcificBookDetailsPage = (addCartItem, cartItems) => {
    const { specificBookDetailsPageStatus } = this.state;
    switch (specificBookDetailsPageStatus) {
      case spcificBookDetailsConstStatus.loading:
        return this.renderSpecificBookPageLoader();
      case spcificBookDetailsConstStatus.success:
        return this.renderSpecificBookPageSuccess(addCartItem, cartItems);
      case spcificBookDetailsConstStatus.failure:
        return this.renderSpecificBookPageFailure();
      default:
        return null;
    }
  };

  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { addCartItem, cartItems } = value;

          return (
            <>
              <Header />
              <div className="book-details-main-bg">
                {this.renderSpcificBookDetailsPage(addCartItem, cartItems)}
              </div>
            </>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default BookDetails;
