import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: {
    _id: string;
    name: string;
  };
  images: string[];
  stock: number;
  sku: string;
  brand: string;
  specifications?: string;
  isActive: boolean;
  tags: string[];
  variations?: object[];
  averageRating: number;
  totalRatings: number;
  featured: boolean;
  newArrival: boolean;
  saleEndDate?: string;
  ratings: object[];
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  products: Product[];
  categories: Category[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    priceRange: [number, number];
    colors: string[];
    manufacturers: string[];
  };
  sortBy: string;
  viewMode: 'gridview-2' | 'gridview-3' | 'gridview-4' | 'gridview-5' | 'listview';
  pagination: {
    totalPages: number;
    currentPage: number;
    total: number;
  };
}

const initialState: ProductState = {
  products: [],
  categories: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 1000],
    colors: [],
    manufacturers: [],
  },
  sortBy: 'default',
  viewMode: 'gridview-3',
  pagination: {
    totalPages: 1,
    currentPage: 1,
    total: 0,
  },
};

const BASE_URL = "https://skyshorecommerce.vercel.app/api";

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch categories');
      }
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }
);

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  }
);

// Async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch product details');
      }
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product details');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    
    setViewMode: (state, action: PayloadAction<ProductState['viewMode']>) => {
      state.viewMode = action.payload;
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000],
        colors: [],
        manufacturers: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories || action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || action.payload;
        state.pagination = {
          totalPages: action.payload.totalPages || 1,
          currentPage: action.payload.currentPage || 1,
          total: action.payload.total || 0,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setProducts,
  setCategories,
  setCurrentProduct,
  setLoading,
  setError,
  setFilters,
  setSortBy,
  setViewMode,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer; 