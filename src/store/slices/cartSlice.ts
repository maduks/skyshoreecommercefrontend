import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Helper function to get numeric value from MongoDB number format
const getNumericValue = (value: number | { $numberDouble: string }): number => {
  if (typeof value === 'number') {
    return value;
  } else if ('$numberDouble' in value) {
    return parseFloat(value.$numberDouble);
  }
  return 0;
};

// Helper function to get the effective price (sale price if available, otherwise regular price)
const getEffectivePrice = (item: CartItem): number => {
  if (item.salePrice && getNumericValue(item.salePrice) < getNumericValue(item.price)) {
    return getNumericValue(item.salePrice);
  }
  return getNumericValue(item.price);
};

export interface CartItem {
  _id: string;
  name: string;
  price: number | { $numberDouble: string };
  salePrice?: number | { $numberDouble: string };
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  quantity: number;
  sku: string;
  brand: string;
  stock: number | { $numberInt: string } | { $numberDouble: string };
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
      
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (getEffectivePrice(item) * item.quantity), 0);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (getEffectivePrice(item) * item.quantity), 0);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item._id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (getEffectivePrice(item) * item.quantity), 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  openCart, 
  closeCart 
} = cartSlice.actions;

export default cartSlice.reducer; 