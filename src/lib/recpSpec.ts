export type VariantId = 'A' | 'B';

export interface VariantSpec {
  id: VariantId;
  name: string;
  subtitle: string;
  compute: string;
  computeDetail: string;
  storage: string;
  thermal: string;
  targetPower: string;
  powerUtilisation: string;
  unusedPsuCapacity: string;
  prototypeCost: string;
  hundredUnitCost: string;
  volumeCost: string;
  note: string;
}

export const VARIANTS: Record<VariantId, VariantSpec> = {
  A: {
    id: 'A',
    name: 'Orin Nano 8GB',
    subtitle: 'Efficient edge AI for broad deployment',
    compute: 'NVIDIA Jetson Orin Nano 8GB',
    computeDetail: '40 TOPS dense / 67 TOPS Super · 6x Cortex-A78AE · 8GB LPDDR5 · 102 GB/s · no NVENC · 7–25W',
    storage: '256GB NVMe M.2 2280',
    thermal: 'Heatsink only',
    targetPower: '65W design target',
    powerUtilisation: '43.33% of 150W PSU',
    unusedPsuCapacity: '85W nominal headroom',
    prototypeCost: '₹82,000',
    hundredUnitCost: '₹52,000',
    volumeCost: '₹42,000',
    note: 'Best for 1–2 cameras, YOLOv8s/n and CPU encode. Lower heat and cost for 100+ sites.',
  },
  B: {
    id: 'B',
    name: 'Orin NX 16GB',
    subtitle: 'Higher-performance multi-model edge AI',
    compute: 'NVIDIA Jetson Orin NX 16GB',
    computeDetail: '100 TOPS dense / 157 TOPS Super · 8x Cortex-A78AE · 16GB LPDDR5 · 102.4 GB/s · 1x NVENC 4K60 · 2x NVDLA · 10–40W',
    storage: '512GB NVMe M.2 2280',
    thermal: 'Heatsink + heat pipe',
    targetPower: '95W design target',
    powerUtilisation: '63.33% of 150W PSU',
    unusedPsuCapacity: '55W nominal headroom',
    prototypeCost: '₹1,01,500',
    hundredUnitCost: '₹68,000',
    volumeCost: '₹56,000',
    note: 'Best for 3+ cameras, tracking, classification, recording and hardware encode at busy junctions.',
  },
};

export interface BomItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  variant?: VariantId;
}

export const SHARED_BOM: BomItem[] = [
  {
    id: 'carrier',
    label: 'Carrier board',
    value: 'Shared Orin Nano / NX carrier',
    detail: '69.6 × 45 mm, 260-pin SO-DIMM, pin-compatible across both variants.',
  },
  {
    id: 'thermalInterface',
    label: 'Thermal interface',
    value: 'Thermal paste / pad',
    detail: 'Shared module-to-heatsink interface.',
  },
  {
    id: 'camera',
    label: 'Camera',
    value: '360° rotatable CCTV camera, IP67',
    detail: 'Top-mounted adjustable camera module for all-around coverage.',
  },
  {
    id: 'radar',
    label: 'Radar',
    value: '60 GHz mmWave radar',
    detail: 'Mounted behind the RF-transparent radome.',
  },
  {
    id: 'v2iRadio',
    label: 'V2I radio',
    value: '5.9 GHz C-V2X / DSRC with GPS, IMU and mic array',
    detail: 'Shared roadside connectivity and positioning subsystem.',
  },
  {
    id: 'antennas',
    label: 'V2I antennas',
    value: '2× left + right, 5.9 GHz',
    detail: 'Dual external antennas for the V2I radio.',
  },
  {
    id: 'micArray',
    label: 'Mic array',
    value: '5CH MEMS microphone array',
    detail: 'Front acoustic array for siren detection and beamforming.',
  },
  {
    id: 'oled',
    label: 'Status display',
    value: 'OLED power / network / alert indicator',
    detail: 'Front-facing service status display.',
  },
  {
    id: 'power',
    label: 'Power input',
    value: '48V DC in · 150W external PSU',
    detail: 'RECP-PMB-120W power-management board with at least 120W continuous regulated output.',
  },
  {
    id: 'grounding',
    label: 'Grounding',
    value: 'M6 grounding bolt',
    detail: 'Chassis bonding point to pole earth.',
  },
  {
    id: 'mount',
    label: 'Mount',
    value: 'Pole mounting bracket',
    detail: 'Clamp-on mounting hardware for the roadside pole.',
  },
  {
    id: 'cables',
    label: 'Cables / glands',
    value: 'IP66 sealed glands and harness',
    detail: 'Protected power and signal entry from the pod to the cabinet.',
  },
];

export interface PartInfo {
  id: PartId;
  ref: string;
  name: string;
  detail: string;
}

