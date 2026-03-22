"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
}

export default function ParticleField({
  count = 3000,
  color = "#00e5ff",
  size = 0.015,
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      rnd[i] = Math.random();
    }
    return [pos, rnd];
  }, [count]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
          uSize: { value: size },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          attribute float aRandom;
          varying float vRandom;
          varying float vDistance;

          void main() {
            vRandom = aRandom;
            vec3 pos = position;
            pos.y += sin(uTime * 0.3 + aRandom * 6.28) * 0.3;
            pos.x += cos(uTime * 0.2 + aRandom * 6.28) * 0.2;
            
            vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
            vDistance = -mvPos.z;
            gl_PointSize = uSize * (300.0 / -mvPos.z) * (0.5 + aRandom * 0.5);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vRandom;
          varying float vDistance;

          void main() {
            vec2 uv = gl_PointCoord - vec2(0.5);
            float dist = length(uv);
            if (dist > 0.5) discard;
            
            float alpha = (1.0 - dist * 2.0) * (0.3 + vRandom * 0.7);
            vec3 finalColor = uColor + vec3(vRandom * 0.2);
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, size]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    return geo;
  }, [positions, randoms]);

  return <points ref={meshRef} geometry={geometry} material={shaderMaterial} />;
}
