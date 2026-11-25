import { X } from 'lucide-react';
import type { PartInfo } from '@/lib/recpSpec';

interface SelectedPartCardProps {
  part: PartInfo;
  onClose: () => void;
}

export function SelectedPartCard({ part, onClose }: SelectedPartCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-up absolute inset-x-4 bottom-4 flex items-start gap-3 rounded-2xl border border-sky-500/40 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur sm:inset-x-auto sm:right-4 sm:max-w-sm"
    >
      <span className="mt-0.5 flex h-7 min-w-7 items-center justify-center rounded-full bg-sky-500 px-2 text-xs font-bold text-slate-950">
        {part.ref}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Selected part</p>
        <p className="mt-0.5 text-sm font-semibold text-white">{part.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">{part.detail}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Clear selection"
        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
