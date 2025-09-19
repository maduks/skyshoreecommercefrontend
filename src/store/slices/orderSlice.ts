import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  product: string;
  quantity: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface GetUserOrdersPayload {
  token: string;
}

export interface GetOrderByIdPayload {
  orderId: string;
  token: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  success: false,
};

const BASE_URL = "https://skyshorecommerce.vercel.app/api";

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData: CreateOrderPayload & { token: string }, { rejectWithValue, getState }) => {
    try {
      // Get cart items from state to calculate prices
      const state = getState() as { cart: { items: Array<{ price: number | { $numberDouble: string }; quantity: number }> } };
      const cartItems = state.cart.items;
      
      // Calculate prices
      const itemsPrice = cartItems.reduce((total: number, item) => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.$numberDouble);
        return total + (price * item.quantity);
      }, 0);
      
      const shippingPrice = itemsPrice > 100000 ? 0 : 5000; // Free shipping over ₦100,000
      const taxPrice = itemsPrice * 0.075; // 7.5% tax
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      // Simulate API call - replace with actual API endpoint
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${orderData.token}`,
        },
        body: JSON.stringify({
          orderItems: orderData.orderItems,
          shippingAddress: orderData.shippingAddress,
          paymentMethod: orderData.paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Order creation failed');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      // Simulate API failure for testing
      return rejectWithValue('Order creation failed - An error occurred');
    }
  }
);

// Async thunk for getting user orders
export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async (payload: GetUserOrdersPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/my`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${payload.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch orders');
      }

      const data = await response.json();
      return data.orders;
    } catch (error) {
      // For now, return mock data
      const mockOrders: Order[] = [
        {
          _id: 'order_1',
          orderItems: [
            { product: '689230123e8773f27714741f', quantity: 2 },
            { product: '689230123e8773f27714742f', quantity: 1 }
          ],
          shippingAddress: {
            street: '123 Main Street',
            city: 'Lagos',
            state: 'Lagos',
            zipCode: '100001',
            country: 'Nigeria'
          },
          paymentMethod: 'Transfer',
          itemsPrice: 45000,
          shippingPrice: 5000,
          taxPrice: 3375,
          totalPrice: 53375,
          user: 'user_1',
          isPaid: true,
          paidAt: '2024-01-20T10:30:00Z',
          isDelivered: true,
          deliveredAt: '2024-01-22T14:20:00Z',
          createdAt: '2024-01-20T09:15:00Z',
          updatedAt: '2024-01-22T14:20:00Z'
        },
        {
          _id: 'order_2',
          orderItems: [
            { product: '689230123e8773f27714743f', quantity: 3 }
          ],
          shippingAddress: {
            street: '456 Oak Avenue',
            city: 'Abuja',
            state: 'Abuja',
            zipCode: '900001',
            country: 'Nigeria'
          },
          paymentMethod: 'Transfer',
          itemsPrice: 32500,
          shippingPrice: 5000,
          taxPrice: 2437.5,
          totalPrice: 39937.5,
          user: 'user_1',
          isPaid: true,
          paidAt: '2024-01-18T16:45:00Z',
          isDelivered: false,
          createdAt: '2024-01-18T15:30:00Z',
          updatedAt: '2024-01-18T16:45:00Z'
        },
        {
          _id: 'order_3',
          orderItems: [
            { product: '689230123e8773f27714744f', quantity: 1 },
            { product: '689230123e8773f27714745f', quantity: 2 }
          ],
          shippingAddress: {
            street: '789 Pine Road',
            city: 'Kano',
            state: 'Kano',
            zipCode: '700001',
            country: 'Nigeria'
          },
          paymentMethod: 'Transfer',
          itemsPrice: 28000,
          shippingPrice: 5000,
          taxPrice: 2100,
          totalPrice: 35100,
                  user: 'user_1',
        isPaid: false,
        isDelivered: false,
        createdAt: '2024-01-15T11:20:00Z',
        updatedAt: '2024-01-15T11:20:00Z'
        }
      ];
      return mockOrders;
    }
  }
);

// Async thunk for getting order by ID
export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (payload: GetOrderByIdPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${payload.orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${payload.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch order');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      // For now, return mock data
      const mockOrder: Order = {
        _id: payload.orderId,
        orderItems: [
          { product: '689230123e8773f27714741f', quantity: 2 },
          { product: '689230123e8773f27714742f', quantity: 1 }
        ],
        shippingAddress: {
          street: '123 Main Street',
          city: 'Lagos',
          state: 'Lagos',
          zipCode: '100001',
          country: 'Nigeria'
        },
        paymentMethod: 'Transfer',
        itemsPrice: 45000,
        shippingPrice: 5000,
        taxPrice: 3375,
        totalPrice: 53375,
        user: 'user_1',
        isPaid: true,
        paidAt: '2024-01-20T10:30:00Z',
        isDelivered: true,
        deliveredAt: '2024-01-22T14:20:00Z',
        createdAt: '2024-01-20T09:15:00Z',
        updatedAt: '2024-01-22T14:20:00Z'
      };
      return mockOrder;
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetOrder: (state) => {
      state.currentOrder = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Order creation failed';
        state.success = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch orders';
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch order';
      });
  },
});

export const { clearError, clearSuccess, resetOrder } = orderSlice.actions;
export default orderSlice.reducer; 