"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { markGeometry } from "@/lib/mark";

/** Builds the extruded mark from the exact same numbers as the SVG logo. */
function useSparkGeometry() {
  return useMemo(() => {
    const { tips, ctrls } = markGeometry(1 / 50);
    const shape = new THREE.Shape();

    shape.moveTo(tips[0][0], -tips[0][1]);
    for (let i = 0; i < tips.length; i++) {
      const c = ctrls[i];
      const next = tips[(i + 1) % tips.length];
      shape.quadraticCurveTo(c[0], -c[1], next[0], -next[1]);
    }
    shape.closePath();

    // A small bevel only. Anything larger self-intersects where the long arms
    // taper, which shows up as a hard white sliver under the key light.
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.035,
      bevelOffset: 0,
      bevelSegments: 5,
      curveSegments: 32,
    });
    geometry.center();
    geometry.computeVertexNormals();

    return geometry;
  }, []);
}

function Spark({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useSparkGeometry();
  const { viewport } = useThree();

  const spin = useRef(0.25);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useFrame((state, delta) => {
    const node = mesh.current;
    if (!node) return;

    const dt = Math.min(delta, 0.05);
    const { x, y } = state.pointer;

    // idle spin, damped toward a slow baseline once a fling settles
    if (!dragging.current) {
      spin.current += (0.25 - spin.current) * dt * 1.2;
    }
    node.rotation.y += spin.current * dt;

    // tilt toward the cursor
    const targetX = -y * 0.42;
    const targetZ = x * 0.18;
    node.rotation.x += (targetX - node.rotation.x) * dt * 3;
    node.rotation.z += (targetZ - node.rotation.z) * dt * 3;

    // gentle float
    node.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.09;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.4;

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      scale={scale}
      onPointerDown={(e) => {
        dragging.current = true;
        lastX.current = e.clientX;
        (e.target as Element).setPointerCapture?.(e.pointerId);
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        (e.target as Element).releasePointerCapture?.(e.pointerId);
      }}
      onPointerOut={() => {
        dragging.current = false;
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastX.current;
        lastX.current = e.clientX;
        spin.current = THREE.MathUtils.clamp(spin.current + dx * 0.045, -9, 9);
      }}
      onClick={() => {
        spin.current += 4.5;
      }}
    >
      {/* Matte on purpose. A glossier finish blows out the narrow side faces
          of the long arms into hard white streaks. */}
      <meshStandardMaterial color={color} roughness={0.62} metalness={0.04} />
    </mesh>
  );
}

export default function SparkScene() {
  const [color, setColor] = useState("#c4562f");

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      if (value) setColor(value);
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.9} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#ffd9c2" />
      <pointLight position={[-2, 3, 2]} intensity={4} distance={12} />
      <Spark color={color} />
    </Canvas>
  );
}
