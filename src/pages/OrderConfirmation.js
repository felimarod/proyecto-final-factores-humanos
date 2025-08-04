import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderData = location.state || {
    orderNumber: 'ABC123456',
    total: 0
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray text-lg mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order Details */}
        <div className="card p-6 mb-8 text-left">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray">Order Number:</span>
              <span className="font-medium">{orderData.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Total Amount:</span>
              <span className="font-medium">{formatPrice(orderData.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Order Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card p-6 mb-8 text-left">
          <h2 className="text-xl font-bold mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium">Order Confirmation Email</h3>
                <p className="text-sm text-gray">You'll receive a confirmation email shortly with your order details.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-gray">We'll prepare your order within 1-2 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium">Shipping Updates</h3>
                <p className="text-sm text-gray">You'll receive tracking information once your order ships.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.print()}
            className="btn btn-outline"
          >
            Print Receipt
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-medium mb-2">Need Help?</h3>
          <p className="text-sm text-gray">
            If you have any questions about your order, please contact our support team.
          </p>
          <div className="flex justify-center gap-4 mt-3 text-sm">
            <span className="text-accent">Email: support@keyboardstore.com</span>
            <span className="text-accent">Phone: (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
