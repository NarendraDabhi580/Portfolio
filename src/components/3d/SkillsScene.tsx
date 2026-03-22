"use client";
import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const SKILLS = [
  { name: "React", color: "#61DAFB", x: 0, y: 0 },
  { name: "Node.js", color: "#68A063", x: 2, y: 1 },
  { name: "MongoDB", color: "#47A248", x: -2, y: 1 },
  { name: "Express", color: "#999999", x: 1.5, y: -1.5 },
  { name: "TypeScript", color: "#3178C6", x: -1.5, y: -1.5 },
  { name: "Next.js", color: "#FFFFFF", x: 3, y: -0.5 },
  { name: "Redux", color: "#764ABC", x: -3, y: -0.5 },
  { name: "GraphQL", color: "#E10098", x: 0, y: 2.5 },
  { name: "Docker", color: "#2496ED", x: 2.5, y: 2 },
  { name: "Git", color: "#F05032", x: -2.5, y: 2 },
  { name: "PostgreSQL", color: "#4169E1", x: 0.5, y: -2.8 },
  { name: "Socket.io", color: "#010101", x: -0.5, y: -2.8 },
  { name: "AWS", color: "#FF9900", x: 3.5, y: 1 },
  { name: "Tailwind", color: "#06B6D4", x: -3.5, y: 1 },
  { name: "REST API", color: "#00e5ff", x: 1, y: 3.2 },
];

function SkillNode({
  skill,
  index,
}: {
  skill: (typeof SKILLS)[0];
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  const initPos = useRef({
    x: skill.x + (Math.random() - 0.5) * 0.5,
    y: skill.y + (Math.random() - 0.5) * 0.5,
    z: (Math.random() - 0.5) * 2,
  });

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Float animation
    const floatY = Math.sin(t * 0.5 + index * 0.8) * 0.15;
    const floatX = Math.cos(t * 0.3 + index * 0.6) * 0.1;

    // Mouse repel/attract
    const mouseWorld = new THREE.Vector2(mouse.x * 8, mouse.y * 5);
    const dx = initPos.current.x - mouseWorld.x;
    const dy = initPos.current.y - mouseWorld.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repelStrength = Math.max(0, 2.0 - dist) * 0.3;

    meshRef.current.position.x =
      initPos.current.x + floatX + (dx / dist) * repelStrength * 0.5;
    meshRef.current.position.y =
      initPos.current.y + floatY + (dy / dist) * repelStrength * 0.5;
    meshRef.current.position.z = initPos.current.z;

    // Scale on hover
    const targetScale = hovered ? 1.5 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1,
    );
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={hovered ? 3 : 1.5}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const { geometry, material } = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < SKILLS.length; i++) {
      for (let j = i + 1; j < SKILLS.length; j++) {
        const dist = Math.sqrt(
          Math.pow(SKILLS[i].x - SKILLS[j].x, 2) +
            Math.pow(SKILLS[i].y - SKILLS[j].y, 2),
        );
        if (dist < 3.5) {
          positions.push(SKILLS[i].x, SKILLS[i].y, 0);
          positions.push(SKILLS[j].x, SKILLS[j].y, 0);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    const mat = new THREE.LineBasicMaterial({
      color: "#00e5ff",
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      (lineRef.current.material as THREE.LineBasicMaterial).opacity =
        0.1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return <lineSegments ref={lineRef} geometry={geometry} material={material} />;
}

export default function SkillsScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#00e5ff" />
      <pointLight position={[0, 0, -5]} intensity={1} color="#7c3aed" />

      <ConnectionLines />

      {SKILLS.map((skill, i) => (
        <SkillNode key={skill.name} skill={skill} index={i} />
      ))}
    </group>
  );
}
