import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
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
          <span className="breadcrumb-item active">Cart</span>
        </nav>

        <div className="card text-center py-8">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="mx-auto mb-4 text-gray"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray mb-6">Add some products to get started!</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

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
        <span className="breadcrumb-item active">Cart</span>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="btn btn-outline btn-small"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="card p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  
                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <span className="chip">{item.brand}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-600 rounded">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-700 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-gray-800 text-center min-w-[3rem]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-700 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        <div className="text-sm text-gray">
                          {formatPrice(item.price)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            {/* Summary Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(getCartTotal() * 0.08)}</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(getCartTotal() * 1.08)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="form-input flex-1"
                />
                <button className="btn btn-outline btn-small">Apply</button>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline w-full mt-3"
            >
              Continue Shopping
            </button>

            {/* Security Info */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="text-center py-8 text-gray">
          <p>Product recommendations will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
