import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompareItem {
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
  description?: string;
  addedAt: string;
}

interface CompareState {
  items: CompareItem[];
  isOpen: boolean;
  maxItems: number;
}

const initialState: CompareState = {
  items: [],
  isOpen: false,
  maxItems: 4, // Maximum number of items that can be compared
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Omit<CompareItem, 'addedAt'>>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      if (!existingItem && state.items.length < state.maxItems) {
        state.items.push({
          ...newItem,
          addedAt: new Date().toISOString(),
        });
      }
    },
    
    removeFromCompare: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    },
    
    clearCompare: (state) => {
      state.items = [];
    },
    
    toggleCompare: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openCompare: (state) => {
      state.isOpen = true;
    },
    
    closeCompare: (state) => {
      state.isOpen = false;
    },
    
    setMaxItems: (state, action: PayloadAction<number>) => {
      state.maxItems = action.payload;
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  clearCompare,
  toggleCompare,
  openCompare,
  closeCompare,
  setMaxItems,
} = compareSlice.actions;

export default compareSlice.reducer; 