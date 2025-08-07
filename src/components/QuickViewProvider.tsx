'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/store/slices/productSlice';
import QuickViewModal from './QuickViewModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, CartItem } from '@/store/slices/cartSlice';
import { addToWishlist, WishlistItem } from '@/store/slices/wishlistSlice';
import { addToCompare, CompareItem } from '@/store/slices/compareSlice';

interface QuickViewContextType {
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  selectedProduct: Product | null;
  isQuickViewOpen: boolean;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};

interface QuickViewProviderProps {
  children: ReactNode;
}

export const QuickViewProvider: React.FC<QuickViewProviderProps> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const dispatch = useAppDispatch();
  const { items: cart } = useAppSelector((state) => state.cart);
  const { items: wishlist } = useAppSelector((state) => state.wishlist);
  const { items: compare } = useAppSelector((state) => state.compare);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      category: product.category,
      quantity: 1,
      sku: product.sku,
      brand: product.brand,
      stock: product.stock,
    };
    dispatch(addToCart(cartItem));
  };

  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
  };

  const handleAddToCompare = (product: Product) => {
    dispatch(addToCompare(product));
  };

  const isInCart = (productId: string) => {
    return cart.some((item: CartItem) => item._id === productId);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item: WishlistItem) => item._id === productId);
  };

  const isInCompare = (productId: string) => {
    return compare.some((item: CompareItem) => item._id === productId);
  };

  const value = {
    openQuickView,
    closeQuickView,
    selectedProduct,
    isQuickViewOpen,
  };

  return (
    <QuickViewContext.Provider value={value}>
      {children}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onAddToCompare={handleAddToCompare}
        isInCart={isInCart}
        isInWishlist={isInWishlist}
        isInCompare={isInCompare}
      />
    </QuickViewContext.Provider>
  );
}; 