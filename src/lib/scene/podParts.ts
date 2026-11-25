import * as THREE from 'three';
import type { PartId } from '@/lib/recpSpec';

export type Vec = [number, number, number];

export const BODY_W = 300;
export const BODY_H = 250;
export const BODY_D = 180;

export interface PodPart {
  id: PartId;
  object: THREE.Group;
  rest: THREE.Vector3;
  explode: THREE.Vector3;
  shell: boolean;
}

interface PartSpec {
  id: PartId;
  rest: Vec;
  explode: Vec;
  shell: boolean;
  children: THREE.Object3D[];
}

export function mesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  position: Vec = [0, 0, 0],
  rotation: Vec = [0, 0, 0]
): THREE.Mesh {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(...position);
  m.rotation.set(...rotation);
  return m;
}

function makeFadeable(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const material = (obj.material as THREE.MeshStandardMaterial).clone();
    material.transparent = true;
    obj.material = material;
  });
}

export function createPart({ id, rest, explode, shell, children }: PartSpec): PodPart {
  const object = new THREE.Group();
  object.name = id;
  object.userData.partId = id;
  object.add(...children);
  object.position.set(...rest);
  makeFadeable(object);
  return {
    id,
    object,
    rest: new THREE.Vector3(...rest),
    explode: new THREE.Vector3(...explode),
    shell,
  };
}
