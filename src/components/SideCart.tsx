'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, closeCart } from '@/store/slices/cartSlice';

interface SideCartProps {
  onClose?: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  const { items, totalQuantity, totalAmount } = useAppSelector((state) => state.cart);
  const t = useTranslations('cart');
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };

  // Debug logging
  console.log('SideCart - Cart State:', { items, totalQuantity, totalAmount });

  const formatPrice = (price: number | { $numberDouble: string }) => {
    let numericPrice: number;
    if (typeof price === 'number') {
      numericPrice = price;
    } else {
      numericPrice = parseFloat(price.$numberDouble);
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  const getNumericValue = (value: number | { $numberDouble: string }): number => {
    if (typeof value === 'number') {
      return value;
    } else if ('$numberDouble' in value) {
      return parseFloat(value.$numberDouble);
    }
    return 0;
  };

  const getEffectivePrice = (item: { salePrice?: number | { $numberDouble: string }; price: number | { $numberDouble: string } }): number => {
    if (item.salePrice && getNumericValue(item.salePrice) < getNumericValue(item.price)) {
      return getNumericValue(item.salePrice);
    }
    return getNumericValue(item.price);
  };

  const handleRemoveItem = (id: string) => {
    console.log('Removing item with ID:', id);
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    console.log('Updating quantity for ID:', id, 'to:', newQuantity);
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
    onClose?.();
  };

  return (
    <div className="offcanvas-minicart_wrapper" id="miniCart">
      <div className="offcanvas-menu-inner">
        <button 
          className="btn-close" 
          type="button"
          onClick={handleCloseCart}
        >
          <i className="ion-android-close"></i>
        </button>
        <div className="minicart-content">
          <div className="minicart-heading">
            <h4>{t('title')} ({totalQuantity} items)</h4>
          </div>
          <ul className="minicart-list">
            {items.length === 0 ? (
              <li className="minicart-product">
                <div className="product-item_content">
                  <span className="product-item_title">{t('empty')}</span>
                </div>
              </li>
            ) : (
              items.map((item) => (
                <li key={item._id} className="minicart-product">
                  <button 
                    className="product-item_remove" 
                    type="button"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <i className="ion-android-close"></i>
                  </button>
                  <div className="product-item_img">
                    <Image
                      src={item.images[0] || "/assets/images/product/small-size/1.jpg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      style={{ objectFit: 'contain', padding: '5px' }}
                    />
                  </div>
                  <div className="product-item_content">
                    <Link className="product-item_title" href={createLocaleUrl(`/product/${item._id}`)}>
                      {item.name}
                    </Link>
                    <span className="product-item_quantity">
                      {item.quantity} x {formatPrice(getEffectivePrice(item))}
                    </span>
                    <div style={{display:"none"}} className="minicart-quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                        className="quantity-btn minus"
                        type="button"
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="quantity-btn plus"
                        type="button"
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        {items.length > 0 && (
          <>
            <div className="minicart-item_total">
              <span>{t('subtotal')}</span>
              <span className="ammount">{formatPrice(totalAmount)}</span>
            </div>
            <div className="minicart-btn_area">
              <button 
                className="uren-btn close-cart uren-btn_dark uren-btn_fullwidth"
                onClick={() => {
                  handleCloseCart();
                  router.push(createLocaleUrl('/cart'));
                }}
              >
{t('viewCart')}
              </button>

            </div>
            <div className="minicart-btn_area">
              <button 
                className="uren-btn close-cart  uren-btn_dark uren-btn_fullwidth"
                onClick={() => {
                  handleCloseCart();
                  router.push(createLocaleUrl('/checkout'));
                }}
              >
{t('checkout')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideCart; 