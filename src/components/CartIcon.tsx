'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';

interface CartIconProps {
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { totalQuantity, totalAmount } = useAppSelector((state) => state.cart);

  // Debug logging
  console.log('CartIcon - Cart State:', { totalQuantity, totalAmount });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <a 
      href="#miniCart" 
      className="minicart-btn toolbar-btn"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <div className="minicart-count_area">
        <span className="item-count">{totalQuantity}</span>
        <i className="ion-bag"></i>
      </div>
      <div className="minicart-front_text">
        <span>Cart:</span>
        <span className="total-price">{formatPrice(totalAmount)}</span>
      </div>
    </a>
  );
};

export default CartIcon; 