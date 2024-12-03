'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function VisionPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Unsere Vision</h1>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">Vielfalt in der Bildung</h2>
          <p className="text-gray-600">
            Wir setzen uns für mehr Diversität und Repräsentation in psychosozialen Studiengängen ein. 
            Unsere Vision ist es, dass die Universitäten die Vielfalt unserer Gesellschaft widerspiegeln.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">Empowerment</h2>
          <p className="text-gray-600">
            Durch Mentoring, Workshops und Community-Building stärken wir Mädchen und FLINTA of Color 
            auf ihrem Bildungs- und Karriereweg.
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <Button className="bg-gradient-to-b from-[#8c52ff] to-black text-white rounded-full px-8 py-4 inline-flex items-center justify-center">
          Mach mit!
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 