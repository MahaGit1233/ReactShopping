import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { cartActions } from './store/redux';

function App() {
  const showCart = useSelector(state => state.cart.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.cart.notification);
  const [initial, setInitial] = useState(true);

  const dispatch = useDispatch();

  const cartWithoutNotification = useMemo(() => ({
    cartItems: cart.cartItems,
    quantity: cart.quantity,
    showCart: cart.showCart,
  }), [cart.cartItems, cart.quantity, cart.showCart]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }

    dispatch(cartActions.showNotification({ status: 'pending', title: 'Sending...', message: 'sending cart data!' }));

    fetch('https://react-expensetracker-f81a3-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cartWithoutNotification),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Sending cart data failed!');
      }
      return res.json();
    }).then(() => {
      dispatch(cartActions.showNotification({ status: 'success', title: 'Success!', message: 'sent cart data successfully!' }));
    }).catch(() => {
      dispatch(cartActions.showNotification({ status: 'error', title: 'Error!', message: 'Sending cart data failed' }));
    });
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
