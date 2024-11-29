'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';

export default function ActivityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Aktuelle Aktivitäten</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-[#8c52ff]" />
              <div>
                <h2 className="text-xl font-semibold">Nächste Workshops</h2>
                <p className="text-gray-500">Kommende Veranstaltungen und Workshops</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-[#8c52ff]" />
              <div>
                <h2 className="text-xl font-semibold">Community Updates</h2>
                <p className="text-gray-500">Neuigkeiten aus unserer Community</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 