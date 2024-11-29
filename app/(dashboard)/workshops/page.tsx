'use client';

import { Heart, Star, Users2 } from 'lucide-react';

export default function WorkshopsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Unsere Workshops</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-[#8c52ff] text-white">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Self-Care Workshops</h2>
          <p className="mt-2 text-gray-500">
            Mach mit bei Self-Care Workshops, in denen wir uns mit mentaler Gesundheit, 
            Selbstfürsorge und Gemeinschaft beschäftigen.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-[#8c52ff] text-white">
            <Star className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Skills Training</h2>
          <p className="mt-2 text-gray-500">
            Wir bieten Trainings an, in denen wir euch Skills für eure berufliche Zukunft 
            und zum Uni-Einstieg an die Hand geben.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-[#8c52ff] text-white">
            <Users2 className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Mentoring</h2>
          <p className="mt-2 text-gray-500">
            Wir vermitteln dir eine*n BIPoC Mentor*in, die dich auf deinem Weg berät, 
            unterstützt und inspiriert.
          </p>
        </div>
      </div>
    </div>
  );
} 