import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, PLACE_ORDER, FETCH_PRODUCTS, ADD_ORDER, FETCH_ORDERS } from './action';

const initialCartState = {
  items: [],
  total: 0,
  orders: []
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };

    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };

    case REMOVE_FROM_CART:
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.items.reduce((sum, item) => {
          const quantity = item.id === action.payload.id ? action.payload.quantity : item.quantity;
          return sum + (item.price * quantity);
        }, 0)
      };

    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };

    case FETCH_ORDERS:
      return {
        ...state,
        orders: state.orders
      };

    default:
      return state;
  }
};

export default cartReducer;