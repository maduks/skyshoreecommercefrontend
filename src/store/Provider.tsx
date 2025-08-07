'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
} 