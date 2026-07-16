'use client';

import { ReactNode } from 'react';

interface CheckoutButtonProps {
  children: ReactNode;
  className?: string;
  sectionName: string;
  href?: string;
}

export function CheckoutButton({ children, className, sectionName, href }: CheckoutButtonProps) {
  const CHECKOUT_LINK = href || "#offer";
  
  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (CHECKOUT_LINK.startsWith('#')) {
      e.preventDefault();
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click_checkout', { section: sectionName });
      }
      document.querySelector(CHECKOUT_LINK)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Allow normal anchor behavior if it's an external link
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click_checkout', { section: sectionName });
      }
    }
  };

  return (
    <a href={CHECKOUT_LINK} onClick={handleCheckoutClick} className={className}>
      {children}
    </a>
  );
}
