"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/lib/design-system/components';

/**
 * Interactive Card Client Component
 * This component is fully self-contained with predefined actions
 */
export interface InteractiveCardProps {
  title?: string;
  description?: string;
  actionType?: 'default' | 'custom' | 'none';
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function InteractiveCard({
  title = "Interactive Card",
  description = "This entire card is clickable",
  actionType = 'default',
  children,
  footer
}: InteractiveCardProps) {
  // Define handlers here inside the client component
  const handleDefaultClick = () => {
    alert('Card clicked!');
  };
  
  const handleCustomClick = () => {
    console.log("Custom action clicked");
  };
  
  // Determine which click handler to use based on actionType
  const getClickHandler = () => {
    switch(actionType) {
      case 'default': return handleDefaultClick;
      case 'custom': return handleCustomClick;
      case 'none': return undefined;
      default: return handleDefaultClick;
    }
  };

  return (
    <Card variant="interactive" onClick={getClickHandler()}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children || <p>Hover over me to see the interactive effect. I'm fully clickable!</p>}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
} 