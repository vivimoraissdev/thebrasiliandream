'use client';

import { ReactNode } from 'react';

interface CheckoutButtonProps {
  children: ReactNode;
  className?: string;
  sectionName: string;
}

export function CheckoutButton({ children, className, sectionName }: CheckoutButtonProps) {
  const CHECKOUT_LINK = "#";
  
  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_checkout', { section: sectionName });
    }
    window.location.href = CHECKOUT_LINK;
  };

  return (
    <a href={CHECKOUT_LINK} onClick={handleCheckoutClick} className={className}>
      {children}
    </a>
  );
}
