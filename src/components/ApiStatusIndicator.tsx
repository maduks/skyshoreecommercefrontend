'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';

interface ApiStatusIndicatorProps {
  className?: string;
}

const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ className = '' }) => {
  const { loading, error } = useAppSelector((state: any) => state.products);

  if (!error) return null;

  return (
    <div className={`api-status-indicator ${className}`} style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '300px',
      fontSize: '14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ 
          color: '#856404', 
          marginRight: '8px',
          fontSize: '16px'
        }}>
          ⚠️
        </span>
        <strong style={{ color: '#856404' }}>API Status</strong>
      </div>
      <p style={{ 
        margin: '0 0 8px 0', 
        color: '#856404',
        fontSize: '12px'
      }}>
        {error}
      </p>
      <div style={{ 
        fontSize: '11px', 
        color: '#856404',
        opacity: 0.8
      }}>
        Using fallback data. Some features may be limited.
      </div>
    </div>
  );
};

export default ApiStatusIndicator; 