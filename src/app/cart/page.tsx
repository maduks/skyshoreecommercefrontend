import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = () => {
  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Other</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
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
            <div className="col-12">
              <form action="javascript:void(0)">
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="uren-product-remove">remove</th>
                        <th className="uren-product-thumbnail">images</th>
                        <th className="cart-product-name">Product</th>
                        <th className="uren-product-price">Unit Price</th>
                        <th className="uren-product-quantity">Quantity</th>
                        <th className="uren-product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="uren-product-remove">
                          <Link href="javascript:void(0)">
                            <i className="fa fa-trash" title="Remove"></i>
                          </Link>
                        </td>
                        <td className="uren-product-thumbnail">
                          <Link href="javascript:void(0)">
                            <Image 
                              src="/assets/images/product/small-size/1.jpg" 
                              alt="Uren's Cart Thumbnail" 
                              width={80} 
                              height={80}
                              style={{ objectFit: 'cover' }}
                            />
                          </Link>
                        </td>
                        <td className="uren-product-name">
                          <Link href="javascript:void(0)">Juma rema pola</Link>
                        </td>
                        <td className="uren-product-price">
                          <span className="amount">$46.80</span>
                        </td>
                        <td className="quantity">
                          <label>Quantity</label>
                          <div className="cart-plus-minus">
                            <input className="cart-plus-minus-box" value="1" type="text" />
                            <div className="dec qtybutton">
                              <i className="fa fa-angle-down"></i>
                            </div>
                            <div className="inc qtybutton">
                              <i className="fa fa-angle-up"></i>
                            </div>
                          </div>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">$46.80</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="uren-product-remove">
                          <Link href="javascript:void(0)">
                            <i className="fa fa-trash" title="Remove"></i>
                          </Link>
                        </td>
                        <td className="uren-product-thumbnail">
                          <Link href="javascript:void(0)">
                            <Image 
                              src="/assets/images/product/small-size/2.jpg" 
                              alt="Uren's Cart Thumbnail" 
                              width={80} 
                              height={80}
                              style={{ objectFit: 'cover' }}
                            />
                          </Link>
                        </td>
                        <td className="uren-product-name">
                          <Link href="javascript:void(0)">Bag Goodscol model</Link>
                        </td>
                        <td className="uren-product-price">
                          <span className="amount">$71.80</span>
                        </td>
                        <td className="quantity">
                          <label>Quantity</label>
                          <div className="cart-plus-minus">
                            <input className="cart-plus-minus-box" value="1" type="text" />
                            <div className="dec qtybutton">
                              <i className="fa fa-angle-down"></i>
                            </div>
                            <div className="inc qtybutton">
                              <i className="fa fa-angle-up"></i>
                            </div>
                          </div>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">$71.80</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="coupon-all">
                      <div className="coupon">
                        <input 
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
                        <input 
                          className="button" 
                          name="update_cart" 
                          value="Update cart" 
                          type="submit" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 ml-auto">
                    <div className="cart-page-total">
                      <h2>Cart totals</h2>
                      <ul>
                        <li>Subtotal <span>$118.60</span></li>
                        <li>Total <span>$118.60</span></li>
                      </ul>
                      <Link href="/checkout">Proceed to checkout</Link>
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