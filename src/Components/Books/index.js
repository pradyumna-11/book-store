import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Header from "../Header";
import BookItem from "../BookItem";
import "./index.css";

const booksConstStatus = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Books extends Component {
  state = {
    booksPageStatus: booksConstStatus.loading,
    booksData: [],
    maxPrice: 100.0,
    searchInputBookName: "",
  };

  componentDidMount() {
    this.getBooksData();
  }

  getBooksData = async () => {
    this.setState({ booksPageStatus: booksConstStatus.loading });
    const response = await fetch("https://api.itbook.store/1.0/search/mongodb");

    if (response.ok === true) {
      const booksRetrivedData = await response.json();
      const notParsedBooksDetails = booksRetrivedData.books;
      const parsedBooksData = notParsedBooksDetails.map((each) => ({
        title: each.title,
        subtitle: each.subtitle,
        isbn13: each.isbn13,
        price: each.price,
        image: each.image,
      }));
      this.setState({
        booksPageStatus: booksConstStatus.success,
        booksData: parsedBooksData,
      });
    } else {
      this.setState({ booksPageStatus: booksConstStatus.failure });
    }
  };

  changeFilterPrice = (value) => {
    if (value === 0) {
      this.setState({ maxPrice: 100.0 });
    } else {
      this.setState({ maxPrice: value });
    }
  };

  changeSearchInputValue = (event) => {
    this.setState({ searchInputBookName: event.target.value });
  };

  renderBooksPageLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  );

  renderBooksPageFailure = () => (
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

  renderBooksPageSuccess = () => {
    const { booksData, maxPrice, searchInputBookName } = this.state;

    const filteredBooksData = booksData.filter(
      (eachBook) =>
        parseFloat(eachBook.price.slice(1)) <= maxPrice &&
        eachBook.title.toLowerCase().includes(searchInputBookName.toLowerCase())
    );
    return (
      <ul className="books-items-container">
        {filteredBooksData.map((each) => (
          <BookItem bookItemDetails={each} key={each.isbn13} />
        ))}
      </ul>
    );
  };

  renderBooksPage = () => {
    const { booksPageStatus } = this.state;
    switch (booksPageStatus) {
      case booksConstStatus.loading:
        return this.renderBooksPageLoader();
      case booksConstStatus.success:
        return this.renderBooksPageSuccess();
      case booksConstStatus.failure:
        return this.renderBooksPageFailure();
      default:
        return null;
    }
  };

  render() {
    const { searchInputBookName } = this.state;
    return (
      <>
        <Header />
        <h1 className="books-heading">Books</h1>
        <div className="books-page-bg">
          <div className="price-filter">
            <h1 className="filter-heading">Price filter</h1>
            <div className="price-ranges">
              <p className="price-min">MIN:0$</p>
              <p className="price-max">MAX:100$</p>
            </div>
            <Slider
              min={"$0.0"}
              max={"$100.0"}
              onChange={this.changeFilterPrice}
            />
          </div>
          <div className="books-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search by book name"
                onChange={this.changeSearchInputValue}
                value={searchInputBookName}
              />
            </div>
            {this.renderBooksPage()}
          </div>
        </div>
      </>
    );
  }
}

export default Books;
