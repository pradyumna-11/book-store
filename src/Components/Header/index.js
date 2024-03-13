import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { ImBooks } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import "./index.css";

const Header = () => (
  <nav className="navbar">
    <Link to="/book-store" className="link-style">
      <button className="logo-button">
        <GiBookshelf size={60} color="black" />
        <span className="logo-text">Book Store</span>
      </button>
    </Link>
    <ul className="navbar-items-container">
      <Link to="/books" className="link-style">
        <li className="navbar-item">
          <ImBooks size={35} color="black" />
          <p className="navbar-item-text">Books</p>
        </li>
      </Link>
      <Link to="/cart" className="link-style">
        <li className="navbar-item">
          <FaCartShopping size={35} color="black" />
          <p className="navbar-item-text">Cart</p>
        </li>
      </Link>
    </ul>
  </nav>
);

export default Header;
