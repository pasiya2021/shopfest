import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/action";
import { fetchProducts } from "../api"; 

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product)); 
    
    const modal = document.createElement('div');
    modal.className = 'fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-secondary p-6 rounded-lg shadow-lg text-center">
      <h2 class="text-xl font-semibold mb-4">${product.name} added to cart!</h2>
      <button class="mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg" id="closeModal">Close</button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('closeModal').onclick = () => {
      document.body.removeChild(modal);
    };
  };

  return (
    <div
      className="relative group bg-white dark:bg-secondary/10 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button className="p-2 bg-white dark:bg-secondary rounded-full shadow-md hover:scale-110 transition-transform">
          <Heart className="w-4 h-4 text-primary" />
        </button>
        <button className="p-2 bg-white dark:bg-secondary rounded-full shadow-md hover:scale-110 transition-transform">
          <Eye className="w-4 h-4 text-primary" />
        </button>
      </div>

      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image || '/api/placeholder/400/320'}
          alt={product.name || 'Product'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
          {product.name || 'Product Name'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {product.description || 'Product description goes here'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-xl">
            ${product.price || '99.99'}
          </span>
          <button
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('Sort by');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'Price: Low to High') return a.price - b.price;
      if (sortOption === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:bg-secondary dark:text-white"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:bg-secondary dark:text-white"
          >
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:bg-secondary dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
