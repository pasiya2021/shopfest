import axios from "axios";

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const PLACE_ORDER = 'PLACE_ORDER';
export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5132/api/Products');
    const products = await response.json();
    dispatch({ type: FETCH_PRODUCTS, payload: products });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id: productId, quantity }
});

export const placeOrder = (orderData) => ({
  type: PLACE_ORDER,
  payload: orderData
});

export const addOrder = (orderData) => ({
  type: ADD_ORDER,
  payload: { ...orderData, id: Date.now(), date: new Date() }
});

export const fetchOrders = () => ({
  type: FETCH_ORDERS
});