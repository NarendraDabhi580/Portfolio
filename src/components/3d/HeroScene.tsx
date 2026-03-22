"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function LaptopScreen() {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }

          void main() {
            vec2 uv = vUv;
            
            // Scanlines
            float scanline = sin(uv.y * 80.0 - uTime * 2.0) * 0.05;
            
            // Code lines effect
            float lineY = floor(uv.y * 20.0) / 20.0;
            float lineRand = random(vec2(lineY, floor(uTime * 0.5)));
            float lineWidth = 0.3 + lineRand * 0.6;
            float line = step(uv.x, lineWidth) * step(lineY + 0.04, uv.y + 0.001) * step(uv.y, lineY + 0.04);
            
            // Typing cursor
            float cursorX = fract(uTime * 0.15 + lineRand);
            float cursor = step(abs(uv.x - cursorX), 0.005) * step(abs(uv.y - lineY - 0.02), 0.015) * step(fract(uTime * 2.0), 0.5);
            
            // Background color
            vec3 bg = vec3(0.02, 0.04, 0.12);
            
            // Syntax colors
            vec3 cyan = vec3(0.0, 0.9, 1.0);
            vec3 violet = vec3(0.5, 0.2, 1.0);
            vec3 green = vec3(0.0, 1.0, 0.5);
            
            float colorChoice = random(vec2(lineY * 3.0, 1.0));
            vec3 lineColor = colorChoice < 0.33 ? cyan : (colorChoice < 0.66 ? violet : green);
            
            vec3 color = bg + lineColor * line * 0.8 + vec3(1.0) * cursor;
            color += scanline;
            
            // CRT vignette  
            vec2 vigUv = uv * 2.0 - 1.0;
            float vignette = 1.0 - dot(vigUv * 0.4, vigUv * 0.4);
            color *= vignette;
            
            // Glow
            float glow = sin(uTime * 0.5) * 0.05 + 0.95;
            color *= glow;
            
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        side: THREE.FrontSide,
      }),
    [],
  );

  useFrame(({ clock }) => {
    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial} position={[0, 0.05, 0.01]}>
      <planeGeometry args={[1.6, 1.0]} />
    </mesh>
  );
}

function FloatingPanel({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.8 + delay) * 0.1;
      meshRef.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 0.5 + delay) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.6, 0.35]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function GlowingSphere({
  position,
  color,
  size = 0.08,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 1.2 + delay) * 0.15;
      meshRef.current.position.x =
        position[0] + Math.cos(clock.getElapsedTime() * 0.8 + delay) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x +=
        (-mouse.y * 0.2 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient and directional lights */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00e5ff" />
      <pointLight position={[-3, 2, 2]} intensity={2} color="#7c3aed" />
      <pointLight position={[3, -2, 1]} intensity={1.5} color="#f72585" />

      {/* Laptop base */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <group position={[0, -0.2, 0]}>
          {/* Screen frame */}
          <mesh position={[0, 0.85, -0.05]}>
            <boxGeometry args={[1.8, 1.15, 0.04]} />
            <meshStandardMaterial
              color="#0a0e1a"
              roughness={0.1}
              metalness={0.9}
              emissive="#0a0e1a"
            />
          </mesh>

          {/* Screen */}
          <LaptopScreen />

          {/* Screen glow */}
          <pointLight
            position={[0, 0.85, 0.2]}
            intensity={1.5}
            color="#00e5ff"
            distance={2}
          />

          {/* Keyboard base */}
          <mesh position={[0, 0.2, 0.3]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[1.8, 0.04, 1.2]} />
            <meshStandardMaterial
              color="#111827"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Keyboard keys glow */}
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                -0.7 + (i % 4) * 0.5,
                0.24,
                0.2 + Math.floor(i / 4) * 0.2,
              ]}
              rotation={[-0.3, 0, 0]}
            >
              <boxGeometry args={[0.08, 0.01, 0.06]} />
              <meshStandardMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Floating UI panels */}
      <FloatingPanel position={[-2.2, 0.5, -0.5]} color="#00e5ff" delay={0} />
      <FloatingPanel position={[2.1, 0.3, -0.8]} color="#7c3aed" delay={1} />
      <FloatingPanel position={[-1.8, -0.8, 0.2]} color="#f72585" delay={2} />

      {/* Floating orbs */}
      <GlowingSphere position={[-1.5, 1.2, 0.5]} color="#00e5ff" delay={0} />
      <GlowingSphere
        position={[1.8, 0.8, 0.3]}
        color="#7c3aed"
        size={0.06}
        delay={1.5}
      />
      <GlowingSphere
        position={[0.5, -1.0, 1.0]}
        color="#f72585"
        size={0.05}
        delay={0.8}
      />
      <GlowingSphere
        position={[-2.0, -0.5, -0.3]}
        color="#00ff88"
        size={0.04}
        delay={2}
      />

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.008, 8, 120]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[3.0, 0.005, 8, 120]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Code fragments floating */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Float
          key={i}
          speed={0.8 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            -2 - i * 0.5,
          ]}
        >
          <mesh>
            <boxGeometry args={[0.3 + Math.random() * 0.4, 0.05, 0.02]} />
            <meshStandardMaterial
              color={["#00e5ff", "#7c3aed", "#f72585", "#00ff88"][i % 4]}
              emissive={["#00e5ff", "#7c3aed", "#f72585", "#00ff88"][i % 4]}
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
