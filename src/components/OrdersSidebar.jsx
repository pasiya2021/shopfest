import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useSelector } from 'react-redux';

const OrdersSidebar = ({ isOpen, onClose }) => {
  const orders = useSelector((state) => state.orders);

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
            <h2 className="text-lg font-semibold dark:text-white">Order History</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-secondary rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 dark:border-gray-700">
                    <div className="flex justify-between mb-2">
                      <span className="dark:text-white">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span className="font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm dark:text-gray-400">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-16 h-16 mb-4" />
                <p>No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersSidebar;