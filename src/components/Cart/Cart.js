import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (<CartItem
          item={{ title: item.title, quantity: item.quantity, total: item.price * item.quantity, price: item.price }}
        />))}
      </ul>
    </Card>
  );
};

export default Cart;
