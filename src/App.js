import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { cartActions } from './store/redux';
import { getCartData, sendCartData } from './store/Cart';

function App() {
  const showCart = useSelector(state => state.cart.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.cart.notification);
  const [initial, setInitial] = useState(true);
  // const cartFetched = useRef(false);

  const dispatch = useDispatch();

  const cartWithoutNotification = useMemo(() => ({
    cartItems: cart.cartItems,
    quantity: cart.quantity,
    showCart: cart.showCart,
  }), [cart.cartItems, cart.quantity, cart.showCart]);

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }
    if (cart.cartFetched) {
      dispatch(sendCartData(cartWithoutNotification));
    }
  }, [cartWithoutNotification, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
