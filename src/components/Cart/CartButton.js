import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../store/redux';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector(state =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  const showCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
