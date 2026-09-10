'use client';

import { useState } from 'react';
import { WorkshopCard } from './WorkshopCard';
import { WorkshopDetailModal } from './WorkshopDetailModal';
import type { WorkshopItem } from './workshop-data';

export function WorkshopGrid({
  items,
  labels,
}: {
  items: WorkshopItem[];
  labels: { eyebrow: string; title: string; emptyTitle?: string; emptyBody?: string };
}) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopItem | null>(null);

  return (
    <>
      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9152FF]">{labels.eyebrow}</p>
            <h3 className="font-lora text-2xl font-bold text-[#1A1033]">{labels.title}</h3>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="rounded-[24px] border border-[rgba(145,82,255,0.16)] bg-white px-6 py-10 text-center shadow-[0_8px_24px_rgba(145,82,255,0.08)]">
            <p className="font-lora text-lg font-bold text-[#1A1033]">
              {labels.emptyTitle ?? 'No upcoming workshops right now'}
            </p>
            {labels.emptyBody ? (
              <p className="mx-auto mt-2 max-w-xl text-[0.92rem] leading-relaxed text-[#6B5F8A]">{labels.emptyBody}</p>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <WorkshopCard key={item.id} workshop={item} onViewDetails={setSelectedWorkshop} />
            ))}
          </div>
        )}
      </section>

      {selectedWorkshop ? (
        <WorkshopDetailModal workshop={selectedWorkshop} onClose={() => setSelectedWorkshop(null)} />
      ) : null}
    </>
  );
}
