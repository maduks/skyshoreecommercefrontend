'use client';

import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'ion-checkmark-circled';
      case 'error':
        return 'ion-close-circled';
      case 'info':
        return 'ion-information-circled';
      default:
        return 'ion-information-circled';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      case 'info':
        return 'bg-info';
      default:
        return 'bg-info';
    }
  };

  return (
    <div className={`notification-toast ${getBgColor()} text-white`} style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      padding: '15px 20px',
      borderRadius: '5px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      minWidth: '300px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'slideInRight 0.3s ease-out'
    }}>
      <i className={`${getIcon()} text-white`} style={{ fontSize: '20px' }}></i>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          marginLeft: 'auto'
        }}
      >
        <i className="ion-close"></i>
      </button>
    </div>
  );
};

export default Notification; 