export type PartId =
  | 'lid'
  | 'base'
  | 'heatsink'
  | 'compute'
  | 'carrier'
  | 'storage'
  | 'thermalInterface'
  | 'camera'
  | 'radar'
  | 'radome'
  | 'v2iRadio'
  | 'antennas'
  | 'micArray'
  | 'oled'
  | 'power'
  | 'grounding'
  | 'mount'
  | 'cables';

export const POD_PARTS: PartInfo[] = [
  { id: 'lid', ref: '01', name: 'Anodized steel enclosure lid', detail: 'Black anodized steel lid with sealed perimeter gasket.' },
  { id: 'base', ref: '02', name: 'Anodized steel enclosure base', detail: '300 × 250 × 180 mm pod body with passive side heatsinks.' },
  { id: 'heatsink', ref: '03', name: 'Passive thermal assembly', detail: 'Variant A uses a heatsink; Variant B adds a heat pipe for the 95W design target.' },
  { id: 'compute', ref: '04', name: 'Compute module', detail: 'Variant-specific NVIDIA Jetson Orin Nano 8GB or Orin NX 16GB.' },
  { id: 'carrier', ref: '05', name: 'Shared carrier board', detail: 'Orin Nano / NX pin-compatible carrier, 69.6 × 45 mm, 260-pin SO-DIMM.' },
  { id: 'storage', ref: '06', name: 'NVMe M.2 2280 storage', detail: '256GB in Variant A; 512GB in Variant B.' },
  { id: 'thermalInterface', ref: '07', name: 'Thermal paste / pad', detail: 'Shared module-to-heatsink thermal interface.' },
  { id: 'camera', ref: '08', name: '360° rotatable IP67 camera', detail: 'Top-mounted camera with a rotating lens housing for all-around coverage.' },
  { id: 'radar', ref: '09', name: '60 GHz mmWave radar', detail: 'All-weather radar module located behind the radome.' },
  { id: 'radome', ref: '10', name: 'Light-grey RF-transparent radome', detail: 'Large matte-grey hemisphere on the lower front face.' },
  { id: 'v2iRadio', ref: '11', name: '5.9 GHz V2I radio', detail: 'C-V2X / DSRC radio with GPS, IMU and microphone subsystem.' },
  { id: 'antennas', ref: '12', name: 'Dual V2I antennas', detail: 'Left and right 5.9 GHz antennas.' },
  { id: 'micArray', ref: '13', name: '5CH MEMS mic array', detail: 'Front acoustic array behind the perforated grille.' },
  { id: 'oled', ref: '14', name: 'OLED status indicator', detail: 'Power, network and alert status on the front face.' },
  { id: 'power', ref: '15', name: '48V power input', detail: '150W PSU with the shared RECP-PMB-120W power-management board.' },
  { id: 'grounding', ref: '16', name: 'M6 grounding bolt', detail: 'Chassis-to-pole earth bonding point.' },
  { id: 'mount', ref: '17', name: 'Pole mounting bracket', detail: 'Clamp-on bracket for the roadside pole.' },
  { id: 'cables', ref: '18', name: 'IP66 cables and glands', detail: 'Sealed harness connecting pod, power and controller cabinet.' },
];

export interface SpecRow {
  label: string;
  value: string;
}

export function getSpecRows(variant: VariantId): SpecRow[] {
  const selected = VARIANTS[variant];
  return [
    { label: 'Pod size', value: '300 × 250 × 180 mm (W × H × D)' },
    { label: 'Compute', value: selected.compute },
    { label: 'Storage', value: selected.storage },
    { label: 'Thermal', value: selected.thermal },
    { label: 'Power target', value: selected.targetPower },
    { label: 'Power headroom', value: `${selected.unusedPsuCapacity} · ${selected.powerUtilisation}` },
    { label: 'Power architecture', value: '48V DC · 120W continuous PMB · 150W PSU' },
    { label: 'Camera', value: '360° rotatable CCTV, IP67' },
    { label: 'Radar', value: '60 GHz mmWave behind light-grey RF-transparent radome' },
    { label: 'V2I', value: '5.9 GHz C-V2X / DSRC with GPS and IMU' },
    { label: 'Enclosure', value: 'Anodized steel, black passive heatsinks' },
    { label: 'Protection', value: 'IP66 pod, IP67 camera' },
    { label: 'Operating temperature', value: '−40 °C to +60 °C design range' },
  ];
}

export interface CostRow {
  label: string;
  value: string;
}

export const COST_ROWS: CostRow[] = [
  { label: 'Jetson module', value: '₹45,000 Nano · ₹65,000 NX at 1 pc' },
  { label: 'Carrier + 120W PMB', value: '₹12,500–₹13,500' },
  { label: '150W PSU with PoE', value: '₹3,500' },
  { label: '360° camera + ANPR', value: '₹9,500' },
  { label: 'Radar + grey radome', value: '₹5,500' },
  { label: 'V2I radio + GPS / IMU / mic', value: '₹9,000' },
  { label: 'NX enclosure thermal upgrade', value: '₹10,500–₹12,000' },
  { label: 'Cables, mount, assembly, test', value: '₹3,500' },
];
