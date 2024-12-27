import React, { useState } from 'react';
import AppLayout from './pages/AppLayout';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import OrdersSidebar from './components/OrdersSidebar';
import Footer from './components/Footer';

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (cartOpen) setCartOpen(false);
      if (ordersOpen) setOrdersOpen(false);
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0" role="main">
      <AppLayout 
        onCartClick={() => setCartOpen(true)}
        onOrdersClick={() => setOrdersOpen(true)}
      >
        <ProductGrid />
        <CartSidebar 
          isOpen={cartOpen} 
          onClose={() => setCartOpen(false)} 
        />
        <OrdersSidebar
          isOpen={ordersOpen}
          onClose={() => setOrdersOpen(false)}
        />
        <Footer />
      </AppLayout>
    </div>
  );
};

export default App;