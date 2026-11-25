import * as THREE from 'three';

export function createSceneMaterials() {
  return {
    enclosure: new THREE.MeshStandardMaterial({ color: 0x20252a, roughness: 0.48, metalness: 0.7 }),
    gasket: new THREE.MeshStandardMaterial({ color: 0x090b0d, roughness: 0.9 }),
    black: new THREE.MeshStandardMaterial({ color: 0x101316, roughness: 0.32, metalness: 0.18 }),
    radome: new THREE.MeshStandardMaterial({ color: 0x969994, roughness: 0.72, metalness: 0.08 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xb9c0c5, roughness: 0.3, metalness: 0.88 }),
    pcb: new THREE.MeshStandardMaterial({ color: 0x1f6b43, roughness: 0.6, metalness: 0.15 }),
    compute: new THREE.MeshStandardMaterial({ color: 0x1d4d3a, roughness: 0.5, metalness: 0.25 }),
    storage: new THREE.MeshStandardMaterial({ color: 0x185c8a, roughness: 0.45, metalness: 0.25 }),
    chip: new THREE.MeshStandardMaterial({ color: 0x272c32, roughness: 0.4, metalness: 0.4 }),
    thermal: new THREE.MeshStandardMaterial({ color: 0xa8adb0, roughness: 0.8 }),
    grille: new THREE.MeshStandardMaterial({ color: 0x51585b, roughness: 0.72, metalness: 0.35 }),
    pole: new THREE.MeshStandardMaterial({ color: 0x9aa4b0, roughness: 0.42, metalness: 0.75 }),
    cabinet: new THREE.MeshStandardMaterial({ color: 0x5f6b78, roughness: 0.5, metalness: 0.5 }),
    ground: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 1 }),
    cable: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5, metalness: 0.1 }),
    oled: new THREE.MeshStandardMaterial({ color: 0x35d5c5, emissive: 0x19a99f, emissiveIntensity: 1.5, roughness: 0.3 }),
    lens: new THREE.MeshStandardMaterial({ color: 0x193854, roughness: 0.08, metalness: 0.82 }),
    ghost: new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    }),
  };
}

export type SceneMaterials = ReturnType<typeof createSceneMaterials>;
