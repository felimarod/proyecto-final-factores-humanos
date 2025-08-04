import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  const featuredProducts = products.slice(0, 4);
  const collections = [
    {
      id: 1,
      title: "Gaming Keyboards",
      description: "High-performance keyboards for competitive gaming",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3",
      category: "gaming"
    },
    {
      id: 2,
      title: "Mechanical Switches",
      description: "Premium switches for the perfect typing experience",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3",
      category: "accessories"
    },
    {
      id: 3,
      title: "Custom Keycaps",
      description: "Personalize your keyboard with artisan keycaps",
      image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3",
      category: "keycaps"
    }
  ];

  return (
    <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Elevate Your Typing Experience</h1>
          <p>Discover premium mechanical keyboards, custom keycaps, and accessories</p>
          <Link to="/search" className="btn btn-primary btn-large">
            Shop Now
          </Link>
        </div>
      </section>

      <div className="container py-8">
        {/* Featured Products */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray">Handpicked keyboards and accessories just for you</p>
            </div>
            <Link to="/search" className="btn btn-outline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-content">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="chip">{product.brand}</span>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">
                    {product.description.length > 80 
                      ? `${product.description.substring(0, 80)}...` 
                      : product.description
                    }
                  </p>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`star ${i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray text-sm ml-2">{product.rating}</span>
                  </div>
                  <div className="product-price">{formatPrice(product.price)}</div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="btn btn-primary btn-small flex-1"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-secondary btn-small"
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
        </section>

        {/* Collections */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-gray">Explore our curated collections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/search?category=${collection.category}`}
                className="card"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${collection.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'white',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
                  <p className="text-sm">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Why Choose KeyboardsCo?</h2>
            <p className="text-gray">We're dedicated to providing the best mechanical keyboard experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3d98f4" strokeWidth="2" className="mx-auto">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray">Only the finest materials and craftsmanship in every product</p>
            </div>
            
            <div className="card text-center">
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3d98f4" strokeWidth="2" className="mx-auto">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray">Quick and secure delivery to get your gear to you fast</p>
            </div>
            
            <div className="card text-center">
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3d98f4" strokeWidth="2" className="mx-auto">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray">Our knowledgeable team is here to help with any questions</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="card text-center">
          <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
          <p className="text-gray mb-6">Get the latest updates on new products, sales, and keyboard tips</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input flex-1"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
