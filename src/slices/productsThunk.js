import { createAsyncThunk } from '@reduxjs/toolkit';
import { setProducts } from './productsSlice';

export const fetchProductsForInvoice = createAsyncThunk(
  'products/fetchProductsForInvoice',
  async (invoiceId, thunkAPI) => {
    const response = await fetch(`/api/products?invoiceId=${invoiceId}`);
    const products = await response.json();
    thunkAPI.dispatch(setProducts(products));
  }
);