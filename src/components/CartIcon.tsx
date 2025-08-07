'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';

const CartIcon = () => {
  const { totalQuantity } = useAppSelector((state: any) => state.cart);

  return (
    <div className="cart-icon">
      <i className="ion-bag"></i>
      {totalQuantity > 0 && (
        <span className="cart-count">{totalQuantity}</span>
      )}
    </div>
  );
};

export default CartIcon; 