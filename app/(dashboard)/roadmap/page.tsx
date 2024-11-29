'use client';

import { Milestone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function RoadmapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Unser Weg</h1>
      
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">Phase 1: Community Aufbau</h2>
            <p className="text-gray-600">
              Aufbau einer starken, unterstützenden Community für FLINTA of Color
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">Phase 2: Mentoring Programm</h2>
            <p className="text-gray-600">
              Entwicklung und Start unseres Mentoring-Programms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">Phase 3: Workshops & Training</h2>
            <p className="text-gray-600">
              Regelmäßige Workshops und Skill-Training Angebote
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 