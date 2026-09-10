'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { getGlobeStops, type CommunityStoryData } from '@/lib/content/communityStories';

type StoryGlobeProps = {
  story: CommunityStoryData;
  t: (en: string, de: string) => string;
};

function latLngToXYZ(lat: number, lng: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function latLngToTarget(lat: number, lng: number) {
  const point = latLngToXYZ(lat, lng, 1).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(point, new THREE.Vector3(0, 0, 1));
  const e = new THREE.Euler().setFromQuaternion(q, 'XYZ');
  return { x: e.x, y: e.y, z: e.z };
}

function buildLandTexture() {
  const texCanvas = document.createElement('canvas');
  texCanvas.width = 1024;
  texCanvas.height = 512;
  const ctx = texCanvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(texCanvas);

  ctx.fillStyle = '#120A28';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = 'rgba(181,128,255,0.10)';
  ctx.lineWidth = 0.5;
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * 1024;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let lat = -90; lat <= 90; lat += 30) {
    const y = ((90 - lat) / 180) * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const toXY = (lon: number, lat: number) => [((lon + 180) / 360) * 1024, ((90 - lat) / 180) * 512] as const;
  const fillLand = (pts: [number, number][], color = 'rgba(85,55,145,0.92)') => {
    ctx.beginPath();
    pts.forEach(([lon, lat], i) => {
      const [x, y] = toXY(lon, lat);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };

  fillLand([
    [-18, 16], [0, 5], [-5, -5], [10, -35], [35, -35], [42, -12], [50, 12], [43, 12], [38, 20], [55, 12],
    [45, 12], [35, 22], [32, 32], [25, 38], [12, 38], [2, 6], [-5, 5], [-18, 16],
  ]);
  fillLand([
    [-10, 36], [3, 43], [10, 44], [14, 41], [18, 42], [24, 38], [28, 42], [33, 42], [28, 56], [24, 60],
    [28, 70], [10, 58], [2, 52], [-5, 48], [-10, 44], [-10, 36],
  ]);
  fillLand([
    [26, 42], [40, 38], [55, 22], [68, 24], [80, 18], [92, 22], [105, 20], [120, 20], [130, 34], [145, 44],
    [135, 48], [120, 52], [100, 54], [80, 62], [60, 68], [40, 68], [28, 68], [26, 62], [36, 56], [26, 42],
  ]);
  fillLand([
    [-60, 46], [-68, 44], [-80, 44], [-90, 46], [-95, 50], [-110, 50], [-125, 48], [-140, 60], [-168, 72],
    [-140, 70], [-120, 76], [-80, 74], [-60, 62], [-52, 50], [-60, 46],
  ]);
  fillLand([
    [-36, -6], [-48, 0], [-50, -10], [-52, -32], [-68, -56], [-76, -52], [-78, -36], [-80, -6], [-76, 2],
    [-70, 8], [-62, 10], [-50, 2], [-36, -6],
  ]);
  fillLand([
    [114, -22], [122, -18], [132, -12], [138, -14], [150, -24], [152, -30], [148, -38], [138, -36],
    [132, -34], [116, -34], [114, -28], [114, -22],
  ]);

  const tex = new THREE.CanvasTexture(texCanvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createMarker(lat: number, lng: number, color: number, idx: number) {
  const group = new THREE.Group();
  group.position.copy(latLngToXYZ(lat, lng, 1.015));

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 16, 16),
    new THREE.MeshBasicMaterial({ color })
  );
  group.add(dot);

  const ringMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.025, 0.032, 24), ringMat);
  group.add(ring);
  group.lookAt(0, 0, 0);
  group.rotateX(Math.PI);
  group.userData = { idx, ring, ringMat, color };
  return group;
}

export function StoryGlobe({ story, t }: StoryGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const stepRef = useRef(0);
  const rotRef = useRef({ x: 0.15, y: 0.4, z: 0 });
  const dragRef = useRef({ active: false, x: 0, y: 0, moved: false });
  const autoRotateRef = useRef(true);
  const animRef = useRef(0);
  const rotateAnimRef = useRef(0);

  const stops = useMemo(
    () => getGlobeStops(story.id, story.chapters.length),
    [story.id, story.chapters.length]
  );
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        o: Math.random() * 0.6 + 0.1,
        d: `${2 + Math.random() * 4}s`,
        delay: `${Math.random() * 3}s`,
      })),
    [story.id]
  );

  const chapter = story.chapters[step] ?? story.chapters[0];
  const total = story.chapters.length;

  const goToStep = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(idx, stops.length - 1));
      stepRef.current = next;
      setStep(next);
      setPanelOpen(true);
      autoRotateRef.current = false;

      const target = latLngToTarget(stops[next].lat, stops[next].lng);
      const start = { ...rotRef.current };
      let dy = target.y - start.y;
      while (dy > Math.PI) dy -= 2 * Math.PI;
      while (dy < -Math.PI) dy += 2 * Math.PI;
      const endY = start.y + dy;
      const dur = 80;
      const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      let tFrame = 0;
      cancelAnimationFrame(rotateAnimRef.current);
      const tick = () => {
        tFrame += 1;
        const p = ease(Math.min(tFrame / dur, 1));
        rotRef.current.x = start.x + (target.x - start.x) * p;
        rotRef.current.y = start.y + (endY - start.y) * p;
        rotRef.current.z = start.z + (target.z - start.z) * p;
        if (tFrame < dur) rotateAnimRef.current = requestAnimationFrame(tick);
        else {
          rotRef.current.x = target.x;
          rotRef.current.y = endY;
          rotRef.current.z = target.z;
        }
      };
      tick();
    },
    [stops]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 2.45;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const tex = buildLandTexture();
    const earth = new THREE.Group();
    scene.add(earth);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshBasicMaterial({ map: tex })
    );
    earth.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x9152ff,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
      })
    );
    earth.add(atmosphere);

    earth.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.002, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xb580ff, wireframe: true, transparent: true, opacity: 0.045 })
      )
    );

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const markers = stops.map((stop, i) => {
      const marker = createMarker(stop.lat, stop.lng, stop.color, i);
      globe.add(marker);
      return marker;
    });

    const setSize = () => {
      const w = wrap.clientWidth || 1;
      const h = wrap.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(wrap);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onDown = (e: PointerEvent) => {
      dragRef.current = { active: true, x: e.clientX, y: e.clientY, moved: false };
      autoRotateRef.current = false;
    };
    const onUp = (e: PointerEvent) => {
      if (dragRef.current.active && !dragRef.current.moved) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(markers, true);
        const hit = hits[0]?.object.parent;
        if (hit && typeof hit.userData.idx === 'number') goToStep(hit.userData.idx);
      }
      dragRef.current.active = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragRef.current.moved = true;
      rotRef.current.y += dx * 0.005;
      rotRef.current.x += dy * 0.003;
      rotRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotRef.current.x));
      dragRef.current.x = e.clientX;
      dragRef.current.y = e.clientY;
    };

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);

    const animate = () => {
      if (autoRotateRef.current) rotRef.current.y += 0.0015;
      const { x, y, z } = rotRef.current;
      earth.rotation.set(x, y, z);

      const tNow = Date.now() * 0.002;
      markers.forEach((m, i) => {
        const current = stepRef.current;
        const scale = i === current ? 1 + 0.4 * Math.sin(tNow + i * 0.8) : 1;
        m.userData.ring.scale.setScalar(scale);
        m.userData.ringMat.opacity = i === current ? 0.6 : i < current ? 0.25 : 0.15;
        (m.children[0] as THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>).material.color.setHex(
          i === current ? 0xb580ff : i < current ? 0x6baa8a : stops[i].color
        );
      });

      renderer.render(scene, camera);
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    goToStep(0);

    return () => {
      cancelAnimationFrame(animRef.current);
      cancelAnimationFrame(rotateAnimRef.current);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointermove', onMove);
      renderer.dispose();
      tex.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((mat) => mat.dispose());
        }
      });
    };
  }, [goToStep, stops]);

  if (!chapter) return null;

  return (
    <div className={`globe-journey ${panelOpen ? 'is-open' : ''}`}>
      <div className="gj-progress" style={{ width: `${((step + 1) / total) * 100}%` }} />
      <div className="gj-stars" aria-hidden>
        {stars.map((s) => (
          <span
            key={s.id}
            className="gj-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDuration: s.d,
              animationDelay: s.delay,
              ['--o' as string]: s.o,
            }}
          />
        ))}
      </div>
      <div ref={wrapRef} className="gj-globe-wrap">
        <canvas ref={canvasRef} className="gj-canvas" aria-label={t('Interactive globe', 'Interaktiver Globus')} />
      </div>
      <aside className={`gj-panel ${panelOpen ? 'open' : ''}`}>
        <div className="gj-eyebrow">
          {t('Chapter', 'Kapitel')} {chapter.num} · {chapter.label}
        </div>
        <div className="gj-location">{chapter.period}</div>
        <h3 className="gj-heading" dangerouslySetInnerHTML={{ __html: chapter.heading }} />
        <div className="gj-divider" />
        <p className="gj-body" dangerouslySetInnerHTML={{ __html: chapter.body }} />
        {chapter.quote ? <blockquote className="gj-quote">&ldquo;{chapter.quote}&rdquo;</blockquote> : null}
      </aside>
      <div className="gj-controls">
        <button type="button" className="gj-btn" onClick={() => goToStep(step - 1)} disabled={step === 0}>
          ← {t('Back', 'Zurück')}
        </button>
        <span className="gj-counter">
          {step + 1} / {total}
        </span>
        <button
          type="button"
          className="gj-btn gj-btn-primary"
          onClick={() => goToStep(step + 1)}
          disabled={step === total - 1}
        >
          {t('Next', 'Weiter')} →
        </button>
      </div>
    </div>
  );
}
