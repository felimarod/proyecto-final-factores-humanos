import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, searchProducts, getProductsByCategory } from '../data/products';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedFilters, setSelectedFilters] = useState({
    layout: [],
    switchType: [],
    material: [],
  });
  const productsPerPage = 9;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const category = params.get('category') || 'all';
    
    setSearchTerm(query);
    setSelectedCategory(category);
    setCurrentPage(1);
  }, [location.search]);

  useEffect(() => {
    let results = [];
    
    if (searchTerm) {
      results = searchProducts(searchTerm);
    } else if (selectedCategory !== 'all') {
      results = getProductsByCategory(selectedCategory);
    } else {
      results = [...products];
    }

    // Apply price filter
    results = results.filter(product => {
      const usdPrice = product.price / 1000;
      return usdPrice >= priceRange[0] && usdPrice <= priceRange[1];
    });

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, sortBy, priceRange, selectedFilters]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      navigate('/search');
    } else {
      navigate(`/search?category=${category}`);
    }
  };

  const handleFilterToggle = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const filterChips = [
    { category: 'main', items: ['Keyboards', 'Keycaps', 'Switches', 'Accessories', 'DIY Kits'] },
    { category: 'layout', items: ['60%', '75%', 'Full-size', 'TKL'] },
    { category: 'switchType', items: ['Linear', 'Tactile', 'Clicky'] },
    { category: 'material', items: ['ABS', 'PBT', 'Metal'] },
  ];

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <button
          className="breadcrumb-item"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <span className="breadcrumb-separator">→</span>
        <span className="breadcrumb-item active">Search</span>
      </nav>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="search-container">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: '#9cabba' }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        
        {/* Category Filters */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {filterChips[0].items.map((item) => (
              <button
                key={item}
                onClick={() => {
                  const categoryMap = {
                    'Keyboards': 'mechanical',
                    'Keycaps': 'keycaps',
                    'Switches': 'accessories',
                    'Accessories': 'accessories',
                    'DIY Kits': 'mechanical'
                  };
                  const category = categoryMap[item] || 'all';
                  handleCategoryChange(category);
                }}
                className="chip"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <span className="text-gray text-sm">${priceRange[0]} - ${priceRange[1]}</span>
          </div>
        </div>

        {/* Layout Filters */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Layout</h3>
          <div className="flex gap-2 flex-wrap">
            {filterChips[1].items.map((item) => (
              <button
                key={item}
                onClick={() => handleFilterToggle('layout', item)}
                className={`chip ${selectedFilters.layout.includes(item) ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Products</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-input"
          style={{ width: '200px' }}
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <h3 className="text-lg text-white">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </h3>
        {searchTerm && (
          <p className="text-gray">Results for: "{searchTerm}"</p>
        )}
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-content">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">
                    {product.description.length > 100 
                      ? `${product.description.substring(0, 100)}...` 
                      : product.description
                    }
                  </p>
                  <div className="product-rating">
                    <svg className="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray text-sm ml-1">
                      {product.rating} ({product.inStock} available)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="chip">{product.brand}</span>
                  </div>
                  <div className="product-price">{formatPrice(product.price)}</div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="btn btn-outline btn-small flex-1"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => addToCart(product)}
                      disabled={product.inStock === 0}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-small ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="card text-center py-8">
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-gray mb-4">No products found matching your criteria.</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary"
          >
            Go back home
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
