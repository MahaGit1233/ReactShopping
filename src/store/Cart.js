import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartItems: [], quantity: 0, showCart: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.cartItems.find(item => item.title === action.payload.title);

            if (existingItem) {
                existingItem.quantity = existingItem.quantity + 1;
            }
            else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            state.quantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);

        },
        plus(state,action) {
            const item = state.cartItems.find(item => item.title === action.payload);
            if (item) {
                item.quantity += 1;
                item.total = item.price * item.quantity;
            }
        },
        minus(state,action) {
            const item = state.cartItems.find(item => item.title === action.payload);
            if (item) {
                item.quantity -= 1;
                item.total = item.price * item.quantity;
            }
            if (item.quantity === 0) {
                state.cartItems = [];
            }
        },
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
    },
});

export default cartSlice;