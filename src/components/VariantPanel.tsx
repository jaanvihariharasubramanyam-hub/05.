import { Cpu, HardDrive, Thermometer, Zap } from 'lucide-react';
import { VARIANTS, type VariantId } from '@/lib/recpSpec';

interface VariantPanelProps {
  variant: VariantId;
  onVariantChange: (variant: VariantId) => void;
}

export function VariantPanel({ variant, onVariantChange }: VariantPanelProps) {
  const selected = VARIANTS[variant];

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">Compute variant</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Choose the BOM configuration</h2>
        </div>
        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-xs font-semibold text-sky-200">
          Variant {variant}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {(Object.keys(VARIANTS) as VariantId[]).map((id) => {
          const option = VARIANTS[id];
          const active = id === variant;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => onVariantChange(id)}
              className={`rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                active
                  ? 'border-sky-400 bg-sky-500/10 shadow-lg shadow-sky-950/30'
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-600 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">Variant {id}</span>
                  <p className="mt-1 font-semibold text-white">{option.name}</p>
                </div>
                <span className="text-lg font-semibold text-white">{option.targetPower.replace(' design target', '')}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{option.subtitle}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-800 pt-3 text-xs">
                <span className="text-slate-400">Storage<strong className="mt-0.5 block text-slate-100">{option.storage.replace(' NVMe M.2 2280', '')}</strong></span>
                <span className="text-slate-400">Thermal<strong className="mt-0.5 block text-slate-100">{option.thermal.replace('Heatsink ', '')}</strong></span>
                <span className="text-slate-400">Prototype<strong className="mt-0.5 block text-slate-100">{option.prototypeCost}</strong></span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-sm font-semibold text-white">{selected.compute}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{selected.computeDetail}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <Metric icon={Cpu} label="Compute" value={selected.compute.split('NVIDIA Jetson ')[1] ?? selected.compute} />
          <Metric icon={HardDrive} label="Storage" value={selected.storage.replace(' NVMe M.2 2280', '')} />
          <Metric icon={Thermometer} label="Thermal" value={selected.thermal} />
          <Metric icon={Zap} label="PSU headroom" value={selected.unusedPsuCapacity} />
        </div>
        <p className="mt-4 border-t border-slate-800 pt-3 text-xs leading-relaxed text-slate-300">{selected.note}</p>
      </div>
    </section>
  );
}

interface MetricProps {
  icon: typeof Cpu;
  label: string;
  value: string;
}

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
      <span className="text-xs text-slate-400">{label}<strong className="mt-0.5 block text-slate-100">{value}</strong></span>
    </div>
  );
}
