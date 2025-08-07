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

// Fallback data for when API is down
const fallbackProducts = [
  {
    _id: "fallback-1",
    name: "Sample Product 1",
    description: "This is a sample product for demonstration purposes.",
    price: 29.99,
    salePrice: 24.99,
    category: {
      _id: "fallback-cat-1",
      name: "Sample Category"
    },
    images: ["/assets/images/product/large-size/1.jpg"],
    stock: 10,
    sku: "SAMPLE-001",
    brand: "Sample Brand",
    specifications: "Sample specifications",
    isActive: true,
    tags: ["sample", "demo"],
    variations: [],
    averageRating: 4.5,
    totalRatings: 10,
    featured: true,
    newArrival: true,
    saleEndDate: "2024-12-31T23:59:59.000Z",
    ratings: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

const fallbackCategories = [
  {
    _id: "fallback-cat-1",
    name: "Sample Category",
    description: "A sample category for demonstration",
    image: "/assets/images/featured-categories/1.png",
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

const BASE_URL = "https://skyshorecommerce.vercel.app/api";

// Helper function for retrying API calls with exponential backoff
const retryWithBackoff = async (apiCall: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error: any) {
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Wait with exponential backoff (1s, 2s, 4s)
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await retryWithBackoff(async () => {
        const res = await axios.get(`${BASE_URL}/categories`);
        if (res.status !== 200) {
          throw new Error('Failed to fetch categories');
        }
        return res;
      });
      
      const data = response.data;
      return data;
    } catch (error: any) {
      let errorMessage = 'Failed to fetch categories';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 500) {
          errorMessage = 'Server error: Database timeout. Please try again later.';
        } else if (error.response.status === 404) {
          errorMessage = 'Categories not found';
        } else {
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error: Unable to connect to server';
      } else {
        // Other error
        errorMessage = error.message || 'Failed to fetch categories';
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await retryWithBackoff(async () => {
        const res = await axios.get(`${BASE_URL}/products`);
        if (res.status !== 200) {
          throw new Error('Failed to fetch products');
        }
        return res;
      });
      
      const data = response.data;
      return data;
    } catch (error: any) {
      let errorMessage = 'Failed to fetch products';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 500) {
          errorMessage = 'Server error: Database timeout. Please try again later.';
        } else if (error.response.status === 404) {
          errorMessage = 'Products not found';
        } else {
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error: Unable to connect to server';
      } else {
        // Other error
        errorMessage = error.message || 'Failed to fetch products';
      }
      
      return rejectWithValue(errorMessage);
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
        // Use fallback categories if API fails
        if (state.categories.length === 0) {
          state.categories = fallbackCategories;
        }
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
        // Use fallback products if API fails
        if (state.products.length === 0) {
          state.products = fallbackProducts;
        }
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