'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/store/slices/productSlice';
import QuickViewModal from './QuickViewModal';


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
  


  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
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
      />
    </QuickViewContext.Provider>
  );
}; 