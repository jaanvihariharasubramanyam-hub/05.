import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { VariantId } from '@/lib/recpSpec';
import type { SceneMaterials } from '@/lib/scene/materials';
import { BODY_D, createPart, mesh, type PodPart } from '@/lib/scene/podParts';

const HALF_D = BODY_D / 2;
const WIRE_COLORS = [0xdc2626, 0x111316, 0xf59e0b, 0x2563eb];

function buildCamera(mats: SceneMaterials): PodPart {
  const rotary = new THREE.Group();
  rotary.add(
    mesh(new THREE.TorusGeometry(42, 5, 14, 48), mats.steel, [0, -18, 0]),
    mesh(new THREE.CylinderGeometry(38, 38, 58, 32), mats.black, [0, 0, 0], [Math.PI / 2, 0, 0]),
    mesh(new THREE.CylinderGeometry(29, 29, 8, 32), mats.steel, [0, 0, 32], [Math.PI / 2, 0, 0]),
    mesh(new THREE.CylinderGeometry(23, 23, 5, 32), mats.lens, [0, 0, 38], [Math.PI / 2, 0, 0]),
    mesh(new THREE.CylinderGeometry(10, 10, 12, 20), mats.black, [-42, 0, 0], [0, 0, Math.PI / 2]),
    mesh(new THREE.CylinderGeometry(10, 10, 12, 20), mats.black, [42, 0, 0], [0, 0, Math.PI / 2])
  );
  rotary.rotation.y = Math.PI / 10;
  return createPart({
    id: 'camera',
    rest: [0, 150, 0],
    explode: [0, 300, 100],
    shell: false,
    children: [rotary],
  });
}

function buildMicArray(mats: SceneMaterials): PodPart {
  const children: THREE.Object3D[] = [
    mesh(new RoundedBoxGeometry(190, 48, 5, 4, 4), mats.grille),
  ];
  for (const x of [-70, -35, 0, 35, 70]) {
    for (const y of [-12, 0, 12]) {
      children.push(mesh(new THREE.CylinderGeometry(2.2, 2.2, 1, 12), mats.black, [x, y, 3], [Math.PI / 2, 0, 0]));
    }
  }
  return createPart({
    id: 'micArray',
    rest: [0, 30, HALF_D + 4],
    explode: [0, 115, 0],
    shell: false,
    children,
  });
}

function buildAntennas(mats: SceneMaterials): PodPart {
  const children: THREE.Object3D[] = [];
  for (const x of [-120, 120]) {
    children.push(
      mesh(new THREE.CylinderGeometry(11, 11, 7, 20), mats.black, [x, 0, 0]),
      mesh(new THREE.CylinderGeometry(2.5, 5, 145, 16), mats.black, [x, 75, 0])
    );
  }
  return createPart({
    id: 'antennas',
    rest: [0, 88, -25],
    explode: [0, 88, -190],
    shell: false,
    children,
  });
}

function buildHarness(): PodPart {
  const children = WIRE_COLORS.map((color, i) =>
    mesh(
      new THREE.CylinderGeometry(3, 3, 190, 10),
      new THREE.MeshStandardMaterial({ color, roughness: 0.6 }),
      [0, 10 - i * 8, i * 5 - 8],
      [0, 0, Math.PI / 2]
    )
  );
  return createPart({ id: 'cables', rest: [0, -15, -45], explode: [-210, 50, -45], shell: false, children });
}

export function buildInternals(mats: SceneMaterials, variant: VariantId): PodPart[] {
  const compute = createPart({
    id: 'compute',
    rest: [-25, 2, -15],
    explode: [-25, 205, -15],
    shell: false,
    children: [
      mesh(new THREE.BoxGeometry(150, 5, 92), mats.compute),
      mesh(new THREE.BoxGeometry(variant === 'B' ? 76 : 62, 10, variant === 'B' ? 58 : 48), mats.chip, [0, 7, 0]),
      mesh(new THREE.BoxGeometry(variant === 'B' ? 34 : 25, 7, 18), mats.black, [45, 8, -25]),
    ],
  });

  const carrier = createPart({
    id: 'carrier',
    rest: [0, -70, -10],
    explode: [0, 95, -10],
    shell: false,
    children: [
      mesh(new THREE.BoxGeometry(178, 5, 118), mats.pcb),
      mesh(new THREE.BoxGeometry(162, 7, 10), mats.black, [0, 7, -45]),
      mesh(new THREE.BoxGeometry(10, 8, 88), mats.steel, [-82, 6, 0]),
    ],
  });

  const storage = createPart({
    id: 'storage',
    rest: [78, 35, -12],
    explode: [130, 155, -12],
    shell: false,
    children: [
      mesh(new THREE.BoxGeometry(92, 4, 32), mats.storage),
      mesh(new THREE.BoxGeometry(22, 6, 18), mats.chip, [25, 5, 0]),
    ],
  });

  const thermalInterface = createPart({
    id: 'thermalInterface',
    rest: [0, -40, 55],
    explode: [0, 30, 120],
    shell: false,
    children: [
      mesh(new THREE.BoxGeometry(42, 3, 42), mats.thermal, [-75, 0, 0]),
      mesh(new THREE.BoxGeometry(42, 3, 42), mats.thermal, [75, 0, 0]),
    ],
  });

  const radar = createPart({
    id: 'radar',
    rest: [0, -68, 50],
    explode: [0, -155, 100],
    shell: false,
    children: [
      mesh(new THREE.BoxGeometry(78, 4, 48), mats.pcb),
      mesh(new THREE.BoxGeometry(42, 3, 30), mats.chip, [0, 4, 4]),
    ],
  });

  const v2iRadio = createPart({
    id: 'v2iRadio',
    rest: [-82, 60, -22],
    explode: [-175, 100, -22],
    shell: false,
    children: [
      mesh(new THREE.BoxGeometry(58, 8, 72), mats.pcb),
      mesh(new THREE.BoxGeometry(28, 5, 24), mats.chip, [0, 8, 0]),
    ],
  });

  const power = createPart({
    id: 'power',
    rest: [0, -100, -12],
    explode: [0, -5, -12],
    shell: false,
    children: [
      mesh(new THREE.BoxGeometry(220, 6, 70), mats.pcb),
      mesh(new THREE.BoxGeometry(30, 9, 30), mats.chip, [-75, 7, 0]),
      mesh(new THREE.BoxGeometry(30, 9, 30), mats.chip, [0, 7, 0]),
      mesh(new THREE.BoxGeometry(30, 9, 30), mats.chip, [75, 7, 0]),
    ],
  });

  const oled = createPart({
    id: 'oled',
    rest: [0, -25, HALF_D + 5],
    explode: [0, 65, HALF_D + 100],
    shell: false,
    children: [
      mesh(new RoundedBoxGeometry(82, 20, 5, 3, 3), mats.black),
      mesh(new RoundedBoxGeometry(48, 8, 2, 2, 2), mats.oled, [0, 0, 3]),
    ],
  });

  return [compute, carrier, storage, thermalInterface, buildCamera(mats), radar, v2iRadio, buildAntennas(mats), buildMicArray(mats), oled, power, buildHarness()];
}
