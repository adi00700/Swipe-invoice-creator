
import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [{"productId": 1, "productName":"test","productPrice": 1,"productDescription":"test"}],
  reducers: {
      addProduct: (state, action) => {
        state.push(action.payload);
      },
      deleteProduct: (state, action) => {
        return state.filter((product) => product.id !== action.payload);
      },
      updateProduct: (state, action) => {
        state[action.payload.id - 1] = action.payload.updatedProduct;
      },
  },
  });

  export const { 
    addProduct, 
    deleteProduct, 
    updateProduct, 
  } = productsSlice.actions;

  export const selectProductList = (state) => state.products;

  export default productsSlice.reducer;
