import * as THREE from 'three';
import type { VariantId } from '@/lib/recpSpec';
import type { SceneMaterials } from '@/lib/scene/materials';
import { POD_CENTER_Y, POD_SCALE } from '@/lib/scene/layout';
import type { PodPart } from '@/lib/scene/podParts';
import { buildEnclosure } from '@/lib/scene/podEnclosure';
import { buildInternals } from '@/lib/scene/podInternals';

export interface PodModel {
  root: THREE.Group;
  parts: PodPart[];
}

export function buildPod(mats: SceneMaterials, variant: VariantId): PodModel {
  const parts = [...buildEnclosure(mats), ...buildInternals(mats, variant)];

  const root = new THREE.Group();
  root.position.set(0, POD_CENTER_Y, 0);
  root.scale.setScalar(POD_SCALE);
  root.add(...parts.map((p) => p.object));

  return { root, parts };
}
