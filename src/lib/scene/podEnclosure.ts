import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { SceneMaterials } from '@/lib/scene/materials';
import { POD_SCALE, POLE_RADIUS, POLE_X, POLE_Z } from '@/lib/scene/layout';
import { BODY_D, BODY_H, BODY_W, createPart, mesh, type PodPart } from '@/lib/scene/podParts';

const HALF_W = BODY_W / 2;
const HALF_D = BODY_D / 2;
const BASE_H = 226;
const LID_H = BODY_H - BASE_H;
const CLAMP_RADIUS = (POLE_RADIUS + 3) / POD_SCALE;
const CLAMP_TUBE = 3.5 / POD_SCALE;
const POLE_LOCAL_X = POLE_X / POD_SCALE;
const POLE_LOCAL_Z = POLE_Z / POD_SCALE;
const FIN_COUNT = 20;
const FIN_PITCH = 10;
const FIN_THICKNESS = 2;
const FIN_REACH = 28;
const FIN_HEIGHT = 220;
const RADOME_RADIUS = 70;
const LID_BOLTS: [number, number][] = [
  [-130, -70],
  [130, -70],
  [-130, 70],
  [130, 70],
];

export function buildEnclosure(mats: SceneMaterials): PodPart[] {
  const base = createPart({
    id: 'base',
    rest: [0, 0, 0],
    explode: [0, -220, 0],
    shell: true,
    children: [mesh(new RoundedBoxGeometry(BODY_W, BASE_H, BODY_D, 4, 6), mats.enclosure, [0, -12, 0])],
  });

  const lid = createPart({
    id: 'lid',
    rest: [0, 0, 0],
    explode: [0, 280, 0],
    shell: true,
    children: [
      mesh(new RoundedBoxGeometry(BODY_W, LID_H, BODY_D, 4, 6), mats.enclosure, [0, 113, 0]),
      mesh(new THREE.BoxGeometry(BODY_W - 8, 3, BODY_D - 8), mats.gasket, [0, 99, 0]),
      ...LID_BOLTS.map(([x, z]) => mesh(new THREE.CylinderGeometry(5, 5, 4, 20), mats.steel, [x, 126, z])),
    ],
  });

  const fins: THREE.Mesh[] = [];
  const finGeometry = new THREE.BoxGeometry(FIN_REACH, FIN_HEIGHT, FIN_THICKNESS);
  for (const side of [-1, 1]) {
    for (let i = 0; i < FIN_COUNT; i++) {
      const z = -((FIN_COUNT - 1) * FIN_PITCH) / 2 + i * FIN_PITCH;
      fins.push(mesh(finGeometry, mats.black, [side * (HALF_W + FIN_REACH / 2), -10, z]));
    }
  }
  const heatsink = createPart({ id: 'heatsink', rest: [0, 0, 0], explode: [0, 0, 0], shell: true, children: fins });

  const cables = createPart({
    id: 'cables',
    rest: [0, -116, 0],
    explode: [0, 190, 0],
    shell: false,
    children: [
      mesh(new THREE.CylinderGeometry(14, 14, 28, 28), mats.black, [0, -12, 0]),
      mesh(new THREE.CylinderGeometry(17, 17, 7, 8), mats.steel, [0, -29, 0]),
    ],
  });

  const radome = createPart({
    id: 'radome',
    rest: [0, -62, HALF_D + 40],
    explode: [0, -260, HALF_D + 40],
    shell: false,
    children: [
      mesh(
        new THREE.SphereGeometry(RADOME_RADIUS, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
        mats.radome
      ),
      mesh(new THREE.CylinderGeometry(RADOME_RADIUS + 5, RADOME_RADIUS + 5, 4, 64), mats.gasket),
    ],
  });

  const grounding = createPart({
    id: 'grounding',
    rest: [118, -112, HALF_D + 4],
    explode: [150, -80, HALF_D + 90],
    shell: false,
    children: [
      mesh(new THREE.CylinderGeometry(8, 8, 8, 24), mats.steel, [0, 0, 0], [Math.PI / 2, 0, 0]),
      mesh(new THREE.CylinderGeometry(4, 4, 13, 6), mats.black, [0, 0, 5], [Math.PI / 2, 0, 0]),
    ],
  });

  const mountChildren: THREE.Object3D[] = [];
  for (const y of [78, -78]) {
    mountChildren.push(
      mesh(new THREE.TorusGeometry(CLAMP_RADIUS, CLAMP_TUBE, 12, 96), mats.steel, [0, y, 0], [Math.PI / 2, 0, 0]),
      mesh(new THREE.BoxGeometry(14, 16, 18), mats.steel, [CLAMP_RADIUS, y, 0]),
      mesh(new THREE.BoxGeometry(14, 16, 18), mats.steel, [-CLAMP_RADIUS, y, 0])
    );
  }
  const mount = createPart({
    id: 'mount',
    rest: [POLE_LOCAL_X, 0, POLE_LOCAL_Z],
    explode: [POLE_LOCAL_X, -320, POLE_LOCAL_Z],
    shell: false,
    children: mountChildren,
  });

  return [base, lid, heatsink, cables, radome, grounding, mount];
}
