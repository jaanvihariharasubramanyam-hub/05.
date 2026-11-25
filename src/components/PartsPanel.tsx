import { SHARED_BOM, VARIANTS, type PartId, type VariantId } from '@/lib/recpSpec';

interface PartsPanelProps {
  selected: PartId | null;
  variant: VariantId;
  onSelect: (id: PartId | null) => void;
}

export function PartsPanel({ selected, variant, onSelect }: PartsPanelProps) {
  const option = VARIANTS[variant];
  const items = [
    { id: 'compute' as PartId, label: 'Compute module', value: option.compute, detail: option.computeDetail },
    { id: 'storage' as PartId, label: 'Storage', value: option.storage, detail: 'Variant-specific NVMe capacity.' },
    { id: 'heatsink' as PartId, label: 'Thermal assembly', value: option.thermal, detail: 'Variant-specific passive cooling assembly.' },
    ...SHARED_BOM.map((item) => ({ id: item.id as PartId, label: item.label, value: item.value, detail: item.detail })),
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bill of materials</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Variant {variant} parts</h2>
        </div>
        <span className="text-xs text-slate-500">{items.length} items</span>
      </div>
      <ul className="max-h-[520px] space-y-1 overflow-y-auto pr-1">
        {items.map((part, index) => {
          const active = part.id === selected;
          return (
            <li key={`${part.id}-${index}`}>
              <button
                type="button"
                onClick={() => onSelect(active ? null : part.id)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  active ? 'bg-sky-500/15 ring-1 ring-sky-400' : 'hover:bg-slate-800'
                }`}
              >
                <span className="mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-700 px-1.5 text-[10px] font-semibold text-slate-100">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-slate-100">{part.label}</span>
                  <span className="block text-xs text-sky-200/80">{part.value}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{part.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
