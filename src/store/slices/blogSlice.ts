import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Blog Types
export interface BlogAuthor {
  _id: string;
  name: string;
  email: string;
}

export interface BlogCategory {
  _id: string;
  name: string;
}

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: BlogAuthor;
  featuredImage: string;
  images: string[];
  categories: BlogCategory[];
  tags: string[];
  status: string;
  featured: boolean;
  allowComments: boolean;
  viewCount: number;
  readTime: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: BlogSEO;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination: BlogPagination;
}

export interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
  pagination: BlogPagination | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (params?: { page?: number; limit?: number; featured?: boolean }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.featured) queryParams.append('featured', params.featured.toString());

      const response = await fetch(`/api/blogs?${queryParams.toString()}`);
      const data: BlogResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
      
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  'blog/fetchBlogBySlug',
  async (slug: string) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch blog');
      }
      
      return data.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch blog');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    incrementViewCount: (state, action: PayloadAction<string>) => {
      const blog = state.blogs.find(b => b._id === action.payload);
      if (blog) {
        blog.viewCount += 1;
      }
      if (state.currentBlog && state.currentBlog._id === action.payload) {
        state.currentBlog.viewCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blogs';
      })
      // Fetch blog by slug
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog';
      });
  },
});

export const { clearBlogError, clearCurrentBlog, incrementViewCount } = blogSlice.actions;
export default blogSlice.reducer; 