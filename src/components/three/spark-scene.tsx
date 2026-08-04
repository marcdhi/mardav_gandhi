"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { markGeometry } from "@/lib/mark";

/**
 * The spark, with a face.
 *
 * It watches the cursor, blinks on its own, shuts its eyes when you spin it,
 * and gets visibly bored if you leave it alone. The silhouette is identical to
 * the flat logo, so it is the same character at 16px and at 480px.
 */

type Pointer = { x: number; y: number; lastMove: number };

const EYE_X = 0.14;
const EYE_Y = 0.075;
const EYE_Z = 0.16;
const EYE_R = 0.072;
const BORED_AFTER = 6; // seconds of no interaction

/** Keeps the head turn gentle even when the cursor is far off to one side. */
const clamp1 = (n: number) => Math.max(-1, Math.min(1, n));

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

function Spark({
  color,
  pointer,
  scale,
}: {
  color: string;
  pointer: React.RefObject<Pointer>;
  scale: number;
}) {
  const bob = useRef<THREE.Group>(null);
  const turn = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);

  const geometry = useSparkGeometry();

  const spin = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const openness = useRef(1);
  const blinkUntil = useRef(0);
  const nextBlink = useRef(0);
  const wideUntil = useRef(0);
  const hopUntil = useRef(0);
  const lastPoke = useRef(0);

  useFrame((_state, delta) => {
    const turning = turn.current;
    const floating = bob.current;
    if (!turning || !floating) return;

    const dt = Math.min(delta, 0.05);
    // One clock for everything, including the pointer listener and the event
    // handlers below, so idle time is always measured against the same base.
    const now = performance.now() / 1000;
    const { x, y, lastMove } = pointer.current;

    if (nextBlink.current === 0) nextBlink.current = now + 1.8;

    const idle = now - Math.max(lastMove, lastPoke.current);
    const bored = idle > BORED_AFTER;

    // --- body -------------------------------------------------------------
    if (dragging.current) {
      spin.current = THREE.MathUtils.clamp(spin.current, -11, 11);
    } else {
      spin.current -= spin.current * Math.min(dt * 2.4, 1);
      // Once a fling has mostly bled off, settle back to facing forward.
      if (Math.abs(spin.current) < 0.55) {
        const home = Math.round(turning.rotation.y / (Math.PI * 2)) * Math.PI * 2;
        turning.rotation.y += (home - turning.rotation.y) * Math.min(dt * 2.6, 1);
      }
    }
    turning.rotation.y += spin.current * dt;

    // Looks toward the cursor, lets its head drop when ignored.
    const tiltX = bored ? 0.26 : -clamp1(y) * 0.2;
    const tiltZ = bored ? Math.sin(now * 0.5) * 0.08 : clamp1(x) * 0.1;
    turning.rotation.x += (tiltX - turning.rotation.x) * Math.min(dt * 3, 1);
    turning.rotation.z += (tiltZ - turning.rotation.z) * Math.min(dt * 3, 1);

    const breathe = bored ? 0.35 : 0.65;
    floating.position.y = Math.sin(now * breathe) * (bored ? 0.05 : 0.09);

    if (now < hopUntil.current) {
      const t = 1 - (hopUntil.current - now) / 0.45;
      floating.position.y += Math.sin(t * Math.PI) * 0.13;
    }

    // --- eyes -------------------------------------------------------------
    if (now > nextBlink.current) {
      blinkUntil.current = now + 0.12;
      // Every so often it blinks twice, which is what sells it as alive.
      nextBlink.current =
        now + (Math.random() < 0.28 ? 0.36 : 2.6 + Math.random() * 3.6);
    }

    let target = 1;
    if (bored) target = 0.46;
    if (now < wideUntil.current) target = 1.4;
    if (dragging.current || Math.abs(spin.current) > 1.1) target = 0.08;
    if (now < blinkUntil.current) target = 0.06;

    openness.current += (target - openness.current) * Math.min(dt * 22, 1);

    // Pupils drift a little further than the head turns, so it reads as
    // looking rather than just tilting.
    const gaze = bored ? 0 : 1;
    const dx = clamp1(x) * 0.026 * gaze;
    const dy = -clamp1(y) * 0.02 * gaze - (bored ? 0.014 : 0);

    for (const eye of [leftEye.current, rightEye.current]) {
      if (!eye) continue;
      eye.scale.set(1, Math.max(openness.current, 0.04), 0.55);
      eye.position.y = EYE_Y + dy;
      eye.position.z = EYE_Z;
    }
    if (leftEye.current) leftEye.current.position.x = -EYE_X + dx;
    if (rightEye.current) rightEye.current.position.x = EYE_X + dx;
  });

  return (
    <group ref={bob} scale={scale}>
      <group
        ref={turn}
        onPointerDown={(e) => {
          dragging.current = true;
          lastX.current = e.clientX;
          lastPoke.current = performance.now() / 1000;
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
          spin.current = THREE.MathUtils.clamp(spin.current + dx * 0.05, -11, 11);
        }}
        onClick={() => {
          // Startled, not dizzy. The spin nudge stays under the threshold that
          // makes it screw its eyes shut, so you get the wide-eyed hop instead.
          const now = performance.now() / 1000;
          wideUntil.current = now + 0.45;
          hopUntil.current = now + 0.45;
          lastPoke.current = now;
          spin.current += 0.85;
        }}
      >
        <mesh geometry={geometry}>
          {/* Matte on purpose. A glossier finish blows out the narrow side
              faces of the long arms into hard white streaks. */}
          <meshStandardMaterial color={color} roughness={0.62} metalness={0.04} />
        </mesh>

        <mesh ref={leftEye} position={[-EYE_X, EYE_Y, EYE_Z]}>
          <sphereGeometry args={[EYE_R, 20, 20]} />
          <meshStandardMaterial color="#241611" roughness={0.5} />
        </mesh>
        <mesh ref={rightEye} position={[EYE_X, EYE_Y, EYE_Z]}>
          <sphereGeometry args={[EYE_R, 20, 20]} />
          <meshStandardMaterial color="#241611" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export default function SparkScene() {
  const [color, setColor] = useState("#c4562f");
  const pointer = useRef<Pointer>({ x: 0, y: 0, lastMove: 0 });
  const host = useRef<HTMLDivElement>(null);

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

  // Tracked on the window rather than the canvas, so it keeps watching you
  // even when the cursor is off somewhere else on the page.
  useEffect(() => {
    let frame = 0;

    function onMove(event: PointerEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = host.current?.getBoundingClientRect();
        if (!box) return;
        pointer.current = {
          x: THREE.MathUtils.clamp(
            (event.clientX - (box.left + box.width / 2)) / (box.width / 2),
            -2.2,
            2.2,
          ),
          y: THREE.MathUtils.clamp(
            (event.clientY - (box.top + box.height / 2)) / (box.height / 2),
            -2.2,
            2.2,
          ),
          lastMove: performance.now() / 1000,
        };
      });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={host} className="h-full w-full">
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
        <Spark color={color} pointer={pointer} scale={1.28} />
      </Canvas>
    </div>
  );
}
