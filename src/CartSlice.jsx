import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload
      const exisstingItem = state.items.find(item => item.name === name)  
      if(exisstingItem){
        exisstingItem.quantity++
      }
      else{
        state.items.push({ name, image, cost, quantity: 1 })
      }
      state.totalQuantity ++;
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.name === action.payload.name);
      if (itemToRemove){
        state.totalQuantity -= itemToRemove.quantity;
      }
      state.items = state.items.filter(item => item.name !== action.payload.name)

    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        const oldQuantity = item.quantity;
        item.quantity = action.payload.quantity;
        state.totalQuantity += item.quantity - oldQuantity;  
      }
  },
},
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
