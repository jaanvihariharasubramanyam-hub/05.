import { useState } from 'react';
import { MousePointerClick, RotateCw, ZoomIn } from 'lucide-react';
import { PartsPanel } from '@/components/PartsPanel';
import { RecpViewer } from '@/components/RecpViewer';
import { SelectedPartCard } from '@/components/SelectedPartCard';
import { SpecSheet } from '@/components/SpecSheet';
import { ViewerToolbar } from '@/components/ViewerToolbar';
import { VariantPanel } from '@/components/VariantPanel';
import { POD_PARTS, VARIANTS, type PartId, type VariantId } from '@/lib/recpSpec';
import type { ViewPreset } from '@/lib/scene/views';

export default function App() {
  const [variant, setVariant] = useState<VariantId>('A');
  const [view, setView] = useState<ViewPreset>('iso');
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartId | null>(null);

  const selectedInfo = POD_PARTS.find((part) => part.id === selectedPart) ?? null;
  const selectedVariantInfo = selectedInfo
    ? {
        ...selectedInfo,
        ...(selectedPart === 'compute' && {
          name: VARIANTS[variant].compute,
          detail: VARIANTS[variant].computeDetail,
        }),
        ...(selectedPart === 'storage' && {
          detail: `${VARIANTS[variant].storage} for Variant ${variant}.`,
        }),
        ...(selectedPart === 'heatsink' && {
          detail: `${VARIANTS[variant].thermal} for the ${VARIANTS[variant].targetPower} configuration.`,
        }),
      }
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Retrofit Edge Computing Pod
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-white">RECP 2.0</h1>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[1fr_360px]">
        <div className="flex min-w-0 flex-col gap-4">
          <VariantPanel variant={variant} onVariantChange={setVariant} />
          <ViewerToolbar
            view={view}
            onViewChange={setView}
            wireframe={wireframe}
            onWireframeChange={setWireframe}
            exploded={exploded}
            onExplodedChange={setExploded}
          />
          <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:h-[72vh]">
            <RecpViewer
              view={view}
              variant={variant}
              wireframe={wireframe}
              exploded={exploded}
              selectedPart={selectedPart}
              onSelectPart={setSelectedPart}
            />
            <div className="pointer-events-none absolute left-4 top-4 hidden flex-wrap gap-2 text-xs font-medium text-slate-200 sm:flex">
              <span className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5">
                <RotateCw className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                Drag to rotate
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5">
                <ZoomIn className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                Scroll to zoom
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5">
                <MousePointerClick className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                Click a part
              </span>
            </div>
            {selectedVariantInfo && (
              <SelectedPartCard part={selectedVariantInfo} onClose={() => setSelectedPart(null)} />
            )}
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Pole, controller cabinet and signal head sizes are placeholders until measured values are
            provided.
          </p>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <PartsPanel selected={selectedPart} variant={variant} onSelect={setSelectedPart} />
          <SpecSheet variant={variant} />
        </aside>
      </main>
    </div>
  );
}
