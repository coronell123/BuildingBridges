"use client";

import React from 'react';
import { InteractiveCard } from './InteractiveCard';

/**
 * Client components for the design system page that require interactivity
 * These components encapsulate all event handlers to ensure they stay within client components
 */

export function BasicInteractiveCard() {
  return (
    <InteractiveCard 
      title="Basic Interactive Card" 
      description="Click me to see an alert"
      actionType="default"
      footer={<span className="text-sm text-text-muted">Click to interact</span>}
    />
  );
}

export function CustomInteractiveCard() {
  return (
    <InteractiveCard
      title="Custom Interactive Card"
      description="With custom content and action"
      actionType="custom"
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p>Custom interactive component with different behavior</p>
      </div>
    </InteractiveCard>
  );
} 