import { IndianRupee, ShieldCheck, WalletCards } from 'lucide-react';
import { COST_ROWS, getSpecRows, VARIANTS, type VariantId } from '@/lib/recpSpec';

interface SpecSheetProps {
  variant: VariantId;
}

export function SpecSheet({ variant }: SpecSheetProps) {
  const selected = VARIANTS[variant];

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-sky-400" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-white">Technical specification</h2>
        </div>
        <dl className="divide-y divide-slate-800 rounded-xl border border-slate-800">
          {getSpecRows(variant).map((row) => (
            <div key={row.label} className="grid grid-cols-[0.9fr_1.5fr] gap-3 px-3 py-2.5">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{row.label}</dt>
              <dd className="text-sm leading-relaxed text-slate-100">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <WalletCards className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-white">Prototype cost targets</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <CostCard label="1 unit" value={selected.prototypeCost} />
          <CostCard label="100 units" value={selected.hundredUnitCost} />
          <CostCard label="1000+" value={selected.volumeCost} />
        </div>
        <dl className="divide-y divide-slate-800 rounded-xl border border-slate-800">
          {COST_ROWS.map((row) => (
            <div key={row.label} className="grid grid-cols-[1fr_1.25fr] gap-3 px-3 py-2.5">
              <dt className="text-xs text-slate-400">{row.label}</dt>
              <dd className="text-right text-xs leading-relaxed text-slate-100">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs leading-relaxed text-slate-500">
          Design-target budgets, not measured or guaranteed consumption. Final validation depends on the exact camera, radar, V2I radio and carrier board models.
        </p>
      </section>

      <section className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
        <div className="flex items-center gap-2 text-amber-200">
          <IndianRupee className="h-4 w-4" aria-hidden="true" />
          <p className="text-sm font-semibold">Power design target</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          48V DC input, 150W continuous-rated PSU and RECP-PMB-120W with at least 120W continuous regulated output after conversion losses. Variant {variant} is budgeted at {selected.targetPower.replace(' design target', '')}.
        </p>
      </section>
    </div>
  );
}

interface CostCardProps {
  label: string;
  value: string;
}

function CostCard({ label, value }: CostCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
      <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
