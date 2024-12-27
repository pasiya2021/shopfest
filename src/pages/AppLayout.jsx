import React, { useState, useEffect, useMemo } from 'react';
import { Sun, Moon, ShoppingCart } from 'lucide-react';

const Snowflake = () => {
  const style = useMemo(() => {
    const size = Math.random() * 5 + 3;
    return {
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: Math.random(),
      width: `${size}px`,
      height: `${size}px`,
    };
  }, []);

  return (
    <div
      className="snowflake fixed rounded-full bg-white pointer-events-none"
      style={style}
    />
  );
};

const AppLayout = ({ children, onCartClick, onOrdersClick }) => {
  const [isDark, setIsDark] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const snowflakes = useMemo(() => Array(50).fill(null), []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200">
     
      {snowflakes.map((_, i) => (
        <Snowflake key={i} />
      ))}

    
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-secondary shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary">ShopFest</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-full transition-colors"
              onClick={onCartClick}
              aria-label="Open cart"
            >
              <ShoppingCart className="h-6 w-6 text-secondary dark:text-white" />
              {cartItemsCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
              {cartItemsCount}
            </span>
              )}
            </button>

            <button
              onClick={onOrdersClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-dark transition-colors"
              aria-label="View orders"
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-1.4 5M17 13l1.4 5M9 21h6M9 21a2 2 0 11-4 0M15 21a2 2 0 104 0"
                  />
                </svg>
            </button>


            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-dark transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
            <Sun className="h-6 w-6 text-white" />
              ) : (
            <Moon className="h-6 w-6 text-secondary" />
              )}
            </button>
          </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
      <div className="pt-16 min-h-screen">{children}</div>

      <style jsx="true">{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .snowflake {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
