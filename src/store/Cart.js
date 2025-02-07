import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartItems: [], quantity: 0, showCart: false, notification: null };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.title === newItem.title);

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

export default cartSlice;