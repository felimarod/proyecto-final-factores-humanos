import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Options
    saveInfo: false,
    sameAsShipping: true,
    shippingMethod: 'standard',
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
          total: getCartTotal() * 1.08
        }
      });
    }, 2000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-8">
        <div className="card text-center py-8">
          <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
          <p className="text-gray mb-4">Your cart is empty. Add some products first!</p>
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
        <button
          className="breadcrumb-item"
          onClick={() => navigate('/cart')}
        >
          Cart
        </button>
        <span className="breadcrumb-separator">→</span>
        <span className="breadcrumb-item active">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input w-full ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.state ? 'border-red-500' : ''}`}
                  />
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                  />
                  {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="form-input w-full"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-600 rounded cursor-pointer hover:bg-gray-800">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Standard Shipping</div>
                    <div className="text-sm text-gray">5-7 business days</div>
                  </div>
                  <div className="text-green-400 font-medium">Free</div>
                </label>
                <label className="flex items-center p-3 border border-gray-600 rounded cursor-pointer hover:bg-gray-800">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Express Shipping</div>
                    <div className="text-sm text-gray">2-3 business days</div>
                  </div>
                  <div className="font-medium">$9.99</div>
                </label>
                <label className="flex items-center p-3 border border-gray-600 rounded cursor-pointer hover:bg-gray-800">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="overnight"
                    checked={formData.shippingMethod === 'overnight'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Overnight Shipping</div>
                    <div className="text-sm text-gray">Next business day</div>
                  </div>
                  <div className="font-medium">$19.99</div>
                </label>
              </div>
            </div>

            {/* Payment Information */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.cardNumber ? 'border-red-500' : ''}`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`form-input w-full ${errors.expiryDate ? 'border-red-500' : ''}`}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={`form-input w-full ${errors.cvv ? 'border-red-500' : ''}`}
                      placeholder="123"
                    />
                    {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.cardName ? 'border-red-500' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-gray-600 mb-4" />

              {/* Summary Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400">
                    {formData.shippingMethod === 'standard' ? 'Free' : 
                     formData.shippingMethod === 'express' ? '$9.99' : '$19.99'}
                  </span>
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

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn btn-primary w-full"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>

              {/* Security Info */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Secure 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
