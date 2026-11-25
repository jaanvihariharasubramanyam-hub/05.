import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { PartId, VariantId } from '@/lib/recpSpec';
import { createSceneMaterials } from '@/lib/scene/materials';
import { buildPod } from '@/lib/scene/podModel';
import type { PodPart } from '@/lib/scene/podParts';
import { buildSite } from '@/lib/scene/siteModel';
import { applyWireframe } from '@/lib/scene/wireframe';
import { VIEW_POSES, type ViewPreset } from '@/lib/scene/views';

const EASE = 0.08;
const CLICK_TOLERANCE_PX = 5;

export interface RecpViewerProps {
  view: ViewPreset;
  variant: VariantId;
  wireframe: boolean;
  exploded: boolean;
  selectedPart: PartId | null;
  onSelectPart: (id: PartId | null) => void;
}

interface ViewerApi {
  setView: (view: ViewPreset) => void;
  setWireframe: (on: boolean) => void;
  setExploded: (on: boolean) => void;
  setSelected: (id: PartId | null) => void;
}

function partIdOf(object: THREE.Object3D): PartId | null {
  let current: THREE.Object3D | null = object;
  while (current) {
    if (current.userData.partId) return current.userData.partId as PartId;
    current = current.parent;
  }
  return null;
}

export function RecpViewer({
  view,
  variant,
  wireframe,
  exploded,
  selectedPart,
  onSelectPart,
}: RecpViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<ViewerApi | null>(null);
  const onSelectRef = useRef(onSelectPart);
  const viewRef = useRef(view);
  const wireframeRef = useRef(wireframe);
  const explodedRef = useRef(exploded);
  const selectedPartRef = useRef(selectedPart);
  viewRef.current = view;
  wireframeRef.current = wireframe;
  explodedRef.current = exploded;
  selectedPartRef.current = selectedPart;

  useEffect(() => {
    onSelectRef.current = onSelectPart;
  }, [onSelectPart]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b1220, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 1, 200000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const mats = createSceneMaterials();
    scene.add(new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 1.2));
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(3000, 8000, 5000);
    scene.add(sun);

    const pod = buildPod(mats, variant);
    const site = buildSite(mats);
    scene.add(pod.root, site.root);

    const highlight = new THREE.BoxHelper(pod.root, 0x38bdf8);
    highlight.visible = false;
    scene.add(highlight);

    let poseTarget = new THREE.Vector3();
    let poseCamera = new THREE.Vector3();
    let animating = false;
    let explodeT = 0;
    let explodeGoal = 0;
    let selected: PodPart | null = null;
    let frame = 0;

    const setView = (next: ViewPreset) => {
      const pose = VIEW_POSES[next];
      poseTarget = pose.target.clone();
      poseCamera = pose.target.clone().add(pose.offset);
      animating = true;
    };

    const setSelected = (id: PartId | null) => {
      selected = pod.parts.find((p) => p.id === id) ?? null;
      highlight.visible = selected !== null;
      if (selected) highlight.setFromObject(selected.object);
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downAt: { x: number; y: number } | null = null;

    const onDown = (e: PointerEvent) => {
      downAt = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      if (!downAt) return;
      const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
      downAt = null;
      if (moved > CLICK_TOLERANCE_PX) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pod.root.children, true);
      const hit = hits.map((h) => partIdOf(h.object)).find((id) => id !== null);
      onSelectRef.current(hit ?? null);
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointerup', onUp);

    const resize = () => {
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    setView(viewRef.current);
    camera.position.copy(poseCamera);
    controls.target.copy(poseTarget);
    animating = false;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (animating) {
        camera.position.lerp(poseCamera, EASE);
        controls.target.lerp(poseTarget, EASE);
        if (camera.position.distanceTo(poseCamera) < 0.5 && controls.target.distanceTo(poseTarget) < 0.5) {
          animating = false;
        }
      }
      explodeT += (explodeGoal - explodeT) * EASE;
      for (const part of pod.parts) {
        part.object.position.lerpVectors(part.rest, part.explode, explodeT);
      }
      if (selected) highlight.setFromObject(selected.object);
      controls.update();
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    applyWireframe(pod.root, wireframeRef.current, mats.ghost);
    applyWireframe(site.root, wireframeRef.current, mats.ghost);
    explodeGoal = explodedRef.current ? 1 : 0;
    setSelected(selectedPartRef.current);

    apiRef.current = {
      setView,
      setWireframe: (on) => {
        applyWireframe(pod.root, on, mats.ghost);
        applyWireframe(site.root, on, mats.ghost);
      },
      setExploded: (on) => {
        explodeGoal = on ? 1 : 0;
      },
      setSelected,
    };

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointerup', onUp);
      controls.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) obj.geometry.dispose();
      });
      Object.values(mats).forEach((m) => m.dispose());
      renderer.dispose();
      container.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, [variant]);

  useEffect(() => {
    apiRef.current?.setView(view);
  }, [view]);

  useEffect(() => {
    apiRef.current?.setWireframe(wireframe);
  }, [wireframe]);

  useEffect(() => {
    apiRef.current?.setExploded(exploded);
  }, [exploded]);

  useEffect(() => {
    apiRef.current?.setSelected(selectedPart);
  }, [selectedPart]);

  return <div ref={containerRef} className="h-full w-full overflow-hidden" />;
}
