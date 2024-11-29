'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const roadmapItems = [
  {
    title: 'Platform Launch',
    description: 'Initial release with core features',
    status: 'completed',
    date: 'Q1 2024',
  },
  {
    title: 'Community Features',
    description: 'Adding discussion forums and peer support',
    status: 'in-progress',
    date: 'Q2 2024',
  },
  {
    title: 'Mentorship Program',
    description: 'Connecting users with industry mentors',
    status: 'planned',
    date: 'Q3 2024',
  },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Product Roadmap</h1>

      <div className="space-y-8">
        {roadmapItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <div
                      className={`mt-2 px-3 py-1 rounded-full text-sm ${
                        item.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 