import { createSlice } from "@reduxjs/toolkit";
import { cartActions } from "./redux";

const initialCartState = { cartItems: [], quantity: 0, showCart: false, notification: null, cartFetched: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceCart(state, action) {
            state.cartItems = action.payload;
            state.quantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.title === newItem.title);
            state.cartFetched = true;
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total = existingItem.price * existingItem.quantity;
            }
            else {
                state.cartItems.push({
                    title: newItem.title,
                    description: newItem.description,
                    price: newItem.price,
                    quantity: 1,
                    total: newItem.price,
                });
            }
            state.quantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);

        },
        plus(state, action) {
            const item = state.cartItems.find(item => item.title === action.payload);
            if (item) {
                item.quantity += 1;
                item.total = item.price * item.quantity;
            }
        },
        minus(state, action) {
            const item = state.cartItems.find(item => item.title === action.payload);
            state.cartFetched = true;
            if (item) {
                item.quantity -= 1;
                item.total = item.price * item.quantity;
            }
            if (item.quantity === 0) {
                state.cartItems = state.cartItems.filter(cartItem => cartItem.title !== action.payload);
            }
        },
        showNotification(state, action) {
            state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message };
        },
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
    },
});

export const sendCartData = (cartData) => {
    console.log(cartData);
    return (dispatch) => {
        dispatch(cartActions.showNotification({ status: 'pending', title: 'Sending...', message: 'Sending cart data!' }));
        const sendRequest = () => {
            fetch('https://react-expensetracker-f81a3-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cartData),
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Sending cart data failed!');
                }
                return res.json();
            }).then((data) => {
                console.log(data);
                dispatch(cartActions.showNotification({ status: 'success', title: 'Success!', message: 'Sent cart data successfully!' }));
            }).catch(() => {
                dispatch(cartActions.showNotification({ status: 'error', title: 'Error!', message: 'Sending cart data failed' }));
            });
        }
        sendRequest();
    };
};

export const getCartData = () => {
    return (dispatch) => {
        dispatch(cartActions.showNotification({ status: 'pending', title: 'Fetching...', message: 'Fetching cart data!' }));
        const getRequest = () => {
            fetch('https://react-expensetracker-f81a3-default-rtdb.firebaseio.com/cart.json', {
                method: 'GET',
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Fetching cart data failed!');
                }
                return res.json();
            }).then((data) => {
                console.log(data);
                if (data.cartItems) {
                    dispatch(cartActions.replaceCart(data.cartItems));
                }
                dispatch(cartActions.showNotification({ status: 'success', title: 'Success!', message: 'Fetched cart data successfully!' }));
            }).catch(() => {
                dispatch(cartActions.showNotification({ status: 'error', title: 'Error!', message: 'Fetching cart data failed' }));
            });
        }
        getRequest();
    };
}

export default cartSlice;