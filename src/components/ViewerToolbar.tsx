import {
  Box,
  Expand,
  Grid3x3,
  LayoutGrid,
  MapPin,
  RectangleVertical,
  Square,
  type LucideIcon,
} from 'lucide-react';
import type { ViewPreset } from '@/lib/scene/views';

const VIEWS: { id: ViewPreset; label: string; icon: LucideIcon }[] = [
  { id: 'iso', label: 'Isometric', icon: Box },
  { id: 'front', label: 'Front', icon: Square },
  { id: 'side', label: 'Side', icon: RectangleVertical },
  { id: 'top', label: 'Top', icon: LayoutGrid },
  { id: 'site', label: 'Full site', icon: MapPin },
];

interface ToggleProps {
  label: string;
  icon: LucideIcon;
  checked: boolean;
  onChange: (on: boolean) => void;
}

function Toggle({ label, icon: Icon, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        checked
          ? 'border-sky-400/60 bg-sky-500/10 text-sky-200'
          : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
      <span className={`h-2 w-2 rounded-full transition ${checked ? 'bg-sky-400' : 'bg-slate-600'}`} />
    </button>
  );
}

interface ViewerToolbarProps {
  view: ViewPreset;
  onViewChange: (view: ViewPreset) => void;
  wireframe: boolean;
  onWireframeChange: (on: boolean) => void;
  exploded: boolean;
  onExplodedChange: (on: boolean) => void;
}

export function ViewerToolbar({
  view,
  onViewChange,
  wireframe,
  onWireframeChange,
  exploded,
  onExplodedChange,
}: ViewerToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div role="group" aria-label="Camera view" className="flex flex-wrap rounded-xl bg-slate-800/80 p-1">
        {VIEWS.map((v) => {
          const Icon = v.icon;
          const active = view === v.id;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={active}
              onClick={() => onViewChange(v.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                active ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {v.label}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <Toggle label="Wireframe" icon={Grid3x3} checked={wireframe} onChange={onWireframeChange} />
        <Toggle label="Exploded" icon={Expand} checked={exploded} onChange={onExplodedChange} />
      </div>
    </div>
  );
}
