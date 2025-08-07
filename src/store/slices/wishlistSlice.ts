import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  sku: string;
  brand: string;
  stock: number;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
}

const initialState: WishlistState = {
  items: [],
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Omit<WishlistItem, 'addedAt'>>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          addedAt: new Date().toISOString(),
        });
      }
    },
    
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    },
    
    clearWishlist: (state) => {
      state.items = [];
    },
    
    toggleWishlist: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openWishlist: (state) => {
      state.isOpen = true;
    },
    
    closeWishlist: (state) => {
      state.isOpen = false;
    },
    
    moveToCart: (state, action: PayloadAction<string>) => {
      // This action will be handled by the cart slice
      // We just remove from wishlist here
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  openWishlist,
  closeWishlist,
  moveToCart,
} = wishlistSlice.actions;

export default wishlistSlice.reducer; 