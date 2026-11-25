import * as THREE from 'three';

const EDGE_NAME = 'wire-edges';

export function applyWireframe(root: THREE.Object3D, enabled: boolean, ghost: THREE.Material): void {
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;

    if (enabled) {
      obj.userData.solidMaterial ??= obj.material;
      obj.material = ghost;
      let edges = obj.children.find((c) => c.name === EDGE_NAME) as THREE.LineSegments | undefined;
      if (!edges) {
        edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(obj.geometry, 10),
          new THREE.LineBasicMaterial({ color: 0xbae6fd })
        );
        edges.name = EDGE_NAME;
        obj.add(edges);
      }
      edges.visible = true;
      return;
    }

    if (obj.userData.solidMaterial) obj.material = obj.userData.solidMaterial;
    const edges = obj.children.find((c) => c.name === EDGE_NAME);
    if (edges) edges.visible = false;
  });
}
