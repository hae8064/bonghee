"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneEdges, sceneNodes } from "./scene-graph";

type Props = { active: boolean; reduced: boolean; compact: boolean; pointer: React.RefObject<{ x: number; y: number }> };

function makeLabel(text: string) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.fillStyle = "#9DB8E8";
  g.font = "600 26px ui-monospace, monospace";
  g.textAlign = "center";
  g.fillText(text, 128, 40);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Graph({ reduced, compact, pointer }: Omit<Props, "active">) {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { size } = useThree();

  const byId = useMemo(() => new Map(sceneNodes.map((n) => [n.id, new THREE.Vector3(...n.pos)])), []);
  const edges = useMemo(() => sceneEdges.map(([a, b]) => [byId.get(a)!, byId.get(b)!] as const), [byId]);
  const lineGeo = useMemo(() => {
    const pts: number[] = [];
    edges.forEach(([a, b]) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [edges]);
  const labels = useMemo(() => (compact ? [] : sceneNodes.map((n) => makeLabel(n.label))), [compact]);
  const packetCount = compact ? 10 : 22;
  const packets = useMemo(
    () =>
      Array.from({ length: packetCount }, (_, i) => ({
        edge: i % edges.length,
        t: (i * 0.137) % 1,
        v: 0.004 + ((i * 7) % 10) * 0.0006,
      })),
    [packetCount, edges.length],
  );
  const stars = useMemo(() => {
    const p: number[] = [];
    for (let i = 0; i < (compact ? 200 : 500); i++) {
      p.push((Math.sin(i * 12.9898) * 43758.5453) % 20, (Math.sin(i * 78.233) * 12345.678) % 12, -5 - (i % 20));
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    return g;
  }, [compact]);

  const offsetX = size.width < 900 ? 0 : 3.2;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    const p = pointer.current ?? { x: 0, y: 0 };
    g.position.x = offsetX;
    // on phones the graph sits below the copy so text stays readable
    g.position.y = compact ? -3.4 : 0;
    g.scale.setScalar(compact ? 0.7 : 1);
    if (!reduced) {
      g.rotation.y += (p.x * 0.8 + Math.sin(t * 0.2) * 0.25 - g.rotation.y) * 0.04;
      g.rotation.x += (p.y * 0.5 - g.rotation.x) * 0.04;
      nodeRefs.current.forEach((m, i) => {
        if (m) {
          m.rotation.y = t * 0.5 + i;
          m.rotation.x = t * 0.3;
        }
      });
    }
    packets.forEach((pk, i) => {
      const m = packetRefs.current[i];
      if (!m) return;
      if (!reduced) {
        pk.t += pk.v;
        if (pk.t > 1) {
          pk.t = 0;
          pk.edge = (pk.edge + 3 + i) % edges.length;
        }
      }
      const [a, b] = edges[pk.edge];
      m.position.lerpVectors(a, b, pk.t);
    });
  });

  return (
    <>
      <points geometry={stars}>
        <pointsMaterial color="#40598a" size={0.05} />
      </points>
      <group ref={group}>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color="#2C4A80" transparent opacity={0.8} />
        </lineSegments>
        {sceneNodes.map((n, i) => (
          <group key={n.id} position={n.pos}>
            <mesh ref={(m) => void (nodeRefs.current[i] = m)}>
              <icosahedronGeometry args={[n.primary ? 0.32 : 0.4, 1]} />
              <meshBasicMaterial color={n.primary ? "#7FB0FF" : "#3B82F6"} wireframe />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial color="#BFD6FF" />
            </mesh>
            {labels[i] && (
              <sprite position={[0, -0.75, 0]} scale={[2, 0.5, 1]}>
                <spriteMaterial map={labels[i]} transparent depthWrite={false} />
              </sprite>
            )}
          </group>
        ))}
        {packets.map((_, i) => (
          <mesh key={i} ref={(m) => void (packetRefs.current[i] = m)}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#8EF0FF" />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function ArchitectureScene({ active, reduced, compact, pointer }: Props) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={[1, 2]}
      frameloop={active && !reduced ? "always" : "demand"}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <Graph reduced={reduced} compact={compact} pointer={pointer} />
    </Canvas>
  );
}
