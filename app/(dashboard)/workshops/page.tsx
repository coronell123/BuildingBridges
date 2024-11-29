'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

const workshops: Workshop[] = [
  {
    id: '1',
    title: 'Leadership Skills Development',
    description: 'Learn essential leadership skills for your future career.',
    date: '2024-04-15',
    time: '14:00',
    location: 'Online',
  },
  {
    id: '2',
    title: 'Navigating Workplace Challenges',
    description: 'Strategies for overcoming workplace discrimination and bias.',
    date: '2024-04-22',
    time: '15:00',
    location: 'Online',
  },
];

export default function WorkshopsPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Workshops</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <Card
            key={workshop.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedWorkshop(workshop)}
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{workshop.title}</h2>
              <p className="text-gray-600 mb-4">{workshop.description}</p>
              <div className="text-sm text-gray-500">
                <p>Date: {new Date(workshop.date).toLocaleDateString()}</p>
                <p>Time: {workshop.time}</p>
                <p>Location: {workshop.location}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedWorkshop} onOpenChange={() => setSelectedWorkshop(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedWorkshop?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{selectedWorkshop?.description}</p>
            <div className="text-sm text-gray-500">
              <p>Date: {selectedWorkshop && new Date(selectedWorkshop.date).toLocaleDateString()}</p>
              <p>Time: {selectedWorkshop?.time}</p>
              <p>Location: {selectedWorkshop?.location}</p>
            </div>
            <Button className="w-full">Register for Workshop</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 