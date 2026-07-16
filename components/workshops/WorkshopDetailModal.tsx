'use client';

import Image from 'next/image';
import { Calendar, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import type { WorkshopItem } from './workshop-data';

type WorkshopDetailModalProps = {
  workshop: WorkshopItem;
  onClose: () => void;
};

const CLOSE_ANIMATION_MS = 380;

export function WorkshopDetailModal({ workshop, onClose }: WorkshopDetailModalProps) {
  const { isDe } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setIsVisible(false);
    window.setTimeout(onClose, CLOSE_ANIMATION_MS);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,16,51,0.5)] p-6 opacity-0 backdrop-blur-[3px] transition-opacity duration-[280ms] ease-out ${
        isVisible ? 'opacity-100' : ''
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="workshop-detail-title"
    >
      <div
        className={`relative max-h-[88vh] w-full max-w-[560px] overflow-y-auto rounded-[28px] border border-[rgba(145,82,255,0.16)] bg-white opacity-0 shadow-[0_18px_48px_rgba(26,16,51,0.24)] transition-[transform,opacity] duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.96]'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[28px] bg-[#F6F0FF]">
          <Image
            src={workshop.image}
            alt={isDe ? `Flyer: ${workshop.title}` : `Flyer preview for ${workshop.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-contain p-3"
          />
          <button
            type="button"
            onClick={handleClose}
            aria-label={isDe ? 'Details schließen' : 'Close details'}
            className="absolute right-4 top-4 z-[2] flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#1A1033] shadow-sm transition hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 md:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#EEE4FF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#7642DB]">
              {workshop.categoryLabel}
            </span>
            <span className="rounded-full border border-[#DCCBFF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#6B5F8A]">
              {workshop.modeLabel}
            </span>
          </div>

          <h2 id="workshop-detail-title" className="font-lora text-[1.45rem] font-bold leading-tight text-[#1A1033]">
            {workshop.title}
          </h2>

          <div className="mt-4 space-y-2 text-[0.86rem] text-[#6B5F8A]">
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#9152FF]" />
              {workshop.date} · {workshop.time}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#9152FF]" />
              {workshop.location}
            </p>
          </div>

          <div className="my-4 h-px bg-[rgba(145,82,255,0.16)]" />

          <p className="text-[0.9rem] leading-7 text-[#5E5677]">{workshop.description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={workshop.registrationUrl ?? '/sign-up'}
              target={workshop.registrationUrl ? '_blank' : undefined}
              rel={workshop.registrationUrl ? 'noopener noreferrer' : undefined}
              className="inline-flex min-w-[160px] flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(145,82,255,0.3)] transition hover:brightness-[1.04]"
            >
              {isDe ? 'Am Workshop teilnehmen' : 'Join workshop'}
            </a>
            <a
              href={workshop.image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#D7C3FF] bg-white px-4 py-2.5 text-sm font-semibold text-[#6E44C5] transition hover:border-[#9152FF] hover:text-[#5C32BE]"
            >
              {isDe ? 'Flyer ansehen' : 'View flyer'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
