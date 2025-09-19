'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };


  

  const handleQuantityChange = (id: string, newQuantity: number) => {
    console.log('handleQuantityChange called - ID:', id, 'newQuantity:', newQuantity);
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    console.log('Removing item with ID:', id);
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Prevent jQuery from interfering with React cart controls
  useEffect(() => {
    const preventJQueryInterference = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const $ = (window as any).jQuery;
        
        // Remove any duplicate buttons that jQuery might have added
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $('.cart-plus-minus').each(function(this: any) {
          const $container = $(this);
          const buttons = $container.find('.qtybutton');
          if (buttons.length > 2) {
            // Remove extra buttons, keep only the first two
            buttons.slice(2).remove();
          }
        });
        
        // Remove jQuery handlers from all cart quantity buttons on this page
        $('.cart-plus-minus .qtybutton').off('click');
        console.log('Prevented jQuery interference with cart quantity buttons');
      }
    };

    // Run multiple times to catch jQuery initialization
    const timer1 = setTimeout(preventJQueryInterference, 100);
    const timer2 = setTimeout(preventJQueryInterference, 500);
    const timer3 = setTimeout(preventJQueryInterference, 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [items]);

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

  if (items.length === 0) {
    return (
      <>
        {/* Begin Uren's Breadcrumb Area */}
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2>Other</h2>
              <ul>
                <li><Link href={createLocaleUrl('/')}>Home</Link></li>
                <li className="active">Cart</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Uren's Breadcrumb Area End Here */}
        
        <div className="cart-empty_area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-empty-content text-center">
                  <i className="ion-bag" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }}></i>
                  <h3>Your cart is empty</h3>
                  <p>Looks like you haven&apos;t added any items to your cart yet.</p>
                  <Link href={createLocaleUrl('/shop')} className="uren-btn">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
            <ul>
              <li><Link href={createLocaleUrl('/')}>Home</Link></li>
              <li className="active">Cart</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Cart Area */}
      <div className="uren-cart-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="table-content">
                  <table>
                    <thead>
                      <tr>
                        <th className="uren-product-remove">&nbsp;</th>
                        <th className="uren-product-thumbnail">&nbsp;</th>
                        <th className="uren-product-name">Product</th>
                        <th className="uren-product-price">Unit Price</th>
                        <th className="uren-product-quantity">Quantity</th>
                        <th className="uren-product-subtotal">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item._id}>
                          <td className="uren-product-remove">
                            <button 
                              type="button"
                              onClick={() => handleRemoveItem(item._id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                          <td className="uren-product-thumbnail">
                            <Image
                              src={item.images[0] || "/assets/images/product/small-size/1.jpg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              style={{ objectFit: 'cover' }}
                            />
                          </td>
                          <td className="uren-product-name">
                            <Link href={createLocaleUrl(`/product/${item._id}`)}>{item.name}</Link>
                          </td>
                          <td className="uren-product-price">
                            <span className="amount">
                              {item.salePrice && getNumericValue(item.salePrice) < getNumericValue(item.price) ? (
                                <>
                                  <span className="new-price">{formatPrice(item.salePrice)}</span>
                                  <span className="old-price">{formatPrice(item.price)}</span>
                                </>
                              ) : (
                                formatPrice(item.price)
                              )}
                            </span>
                          </td>
                          <td className="quantity">
                            <label>Quantity</label>
                            <div className="cart-plus-minus">
                              <input 
                                className="cart-plus-minus-box" 
                                value={item.quantity} 
                                type="text"
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1;
                                  handleQuantityChange(item._id, newQuantity);
                                }}
                              />
                              <div className="dec qtybutton" onClick={(e) => {
                                console.log('Decrease button clicked for item:', item._id);
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuantityChange(item._id, Math.max(1, item.quantity - 1));
                              }}>
                                <i className="fa fa-angle-down"></i>
                              </div>
                              <div className="inc qtybutton" onClick={(e) => {
                                console.log('Increase button clicked for item:', item._id);
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuantityChange(item._id, item.quantity + 1);
                              }}>
                                <i className="fa fa-angle-up"></i>
                              </div>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">
                              {item.salePrice && getNumericValue(item.salePrice) < getNumericValue(item.price) ? (
                                formatPrice(getNumericValue(item.salePrice) * item.quantity)
                              ) : (
                                formatPrice(getNumericValue(item.price) * item.quantity)
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="coupon-all">
                      <div className="coupon">
                        <input 
                        onChange={(e) => {
                          // const newCouponCode = e.target.value;
                        }}
                          id="coupon_code" 
                          className="input-text" 
                          name="coupon_code" 
                          value="" 
                          placeholder="Coupon code" 
                          type="text" 
                        />
                        <input 
                          className="button" 
                          name="apply_coupon" 
                          value="Apply coupon" 
                          type="submit" 
                        />
                      </div>
                      <div className="coupon2">
                        <button className="button" onClick={handleClearCart}>
                          Clear cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 ml-auto">
                    <div className="cart-page-total">
                      <h2>Cart totals</h2>
                      <ul>
                        <li>Subtotal <span>{formatPrice(totalAmount)}</span></li>
                        <li>Total <span>{formatPrice(totalAmount)}</span></li>
                      </ul>
                      <Link href={createLocaleUrl('/checkout')}>Proceed to checkout</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Cart Area End Here */}
    </>
  );
};

export default CartPage; 