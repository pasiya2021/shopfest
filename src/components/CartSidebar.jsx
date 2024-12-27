import React, { useState } from "react";
import { X, Minus, Plus, ShoppingBag, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, addOrder } from "../redux/action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 py-4 border-b dark:border-gray-700">
      <img
        src={``}
        alt={item?.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-medium dark:text-white">{item?.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">${item?.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-secondary rounded"
            onClick={() =>
              item.quantity > 1
                ? dispatch(updateQuantity(item.id, item.quantity - 1))
                : dispatch(removeFromCart(item.id))
            }
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{item?.quantity}</span>
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-secondary rounded"
            onClick={() =>
              dispatch(updateQuantity(item.id, item.quantity + 1))
            }
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        className="p-1 hover:bg-gray-100 dark:hover:bg-secondary rounded h-fit"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const OrderConfirmation = ({ isOpen, onClose, orderItems, orderTotal }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 w-full max-w-md h-full bg-white dark:bg-secondary-dark shadow-xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold dark:text-white">Order Confirmation</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-secondary rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mb-2" />
            </div>
            <h3 className="text-center text-xl font-semibold mb-4 dark:text-white">
              Order Placed Successfully!
            </h3>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <div>
                    <p className="font-medium dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <span className="font-semibold dark:text-white">Total Amount</span>
                <span className="font-bold text-primary">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t dark:border-gray-700">
            <button 
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleCheckout = () => {
    const newOrder = {
      items: [...cart.items],
      total: cart.total,
      date: new Date()
    };

    
    dispatch(addOrder(newOrder));
    
    setCurrentOrder(newOrder);

   
    cart.items.forEach(item => {
      dispatch(removeFromCart(item.id));
    });

    setShowOrderConfirmation(true);
    onClose();
  };

  const handleCloseOrder = () => {
    setShowOrderConfirmation(false);
    setCurrentOrder(null);
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={onClose}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-md h-full bg-white dark:bg-secondary-dark shadow-xl transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold dark:text-white">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-secondary rounded-full"
              >
                <X className="w-5 h-5 bg-gray-100 " />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 dark:text-white">
              {cart.items.length > 0 ? (
                cart.items.map((item) => <CartItem key={item.id} item={item} />)
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="font-medium dark:text-white">Total</span>
                <span className="font-bold text-primary">
                  ${cart.total.toFixed(2)}
                </span>
              </div>
              <button 
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors"
                onClick={handleCheckout}
                disabled={cart.items.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentOrder && (
        <OrderConfirmation
          isOpen={showOrderConfirmation}
          onClose={handleCloseOrder}
          orderItems={currentOrder.items}
          orderTotal={currentOrder.total}
        />
      )}
    </>
  );
};

export default CartSidebar;