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

            state.total = state.list.reduce((sum,item) => sum + + item.price * (item?.quantity), 0)


        },
        removeFromCart(state, action) {
            const index = state.list.findIndex(productStock => productStock.productStockId === action.payload.productStockId);
            if (index !== -1) {     
                state.list.splice(index, 1);
            }

            // Recalculate the total
            state.total = state.list.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }, 
        updateQuantity(state, action) {
            const index = state.list.findIndex(productStock => productStock.productStockId === action.payload.productStockId);
            if (index !== -1) {
                state.list[index].quantity = action.payload.quantity;
            } 
            state.total = state.list.reduce((sum,item) => sum + + item.price * (item?.quantity), 0)
        }
    }
});

const { actions, reducer } = cartSlice;

export const { addToCart, removeFromCart, updateQuantity } = actions;

export const willExceedStock = (state, productStockId, quantityToAdd, stockQuantity) => {
    const itemInCart = state.cart.list.find(item => item.productStockId === productStockId);
    const currentQuantity = itemInCart ? itemInCart.quantity : 0;
    return (currentQuantity + quantityToAdd) > stockQuantity;
};

export default reducer;