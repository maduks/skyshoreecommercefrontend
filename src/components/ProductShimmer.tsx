'use client';

import React from 'react';
import Shimmer from './Shimmer';

interface ProductShimmerProps {
  count?: number;
}

const ProductShimmer: React.FC<ProductShimmerProps> = ({ count = 8 }) => {
  const shimmerCards = Array.from({ length: count }, (_, index) => (
    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
      <div className="product-item">
        <div className="product-img">
          {/* Product Image Shimmer */}
          <Shimmer width="100%" height="250px" className="mb-3" />
        </div>
        <div className="product-content">
          {/* Product Title Shimmer */}
          <Shimmer width="80%" height="20px" className="mb-2" />
          
          {/* Product Price Shimmer */}
          <Shimmer width="60%" height="18px" className="mb-2" />
          
          {/* Product Description Shimmer */}
          <Shimmer width="100%" height="16px" className="mb-1" />
          <Shimmer width="90%" height="16px" className="mb-1" />
          <Shimmer width="70%" height="16px" className="mb-3" />
          
          {/* Action Buttons Shimmer */}
          <div className="add-actions">
            <ul>
              <li><Shimmer width="40px" height="40px" className="rounded-circle" /></li>
              <li><Shimmer width="40px" height="40px" className="rounded-circle" /></li>
              <li><Shimmer width="40px" height="40px" className="rounded-circle" /></li>
              <li><Shimmer width="40px" height="40px" className="rounded-circle" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="row">
      {shimmerCards}
    </div>
  );
};

export default ProductShimmer; 