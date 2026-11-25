import * as THREE from 'three';
import type { SceneMaterials } from '@/lib/scene/materials';
import { POD_CENTER_Y, POD_SCALE, POLE_RADIUS, POLE_X, POLE_Z } from '@/lib/scene/layout';

const POLE_HEIGHT = 5200;
const ARM_Y = 4700;
const ARM_LENGTH = 1800;
const HEAD_W = 300;
const HEAD_H = 900;
const HEAD_D = 300;
const CABINET_X = 900;
const CABINET_W = 1200;
const CABINET_H = 1500;
const CABINET_D = 600;
const GLAND_BOTTOM_LOCAL_Y = -140;
const CABLE_RADIUS = 9;
const CABLE_CABINET_Y = 1200;

export interface SiteModel {
  root: THREE.Group;
}

function mesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  position: [number, number, number] = [0, 0, 0],
  rotation: [number, number, number] = [0, 0, 0]
): THREE.Mesh {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(...position);
  m.rotation.set(...rotation);
  return m;
}

function buildCable(mats: SceneMaterials): THREE.Mesh {
  const start = new THREE.Vector3(0, POD_CENTER_Y + GLAND_BOTTOM_LOCAL_Y * POD_SCALE, 0);
  const bend = new THREE.Vector3(0, CABLE_CABINET_Y, 0);
  const entry = new THREE.Vector3(CABINET_X - CABINET_W / 2 + 100, CABLE_CABINET_Y, 0);
  const curve = new THREE.CatmullRomCurve3([start, bend, entry]);
  const geometry = new THREE.TubeGeometry(curve, 96, CABLE_RADIUS, 12, false);
  return new THREE.Mesh(geometry, mats.cable);
}

export function buildSite(mats: SceneMaterials): SiteModel {
  const root = new THREE.Group();
  root.name = 'site';

  const ground = mesh(new THREE.BoxGeometry(6000, 40, 4000), mats.ground, [0, -20, -400]);
  const pole = mesh(
    new THREE.CylinderGeometry(POLE_RADIUS, POLE_RADIUS, POLE_HEIGHT, 48),
    mats.pole,
    [POLE_X, POLE_HEIGHT / 2, POLE_Z]
  );
  const arm = mesh(
    new THREE.CylinderGeometry(35, 35, ARM_LENGTH, 32),
    mats.pole,
    [POLE_X + ARM_LENGTH / 2, ARM_Y, POLE_Z],
    [0, 0, Math.PI / 2]
  );
  const head = new THREE.Group();
  head.name = 'signal-head';
  head.position.set(POLE_X + ARM_LENGTH - 150, ARM_Y - HEAD_H / 2 - 60, POLE_Z);
  head.add(mesh(new THREE.BoxGeometry(HEAD_W, HEAD_H, HEAD_D), mats.black));
  const lamps = [0xef4444, 0xf59e0b, 0x22c55e].map(
    (color) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.35 })
  );
  lamps.forEach((lamp, i) => {
    head.add(
      mesh(
        new THREE.CylinderGeometry(105, 105, 10, 32),
        lamp,
        [0, HEAD_H / 2 - 150 - i * 300, HEAD_D / 2 + 5],
        [Math.PI / 2, 0, 0]
      )
    );
  });

  const cabinet = new THREE.Group();
  cabinet.name = 'controller-cabinet';
  cabinet.position.set(CABINET_X, CABINET_H / 2, POLE_Z);
  cabinet.add(mesh(new THREE.BoxGeometry(CABINET_W, CABINET_H, CABINET_D), mats.cabinet));
  cabinet.add(
    mesh(new THREE.BoxGeometry(CABINET_W - 120, 40, 8), mats.black, [0, CABINET_H / 2 - 120, CABINET_D / 2 + 4])
  );

  root.add(ground, pole, arm, head, cabinet, buildCable(mats));

  return { root };
}
