import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';
import compareReducer from './slices/compareSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import blogReducer from './slices/blogSlice';

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'totalQuantity', 'totalAmount']
};

const productPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['viewMode']
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated']
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedProductReducer = persistReducer(productPersistConfig, productReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    products: persistedProductReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    user: persistedUserReducer,
    order: orderReducer,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 