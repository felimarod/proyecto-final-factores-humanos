import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="container py-8">
        <div className="card text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray mb-4">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const productImages = [product.image, ...(product.images || [])];

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
        <button
          className="breadcrumb-item"
          onClick={() => navigate(`/search?category=${product.category}`)}
        >
          {product.category}
        </button>
        <span className="breadcrumb-separator">→</span>
        <span className="breadcrumb-item active">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div 
            className="product-image-main"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-110' : ''}`}
            />
          </div>
          
          {productImages.length > 1 && (
            <div className="flex gap-2 mt-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="chip">{product.brand}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`star ${i < Math.floor(product.rating) ? 'star-filled' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray text-sm ml-2">({product.rating} rating)</span>
            </div>
          </div>

          <div className="product-price text-2xl mb-6">{formatPrice(product.price)}</div>
          
          <p className="text-gray mb-6">{product.description}</p>

          {/* Specifications */}
          {product.specifications && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Specifications</h3>
              <div className="card p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-gray text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock > 0 ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400">In Stock ({product.inStock} available)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center">
              <label className="text-sm font-medium mr-3">Quantity:</label>
              <div className="flex items-center border border-gray-600 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-700 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 bg-gray-800 text-center min-w-[3rem]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                  className="px-3 py-1 hover:bg-gray-700 transition-colors"
                  disabled={quantity >= product.inStock}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.inStock === 0}
              className="btn btn-primary flex-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Add to Cart
            </button>
            <button className="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Features */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>1-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="product-card">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="product-image"
                />
                <div className="product-content">
                  <h3 className="product-title">{relatedProduct.name}</h3>
                  <div className="product-rating">
                    <svg className="star star-filled" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray text-sm ml-1">{relatedProduct.rating}</span>
                  </div>
                  <div className="product-price">{formatPrice(relatedProduct.price)}</div>
                  <button
                    className="btn btn-outline btn-small w-full mt-2"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
