import React from 'react';
import { colors, typography } from '@/lib/design-system/config';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/lib/design-system/components';
import { BasicInteractiveCard, CustomInteractiveCard } from './components/InteractiveComponents';

/**
 * Design System Demonstration Page
 * 
 * This page showcases all the elements of the Building Bridges design system.
 */
export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background-secondary pb-20">
      <div className="bg-gradient-to-r from-primary to-secondary-teal py-24 px-4 md:px-6">
        <div className="container-content text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Building Bridges Design System</h1>
          <p className="text-white/80 max-w-3xl mx-auto text-xl">
            A comprehensive and modern design system that establishes consistent patterns and components.
          </p>
        </div>
      </div>
      
      <div className="container-content -mt-16">
        <Card className="mb-16 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <p className="text-lg">
              This design system provides a set of standardized components, colors, and typography to create a consistent and professional user experience. It's built with accessibility and usability in mind, following modern design principles.
            </p>
          </CardContent>
        </Card>
        
        {/* Colors Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Colors</CardTitle>
              <CardDescription>The color palette defines the visual identity of the Building Bridges platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Primary Colors */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Primary Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ColorCard color={colors.primary.main} name="Primary" hex="#8C52FF" />
                    <ColorCard color={colors.primary.light} name="Primary Light" hex="#A37EFF" />
                    <ColorCard color={colors.primary.dark} name="Primary Dark" hex="#6B38DB" />
                  </div>
                </div>
                
                {/* Secondary Colors */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Secondary Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ColorCard color={colors.secondary.green} name="Secondary Green" hex="#10B981" />
                    <ColorCard color={colors.secondary.teal} name="Secondary Teal" hex="#06B6D4" />
                  </div>
                </div>
                
                {/* Accent Colors */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Accent Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ColorCard color={colors.accent.red} name="Accent Red" hex="#EF4444" />
                    <ColorCard color={colors.accent.yellow} name="Accent Yellow" hex="#F59E0B" />
                  </div>
                </div>
                
                {/* Text Colors */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Text Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <ColorCard color={colors.text.primary} name="Text Primary" hex="#111827" />
                    <ColorCard color={colors.text.secondary} name="Text Secondary" hex="#4B5563" />
                    <ColorCard color={colors.text.muted} name="Text Muted" hex="#6B7280" />
                    <ColorCard color={colors.text.light} name="Text Light" hex="#FFFFFF" darkBg />
                  </div>
                </div>
                
                {/* Background Colors */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Background Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <ColorCard color={colors.background.primary} name="Background Primary" hex="#FFFFFF" border />
                    <ColorCard color={colors.background.secondary} name="Background Secondary" hex="#F9FAFB" border />
                    <ColorCard color={colors.background.hover} name="Background Hover" hex="#F3F4F6" border />
                    <ColorCard color={colors.background.dark} name="Background Dark" hex="#111827" darkBg />
                  </div>
                </div>
                
                {/* Border Colors */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Border Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ColorCard color={colors.border.default} name="Border Default" hex="#E5E7EB" border />
                    <ColorCard color={colors.border.light} name="Border Light" hex="#F3F4F6" border />
                    <ColorCard color={colors.border.dark} name="Border Dark" hex="#D1D5DB" border />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Typography</CardTitle>
              <CardDescription>Typography guidelines for creating a clear visual hierarchy and readable content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Headings */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Headings</h3>
                  <div className="space-y-4 bg-background-secondary p-6 rounded-md">
                    <div className="space-y-1">
                      <h1>Heading 1 (36px Bold)</h1>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                    <div className="space-y-1">
                      <h2>Heading 2 (28px Bold)</h2>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                    <div className="space-y-1">
                      <h3>Heading 3 (24px Semi-Bold)</h3>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                    <div className="space-y-1">
                      <h4>Heading 4 (20px Semi-Bold)</h4>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                    <div className="space-y-1">
                      <h5>Heading 5 (18px Semi-Bold)</h5>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                    <div className="space-y-1">
                      <h6>Heading 6 (16px Semi-Bold)</h6>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                  </div>
                </div>
                
                {/* Body Text */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Body Text</h3>
                  <div className="space-y-4 bg-background-secondary p-6 rounded-md">
                    <div className="space-y-1">
                      <p>
                        Body Text (16px Regular) - This is an example of body text used throughout
                        the website. It should be easy to read with good contrast and line height.
                        The primary font family is {typography.fontFamily.primary.split(',')[0]}.
                      </p>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                    <div className="space-y-1">
                      <small>
                        Small Text (14px Regular) - This smaller text is used for less important information,
                        captions, and metadata throughout the interface.
                      </small>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs italic">
                        Caption Text (12px Italic) - Used for image captions, footnotes, and other tertiary information.
                      </p>
                      <small className="text-text-muted">Font: {typography.fontFamily.primary}</small>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Components Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Components</CardTitle>
              <CardDescription>Reusable UI components that follow the Building Bridges design system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-12">
                {/* Buttons */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Buttons</h3>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Button Variants</h4>
                      <div className="flex flex-wrap gap-4 items-center bg-background-secondary p-6 rounded-md">
                        <Button variant="default">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="teal">Teal</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="share">Share</Button>
                        <Button variant="save">Save</Button>
                        <Button variant="toggle">Toggle</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Button Sizes</h4>
                      <div className="flex flex-wrap items-center gap-4 bg-background-secondary p-6 rounded-md">
                        <Button size="xs">Extra Small</Button>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                        <Button size="icon">🔍</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Button Shapes</h4>
                      <div className="flex flex-wrap gap-4 bg-background-secondary p-6 rounded-md">
                        <Button rounded="default">Default Rounded</Button>
                        <Button rounded="sm">Slightly Rounded</Button>
                        <Button rounded="lg">More Rounded</Button>
                        <Button rounded="full">Fully Rounded</Button>
                        <Button rounded="none">Square Edges</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Button States</h4>
                      <div className="flex flex-wrap gap-4 items-center bg-background-secondary p-6 rounded-md">
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                        <Button loading>Loading</Button>
                        <Button variant="outline" loading>Processing</Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Buttons with Icons</h4>
                      <div className="flex flex-wrap gap-4 items-center bg-background-secondary p-6 rounded-md">
                        <Button 
                          leftIcon={
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5v14"></path>
                            </svg>
                          }
                        >
                          Add New
                        </Button>
                        <Button 
                          variant="outline" 
                          rightIcon={
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          }
                        >
                          Next Step
                        </Button>
                        <Button 
                          variant="ghost"
                          leftIcon={
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                          }
                        >
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Example Buttons</h4>
                      <div className="flex flex-wrap gap-4 items-center bg-background-secondary p-6 rounded-md">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-500">Inactive</span>
                          <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <Button variant="share">Share</Button>
                        <Button variant="save">Save</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cards */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Cards</h3>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Card Variants</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Default Card</CardTitle>
                            <CardDescription>This is a default card with standard styling</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>This card uses the default background color and styling with subtle shadow.</p>
                          </CardContent>
                          <CardFooter>
                            <Button size="sm">Action</Button>
                          </CardFooter>
                        </Card>

                        <Card variant="secondary">
                          <CardHeader>
                            <CardTitle>Secondary Card</CardTitle>
                            <CardDescription>This card uses the secondary background</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>This card uses the secondary background color for subtle contrast.</p>
                          </CardContent>
                          <CardFooter>
                            <Button size="sm" variant="secondary">Action</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Special Card Variants</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <BasicInteractiveCard />
                        <CustomInteractiveCard />

                        <Card variant="glass" className="bg-primary/30">
                          <CardHeader>
                            <CardTitle className="text-white">Glass Card</CardTitle>
                            <CardDescription className="text-white/70">Modern glass morphism design</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-white/90">This card has a translucent glass effect with backdrop blur.</p>
                          </CardContent>
                          <CardFooter>
                            <Button size="sm" variant="share">Action</Button>
                          </CardFooter>
                        </Card>

                        <Card variant="elevated">
                          <CardHeader>
                            <CardTitle>Elevated Card</CardTitle>
                            <CardDescription>Card with enhanced shadow</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>This card has an enhanced shadow for a more prominent appearance.</p>
                          </CardContent>
                          <CardFooter>
                            <Button size="sm">Action</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Card Padding Sizes</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card padding="sm">
                          <CardHeader padding="sm">
                            <CardTitle>Small Padding</CardTitle>
                            <CardDescription>Compact card with small padding</CardDescription>
                          </CardHeader>
                          <CardContent padding="sm">
                            <p>This card uses small padding for a more compact layout.</p>
                          </CardContent>
                          <CardFooter padding="sm">
                            <Button size="sm">Action</Button>
                          </CardFooter>
                        </Card>

                        <Card padding="md">
                          <CardHeader padding="md">
                            <CardTitle>Medium Padding</CardTitle>
                            <CardDescription>Card with medium padding</CardDescription>
                          </CardHeader>
                          <CardContent padding="md">
                            <p>This card uses medium padding for a balanced layout.</p>
                          </CardContent>
                          <CardFooter padding="md">
                            <Button size="sm">Action</Button>
                          </CardFooter>
                        </Card>

                        <Card padding="lg">
                          <CardHeader padding="lg">
                            <CardTitle>Large Padding</CardTitle>
                            <CardDescription>Card with large padding (default)</CardDescription>
                          </CardHeader>
                          <CardContent padding="lg">
                            <p>This card uses large padding (the default) for a spacious layout.</p>
                          </CardContent>
                          <CardFooter padding="lg">
                            <Button size="sm">Action</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <div className="mt-16 text-center">
          <p className="text-text-muted">
            Building Bridges Design System • Created with care for a consistent user experience
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying color swatches
interface ColorCardProps {
  color: string;
  name: string;
  hex: string;
  border?: boolean;
  darkBg?: boolean;
}

function ColorCard({ color, name, hex, border = false, darkBg = false }: ColorCardProps) {
  return (
    <Card variant="outline" className="overflow-hidden">
      <div
        className={`h-24 flex items-center justify-center ${
          border ? 'border-b border-border' : ''
        }`}
        style={{ backgroundColor: color }}
      >
        <span className={darkBg ? 'text-white' : 'text-black'}>Aa</span>
      </div>
      <div className="p-3 space-y-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-text-muted">{hex}</p>
      </div>
    </Card>
  );
} 