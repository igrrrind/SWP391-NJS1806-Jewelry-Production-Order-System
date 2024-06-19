import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { list: [], total: 0 },
    reducers: {
        addToCart(state, action) {
            const index = state.list.findIndex(productStock => productStock.productStockId === action.payload.productStockId);
            if (index !== -1) {
                state.list[index].quantity += action.payload.quantity;
            } else {
                state.list.push(action.payload);
            }

            state.total = state.list.reduce((sum,item) => sum + + item.price * (item?.quantity + 1), 0)


        },
        removeFromCart(state,action){

        }
    }
});

const { actions, reducer } = cartSlice;

export const { addToCart } = actions;

export default reducer;
