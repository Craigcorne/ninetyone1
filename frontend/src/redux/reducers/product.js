import { createReducer } from "@reduxjs/toolkit";
import {
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../actions/product";

const initialState = {
  isLoading: true,
  product: null,
  success: false,
  error: null,
  products: [],
  message: null,
  allProducts: [],
};

const productReducer = createReducer(initialState, {
  // Create product
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get all products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete product of a shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Clear errors
  clearErrors: (state) => {
    state.error = null;
  },

  // Update product
  [UPDATE_PRODUCT_REQUEST]: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  [UPDATE_PRODUCT_SUCCESS]: (state) => {
    state.isLoading = false;
    state.success = true;
  },
  [UPDATE_PRODUCT_FAILURE]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
});

export default productReducer;
