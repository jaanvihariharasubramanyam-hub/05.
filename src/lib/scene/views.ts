import * as THREE from 'three';
import { POD_CENTER_Y } from '@/lib/scene/layout';

export type ViewPreset = 'iso' | 'front' | 'side' | 'top' | 'site';

interface ViewPose {
  target: THREE.Vector3;
  offset: THREE.Vector3;
}

const POD_TARGET = new THREE.Vector3(0, POD_CENTER_Y, 0);

export const VIEW_POSES: Record<ViewPreset, ViewPose> = {
  iso: { target: POD_TARGET, offset: new THREE.Vector3(780, 330, 960) },
  front: { target: POD_TARGET, offset: new THREE.Vector3(0, 0, 1180) },
  side: { target: POD_TARGET, offset: new THREE.Vector3(1180, 0, 0) },
  top: { target: POD_TARGET, offset: new THREE.Vector3(0, 1180, 180) },
  site: {
    target: new THREE.Vector3(0, 2700, -100),
    offset: new THREE.Vector3(6500, 2600, 9000),
  },
};
