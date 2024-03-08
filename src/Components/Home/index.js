import Header from "../Header";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => (
  <>
    <Header />
    <div className="home-banner-content">
      <h1 className="home-banner-heading">Books Store</h1>
      <p className="home-banner-para">
        Welcome to our cozy corner of literary delights! Step into our
        book-lined haven and immerse yourself in a world of stories waiting to
        be discovered. From towering shelves filled with classics to the latest
        bestsellers, our bookstore is a treasure trove for avid readers and
        curious minds alike. Browse through the aisles, where each book whispers
        tales of adventure, romance, mystery, and knowledge.
        <br />
        <br />
        Lose yourself in the scent of freshly printed pages and the soft rustle
        of turning paper as you explore our curated collection. Whether you seek
        escapism in fiction, enlightenment in non-fiction, or inspiration in
        poetry, our shelves hold something special for every reader. Our
        knowledgeable staff are here to guide you, offering recommendations and
        sharing their passion for the written word.
      </p>
      <br />
      <Link to="/books" className="link-style">
        <button className="home-banner-button">View Books</button>
      </Link>
    </div>
  </>
);

export default Home;
