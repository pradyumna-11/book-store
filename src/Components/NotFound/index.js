import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/daxizvsge/image/upload/v1709893686/pagenotfound_puca2k.jpg"
      alt="notfound-img"
      className="notfound-img"
    />
    <p className="notfound-text">
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>
    <Link className="/link-style" to="/">
      <button className="go-home-button">Go Home</button>
    </Link>
  </div>
);

export default NotFound;
