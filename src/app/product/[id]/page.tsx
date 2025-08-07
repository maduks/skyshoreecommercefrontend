import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Single Product Type</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li className="active">Single Product</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Single Product Area */}
      <div className="sp-area">
        <div className="container-fluid">
          <div className="sp-nav">
            <div className="row">
              <div className="col-lg-4">
                <div className="sp-img_area">
                  <div className="sp-img_slider slick-img-slider uren-slick-slider" data-slick-options='{
                  "slidesToShow": 1,
                  "arrows": false,
                  "fade": true,
                  "draggable": false,
                  "swipe": false,
                  "asNavFor": ".sp-img_slider-nav"
                  }'>
                    <div className="single-slide red zoom">
                      <Image 
                        src="/assets/images/product/large-size/1.jpg" 
                        alt="Uren's Product Image" 
                        width={400} 
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide orange zoom">
                      <Image 
                        src="/assets/images/product/large-size/2.jpg" 
                        alt="Uren's Product Image" 
                        width={400} 
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide brown zoom">
                      <Image 
                        src="/assets/images/product/large-size/3.jpg" 
                        alt="Uren's Product Image" 
                        width={400} 
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide umber zoom">
                      <Image 
                        src="/assets/images/product/large-size/4.jpg" 
                        alt="Uren's Product Image" 
                        width={400} 
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide black zoom">
                      <Image 
                        src="/assets/images/product/large-size/5.jpg" 
                        alt="Uren's Product Image" 
                        width={400} 
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide green zoom">
                      <Image 
                        src="/assets/images/product/large-size/6.jpg" 
                        alt="Uren's Product Image" 
                        width={400} 
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className="sp-img_slider-nav slick-slider-nav uren-slick-slider slider-navigation_style-3" data-slick-options='{
                  "slidesToShow": 3,
                  "asNavFor": ".sp-img_slider",
                  "focusOnSelect": true,
                  "arrows" : true,
                  "spaceBetween": 30
                  }' data-slick-responsive='[
                          {"breakpoint":1501, "settings": {"slidesToShow": 3}},
                          {"breakpoint":992, "settings": {"slidesToShow": 4}},
                          {"breakpoint":768, "settings": {"slidesToShow": 3}},
                          {"breakpoint":575, "settings": {"slidesToShow": 2}}
                      ]'>
                    <div className="single-slide red">
                      <Image 
                        src="/assets/images/product/small-size/1.jpg" 
                        alt="Uren's Product Thumnail" 
                        width={100} 
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide orange">
                      <Image 
                        src="/assets/images/product/small-size/2.jpg" 
                        alt="Uren's Product Thumnail" 
                        width={100} 
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide brown">
                      <Image 
                        src="/assets/images/product/small-size/3.jpg" 
                        alt="Uren's Product Thumnail" 
                        width={100} 
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide umber">
                      <Image 
                        src="/assets/images/product/small-size/4.jpg" 
                        alt="Uren's Product Thumnail" 
                        width={100} 
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide red">
                      <Image 
                        src="/assets/images/product/small-size/5.jpg" 
                        alt="Uren's Product Thumnail" 
                        width={100} 
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="single-slide orange">
                      <Image 
                        src="/assets/images/product/small-size/6.jpg" 
                        alt="Uren's Product Thumnail" 
                        width={100} 
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="sp-content">
                  <div className="sp-heading">
                    <h5><Link href="#">Dolorem odio provident ut nihil</Link></h5>
                  </div>
                  <span className="reference">Reference: demo_1</span>
                  <div className="rating-box">
                    <ul>
                      <li><i className="ion-android-star"></i></li>
                      <li><i className="ion-android-star"></i></li>
                      <li><i className="ion-android-star"></i></li>
                      <li className="silver-color"><i className="ion-android-star"></i></li>
                      <li className="silver-color"><i className="ion-android-star"></i></li>
                    </ul>
                  </div>
                  <div className="sp-essential_stuff">
                    <ul>
                      <li>Brands <Link href="javascript:void(0)">Buxton</Link></li>
                      <li>Product Code: <Link href="javascript:void(0)">Product 16</Link></li>
                      <li>Reward Points: <Link href="javascript:void(0)">100</Link></li>
                      <li>Availability: <Link href="javascript:void(0)">In Stock</Link></li>
                      <li>EX Tax: <Link href="javascript:void(0)"><span>$453.35</span></Link></li>
                      <li>Price in reward points: <Link href="javascript:void(0)">400</Link></li>
                    </ul>
                  </div>
                  <div className="product-size_box">
                    <span>Size</span>
                    <select className="myniceselect nice-select">
                      <option value="1">S</option>
                      <option value="2">M</option>
                      <option value="3">L</option>
                      <option value="4">XL</option>
                    </select>
                  </div>
                  <div className="quantity">
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
                  </div>
                  <div className="qty-btn_area">
                    <ul>
                      <li><Link href="/cart" className="qty-cart_btn">Add To Cart</Link></li>
                      <li><Link href="/wishlist" className="qty-wishlist_btn" data-toggle="tooltip" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></Link></li>
                      <li><Link href="/compare" className="qty-compare_btn" data-toggle="tooltip" title="Compare This Product"><i className="ion-ios-shuffle-strong"></i></Link></li>
                    </ul>
                  </div>
                  <div className="uren-tag-line">
                    <h6>Tags:</h6>
                    <Link href="javascript:void(0)">vehicle</Link>,
                    <Link href="javascript:void(0)">car</Link>,
                    <Link href="javascript:void(0)">bike</Link>
                  </div>
                  <div className="uren-social_link">
                    <ul>
                      <li className="facebook">
                        <Link href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook">
                          <i className="fab fa-facebook"></i>
                        </Link>
                      </li>
                      <li className="twitter">
                        <Link href="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                          <i className="fab fa-twitter-square"></i>
                        </Link>
                      </li>
                      <li className="youtube">
                        <Link href="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                          <i className="fab fa-youtube"></i>
                        </Link>
                      </li>
                      <li className="google-plus">
                        <Link href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus">
                          <i className="fab fa-google-plus"></i>
                        </Link>
                      </li>
                      <li className="instagram">
                        <Link href="https://rss.com/" data-toggle="tooltip" target="_blank" title="Instagram">
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Single Product Area End Here */}

      {/* Begin Uren's Single Product Tab Area */}
      <div className="sp-product-tab_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="sp-product-tab_nav">
                <div className="product-tab">
                  <ul className="nav product-menu">
                    <li><Link className="active" data-toggle="tab" href="#description"><span>Description</span></Link></li>
                    <li><Link data-toggle="tab" href="#specification"><span>Specification</span></Link></li>
                    <li><Link data-toggle="tab" href="#reviews"><span>Reviews (1)</span></Link></li>
                  </ul>
                </div>
                <div className="tab-content uren-tab_content">
                  <div id="description" className="tab-pane active show" role="tabpanel">
                    <div className="product-description">
                      <ul>
                        <li>
                          <strong>Ullam aliquam</strong>
                          <span>Voluptatum, minus? Optio molestias voluptates aspernatur laborum ratione minima, natus eaque nemo rem quisquam, suscipit architecto saepe. Debitis omnis labore laborum consectetur, quas, esse voluptates minus aliquam modi nesciunt earum! Vero rerum molestiae corporis libero repellat doloremque quae sapiente ratione maiores qui aliquam, sunt obcaecati! Iure nisi doloremque numquam delectus.</span>
                        </li>
                        <li>
                          <strong>Enim tempore</strong>
                          <span>Molestias amet quibusdam eligendi exercitationem alias labore tenetur quaerat veniam similique aspernatur eveniet, suscipit corrupti itaque dolore deleniti nobis, rerum reprehenderit recusandae. Eligendi beatae asperiores nisi distinctio doloribus voluptatibus voluptas repellendus tempore unde velit temporibus atque maiores aliquid deserunt aspernatur amet, soluta fugit magni saepe fugiat vel sunt voluptate vitae</span>
                        </li>
                        <li>
                          <strong>Laudantium suscipit</strong>
                          <span>Odit repudiandae maxime, ducimus necessitatibus error fugiat nihil eum dolorem animi voluptates sunt, rem quod reprehenderit expedita, nostrum sit accusantium ut delectus. Voluptates at ipsam, eligendi labore dignissimos consectetur reprehenderit id error excepturi illo velit ratione nisi nam saepe quod! Reiciendis eos, velit fugiat voluptates accusamus nesciunt dicta ratione mollitia, asperiores error aliquam! Reprehenderit provident, omnis blanditiis fugit, accusamus deserunt illum unde, voluptatum consequuntur illo officiis labore doloremque quidem aperiam! Fuga, expedita? Laboriosam eum, tempore vitae libero voluptate omnis ducimus doloremque hic quibusdam reiciendis ab itaque aperiam maiores laudantium esse, consequuntur quos labore modi quasi recusandae distinctio iusto optio officia tempora.</span>
                        </li>
                        <li>
                          <strong>Molestiae veritatis officia</strong>
                          <span>Illum fuga esse tenetur inventore, in voluptatibus saepe iste quia cupiditate, explicabo blanditiis accusantium ut. Eaque nostrum, quisquam doloribus asperiores tempore autem. Ea perspiciatis vitae reiciendis maxime similique vel, id ratione blanditiis ullam officiis odio sunt nam quos atque accusantium ad! Repellendus, magni aliquid. Iure asperiores veniam eum unde dignissimos reprehenderit ut atque velit, harum labore nam expedita, pariatur excepturi consectetur animi optio mollitia ad a natus eaque aut assumenda inventore dolor obcaecati! Enim ab tempore nulla iusto consequuntur quod sit voluptatibus adipisci earum fuga, explicabo amet, provident, molestiae optio. Ducimus ex necessitatibus assumenda, nisi excepturi ut aspernatur est eius dignissimos pariatur unde ipsum sunt quaerat.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div id="specification" className="tab-pane" role="tabpanel">
                    <table className="table table-bordered specification-inner_stuff">
                      <tbody>
                        <tr>
                          <td colSpan={2}><strong>Memory</strong></td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td>test 1</td>
                          <td>8gb</td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td colSpan={2}><strong>Processor</strong></td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td>No. of Cores</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div id="reviews" className="tab-pane" role="tabpanel">
                    <div className="tab-pane active" id="tab-review">
                      <form className="form-horizontal" id="form-review">
                        <div id="review">
                          <table className="table table-striped table-bordered">
                            <tbody>
                              <tr>
                                <td style={{ width: '50%' }}><strong>Customer</strong></td>
                                <td className="text-right">15/09/20</td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  <p>Good product! Thank you very much</p>
                                  <div className="rating-box">
                                    <ul>
                                      <li><i className="ion-android-star"></i></li>
                                      <li><i className="ion-android-star"></i></li>
                                      <li><i className="ion-android-star"></i></li>
                                      <li><i className="ion-android-star"></i></li>
                                      <li><i className="ion-android-star"></i></li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <h2>Write a review</h2>
                        <div className="form-group required">
                          <div className="col-sm-12 p-0">
                            <label>Your Email <span className="required">*</span></label>
                            <input className="review-input" type="email" name="con_email" id="con_email" required />
                          </div>
                        </div>
                        <div className="form-group required second-child">
                          <div className="col-sm-12 p-0">
                            <label className="control-label">Share your opinion</label>
                            <textarea className="review-textarea" name="con_message" id="con_message"></textarea>
                            <div className="help-block"><span className="text-danger">Note:</span> HTML is not translated!</div>
                          </div>
                        </div>
                        <div className="form-group last-child required">
                          <div className="col-sm-12 p-0">
                            <div className="your-opinion">
                              <label>Your Rating</label>
                              <span>
                                <select className="star-rating">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </span>
                            </div>
                          </div>
                          <div className="uren-btn-ps_right">
                            <button className="uren-btn-2">Continue</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Single Product Tab Area End Here */}

      {/* Begin Uren's Product Area */}
      <div className="uren-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span></span>
                <h3>Related Products</h3>
              </div>
              <div className="product-slider uren-slick-slider slider-navigation_style-1 img-hover-effect_area" data-slick-options='{
              "slidesToShow": 6,
              "arrows" : true
              }' data-slick-responsive='[
                                      {"breakpoint":1501, "settings": {"slidesToShow": 4}},
                                      {"breakpoint":1200, "settings": {"slidesToShow": 3}},
                                      {"breakpoint":992, "settings": {"slidesToShow": 2}},
                                      {"breakpoint":767, "settings": {"slidesToShow": 1}},
                                      {"breakpoint":480, "settings": {"slidesToShow": 1}}
                                  ]'>
                <div className="product-slide_item">
                  <div className="inner-slide">
                    <div className="single-product">
                      <div className="product-img">
                        <Link href="/product/1">
                          <Image className="primary-img" src="/assets/images/product/medium-size/1-1.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                          <Image className="secondary-img" src="/assets/images/product/medium-size/1-2.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                        </Link>
                        <div className="sticker">
                          <span className="sticker">New</span>
                        </div>
                        <div className="add-actions">
                          <ul>
                            <li><Link className="uren-add_cart" href="/cart" data-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="ion-bag"></i></Link></li>
                            <li><Link className="uren-wishlist" href="/wishlist" data-toggle="tooltip" data-placement="top" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></Link></li>
                            <li><Link className="uren-add_compare" href="/compare" data-toggle="tooltip" data-placement="top" title="Compare This Product"><i className="ion-android-options"></i></Link></li>
                            <li className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><Link href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="Quick View"><i className="ion-android-open"></i></Link></li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-desc_info">
                          <div className="rating-box">
                            <ul>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li className="silver-color"><i className="ion-android-star"></i></li>
                              <li className="silver-color"><i className="ion-android-star"></i></li>
                            </ul>
                          </div>
                          <h6><Link className="product-name" href="/product/1">Veniam officiis voluptates</Link></h6>
                          <div className="price-box">
                            <span className="new-price">$122.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-slide_item">
                  <div className="inner-slide">
                    <div className="single-product">
                      <div className="product-img">
                        <Link href="/product/2">
                          <Image className="primary-img" src="/assets/images/product/medium-size/2-1.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                          <Image className="secondary-img" src="/assets/images/product/medium-size/2-2.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                        </Link>
                        <div className="sticker-area-2">
                          <span className="sticker-2">-20%</span>
                          <span className="sticker">New</span>
                        </div>
                        <div className="add-actions">
                          <ul>
                            <li><Link className="uren-add_cart" href="/cart" data-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="ion-bag"></i></Link></li>
                            <li><Link className="uren-wishlist" href="/wishlist" data-toggle="tooltip" data-placement="top" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></Link></li>
                            <li><Link className="uren-add_compare" href="/compare" data-toggle="tooltip" data-placement="top" title="Compare This Product"><i className="ion-android-options"></i></Link></li>
                            <li className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><Link href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="Quick View"><i className="ion-android-open"></i></Link></li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-desc_info">
                          <div className="rating-box">
                            <ul>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li className="silver-color"><i className="ion-android-star"></i></li>
                              <li className="silver-color"><i className="ion-android-star"></i></li>
                            </ul>
                          </div>
                          <h6><Link className="product-name" href="/product/2">Corporis sed excepturi</Link></h6>
                          <div className="price-box">
                            <span className="new-price new-price-2">$194.00</span>
                            <span className="old-price">$241.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Product Area End Here */}
    </>
  );
};

export default ProductDetailsPage; 