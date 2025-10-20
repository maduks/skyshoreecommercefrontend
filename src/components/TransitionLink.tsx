'use client';

import React from 'react';
import Link from 'next/link';
import { useNavigationTransition } from '@/hooks/useNavigationTransition';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ 
  href, 
  children, 
  className = '', 
  onClick,
  style 
}) => {
  const { isPending, navigateWithTransition } = useNavigationTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    navigateWithTransition(href);
  };

  return (
    <Link 
      href={href}
      className={`${className} ${isPending ? 'nav-loading' : ''}`}
      onClick={handleClick}
      style={style}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
