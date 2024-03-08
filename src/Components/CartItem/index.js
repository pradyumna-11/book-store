import { MdDelete } from "react-icons/md";
import CartContext from "../../CartContext";
import "./index.css";

const CartItem = (props) => {
  const { cartItemDetails } = props;
  const { isbn13, imageUrl, title, price, quantity } = cartItemDetails;
  return (
    <CartContext.Consumer>
      {(value) => {
        const { removeCartItem, updateQuantity } = value;
        const getObj_increment = () => ({
          title,
          price,
          quantity: quantity + 1,
          imageUrl,
          isbn13,
        });
        const getobj_decrement = () => ({
          title,
          price,
          quantity: quantity - 1,
          imageUrl,
          isbn13,
        });
        return (
          <li className="cart-item">
            <img
              src={imageUrl}
              alt="cart-item-img"
              className="cart-item-book-img"
            />
            <div className="cart-item-book-details">
              <h2 className="cart-item-book-name">{title}</h2>
              <p className="cart-item-book-cost">{price}</p>
              <div className="quantity-buttons-container">
                <button
                  className="increase-button"
                  onClick={() => updateQuantity(getObj_increment())}
                >
                  +
                </button>
                <p className="quantity">{quantity}</p>
                <button
                  className="decrease-button"
                  onClick={() => updateQuantity(getobj_decrement())}
                >
                  -
                </button>
              </div>
              <button
                className="delete-button"
                onClick={() => removeCartItem(isbn13)}
              >
                <MdDelete size={25} />
              </button>
            </div>
          </li>
        );
      }}
    </CartContext.Consumer>
  );
};

export default CartItem;
