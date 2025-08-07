'use client';

import React from 'react';
import Link from 'next/link';

const PopularSearch = () => {
  return (
    <div className="popular-search_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="popular-search">
              <label>Popular Search:</label>
              <Link href="/shop?search=brakes">Brakes & Rotors,</Link>
              <Link href="/shop?search=lighting">Lighting,</Link>
              <Link href="/shop?search=performance">Performance,</Link>
              <Link href="/shop?search=wheels">Wheels & Tires</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearch; 