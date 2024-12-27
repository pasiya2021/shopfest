import axios from "axios";


const API_BASE_URL = "http://localhost:5132/api/"; 


export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const addToCart = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart`, product);
    return response.data; 
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};


export const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/cart/update-quantity/${cartItemId}`,
      { quantity }
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};


export const removeFromCart = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cart/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};


export const placeOrder = async (orderDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderDetails);
    return response.data; 
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};
