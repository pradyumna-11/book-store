import { Link } from "react-router-dom";
import "./index.css";

const BookItem = (props) => {
  const { bookItemDetails } = props;
  const { title, subtitle, isbn13, price, image } = bookItemDetails;
  //console.log(parseFloat(price.slice(1)) <= 20.03);
  return (
    <Link to={`/books/${isbn13}`} className="link-style l">
      <li className="book-item">
        <img src={image} className="book-item-img" alt={title} />
        <h1 className="book-name">{title}</h1>
        <p className="book-subtitle">{subtitle}</p>
        <p className="book-cost-para">
          Price : <span className="book-cost">{price}</span>
        </p>
      </li>
    </Link>
  );
};

export default BookItem;
