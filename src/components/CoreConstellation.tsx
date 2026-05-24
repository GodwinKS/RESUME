import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { CoreStyle, ColorPreset } from '../types';

interface CoreConstellationProps {
  activeSection: string;
  coreStyle: CoreStyle;
  colorPreset: ColorPreset;
  enableParallax?: boolean;
}

export default function CoreConstellation({ 
  activeSection, 
  coreStyle, 
  colorPreset,
  enableParallax = true
}: CoreConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const ring2MeshRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const globalMouseRef = useRef({ x: 0, y: 0 });

  const lastTimeRef = useRef(0);
  const rotYRef = useRef(0);
  const rotXRef = useRef(0);

  // Listen to mousemove globally on window to circumvent overlay pointer interception
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      globalMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      globalMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Set up coordinates for orbital projects in 3D
  const orbitalNodes = useMemo(() => [
    { name: 'Saathi-OS', coord: [1.6, 0.8, -0.4], color: '#00f2ff' },
    { name: 'GrainGuard AI', coord: [-1.4, -0.9, 0.6], color: '#6366f1' },
    { name: 'IoT Telemetry', coord: [-0.9, 1.3, -0.8], color: '#ec4899' },
    { name: 'AI Ecosystem', coord: [1.1, -1.2, 0.7], color: '#10b981' },
  ], []);

  // Cohesive visual-matching colors determined by theme preset
  const colors = useMemo(() => {
    switch (colorPreset) {
      case 'white':
        return { primary: '#ffffff', secondary: '#94a3b8', accent: '#cbd5e1' };
      case 'gold':
        return { primary: '#f59e0b', secondary: '#d97706', accent: '#fef08a' };
      case 'cyberpunk':
        return { primary: '#ec4899', secondary: '#c084fc', accent: '#f472b6' };
      case 'aurora':
        return { primary: '#10b981', secondary: '#06b6d4', accent: '#34d399' };
      case 'nebula':
      default:
        return { primary: '#00f2ff', secondary: '#6366f1', accent: '#a78bfa' };
    }
  }, [colorPreset]);

  // Orbit coordinates for the particle cluster mode
  const clusterPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const height = ((i % 3) - 1) * 0.22;
      const radius = 0.44;
      pts.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number]
      });
    }
    return pts;
  }, []);

  // Soft lerp factors for responsive section animations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
    }
    const dt = Math.min(time - lastTimeRef.current, 0.1);
    lastTimeRef.current = time;

    if (groupRef.current) {
      // 1. Mouse coordinates reaction (parallax drift)
      const targetX = enableParallax ? (globalMouseRef.current.x * 0.4) : 0;
      const targetY = enableParallax ? (globalMouseRef.current.y * 0.4) : 0;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

      // 2. Morph scale and position based on active section
      let targetScale = 1.0;
      let targetZ = 0;
      let speedY = 0.15;
      let speedX = 0.05;

      if (activeSection === 'home') {
        targetScale = 1.25;
        targetZ = 0;
        speedY = 0.15;
        speedX = 0.05;
      } else if (activeSection === 'projects') {
        targetScale = 1.45;
        targetZ = 0.5;
        speedY = 0.35; // spins faster in active project archive mode
        speedX = 0.05;
      } else if (activeSection === 'skills') {
        targetScale = 1.15;
        targetZ = -0.1;
        speedY = 0.15;
        speedX = 0.25; // tilts to reveal different layout angles
      } else if (activeSection === 'contact') {
        targetScale = 0.9;
        targetZ = -0.4;
        speedY = 0.08; // slows down, compacting into a pulsing core
        speedX = 0.05;
      }

      rotYRef.current += dt * speedY;
      rotXRef.current += dt * speedX;

      const currentScale = groupRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      groupRef.current.scale.set(nextScale, nextScale, nextScale);
      
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);

      // Rotate group gently over time using accumulated delta values
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotYRef.current, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotXRef.current, 0.05);
    }

    // Inner core mesh autonomous spinning speed controls
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = time * 0.45;
      coreMeshRef.current.rotation.z = time * 0.25;
    }

    if (ringMeshRef.current) {
      ringMeshRef.current.rotation.x = time * -0.6;
      ringMeshRef.current.rotation.y = time * 0.3;
    }

    if (ring2MeshRef.current) {
      ring2MeshRef.current.rotation.y = time * 0.6;
      ring2MeshRef.current.rotation.z = time * -0.4;
    }

    // Nodes orbital hovering
    if (nodesRef.current) {
      nodesRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={groupRef}>
        
        {/* DESIGN OPTION 1: HOLOGRAM (Octahedron cage + Nucleus + Torus Ring) */}
        {coreStyle === 'hologram' && (
          <>
            <mesh ref={coreMeshRef}>
              <octahedronGeometry args={[0.7, 2]} />
              <meshBasicMaterial 
                color={colors.primary} 
                wireframe 
                transparent 
                opacity={0.35} 
              />
            </mesh>

            <mesh>
              <icosahedronGeometry args={[0.25, 1]} />
              <meshBasicMaterial 
                color={colors.accent} 
                transparent 
                opacity={activeSection === 'contact' ? 0.85 : 0.45} 
              />
            </mesh>

            <mesh ref={ringMeshRef} rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.9, 0.015, 8, 48]} />
              <meshBasicMaterial 
                color={colors.secondary} 
                transparent 
                opacity={0.25} 
              />
            </mesh>
          </>
        )}

        {/* DESIGN OPTION 2: TORUS ARRAY (Double Nested Intersecting Rings + Sphere nucleus) */}
        {coreStyle === 'torus_array' && (
          <>
            <mesh ref={ringMeshRef}>
              <torusGeometry args={[0.65, 0.018, 12, 54]} />
              <meshBasicMaterial 
                color={colors.primary} 
                wireframe
                transparent 
                opacity={0.5} 
              />
            </mesh>

            <mesh ref={ring2MeshRef} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
              <torusGeometry args={[0.46, 0.015, 12, 54]} />
              <meshBasicMaterial 
                color={colors.secondary} 
                transparent 
                opacity={0.4} 
              />
            </mesh>

            <mesh ref={coreMeshRef}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial 
                color={colors.accent} 
                transparent
                opacity={0.6}
              />
            </mesh>
          </>
        )}

        {/* DESIGN OPTION 3: TETRAHEDRON (Nested Crystals Rotating Differently) */}
        {coreStyle === 'tetrahedron' && (
          <>
            <mesh ref={ringMeshRef}>
              <tetrahedronGeometry args={[0.62, 1]} />
              <meshBasicMaterial 
                color={colors.primary} 
                wireframe
                transparent 
                opacity={0.45} 
              />
            </mesh>

            <mesh ref={coreMeshRef} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
              <tetrahedronGeometry args={[0.34, 1]} />
              <meshBasicMaterial 
                color={colors.secondary} 
                transparent 
                opacity={0.6} 
              />
            </mesh>

            <mesh>
              <octahedronGeometry args={[0.16, 1]} />
              <meshBasicMaterial 
                color={colors.accent} 
                transparent
                opacity={activeSection === 'contact' ? 0.9 : 0.7}
              />
            </mesh>
          </>
        )}

        {/* DESIGN OPTION 4: POINT CLUSTER (Glow Particle Shell + Core) */}
        {coreStyle === 'point_cluster' && (
          <>
            <group ref={ringMeshRef}>
              {clusterPoints.map((pt, pIdx) => (
                <mesh key={pIdx} position={pt.position}>
                  <sphereGeometry args={[0.045, 8, 8]} />
                  <meshBasicMaterial 
                    color={pIdx % 2 === 0 ? colors.primary : colors.accent} 
                    transparent 
                    opacity={0.75} 
                  />
                </mesh>
              ))}
            </group>

            <mesh ref={coreMeshRef}>
              <icosahedronGeometry args={[0.22, 1]} />
              <meshBasicMaterial 
                color={colors.secondary} 
                transparent 
                opacity={activeSection === 'contact' ? 0.85 : 0.65} 
              />
            </mesh>
          </>
        )}

        {/* Connected Node Constellation Graph */}
        <group ref={nodesRef}>
          {orbitalNodes.map((node, idx) => {
            const startPoint = new THREE.Vector3(0, 0, 0);
            const endPoint = new THREE.Vector3(node.coord[0], node.coord[1], node.coord[2]);
            const points = [startPoint, endPoint];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const nodePosition = node.coord as [number, number, number];

            return (
              <group key={idx}>
                {/* 1. Connections linking node core to orbital nodes using lineSegments */}
                <lineSegments geometry={lineGeometry}>
                  <lineBasicMaterial 
                    color={colors.primary} 
                    transparent 
                    opacity={0.15} 
                    linewidth={1} 
                  />
                </lineSegments>

                {/* 2. Visual physical node sphere */}
                <mesh position={nodePosition}>
                  <sphereGeometry args={[0.07, 16, 16]} />
                  <meshBasicMaterial 
                    color={node.color} 
                    transparent 
                    opacity={activeSection === 'projects' ? 0.95 : 0.65} 
                  />
                </mesh>

                {/* 3. Small outer pulsing node orbit ring */}
                <mesh position={nodePosition}>
                  <ringGeometry args={[0.09, 0.11, 16]} />
                  <meshBasicMaterial 
                    color={node.color} 
                    transparent 
                    opacity={activeSection === 'projects' ? 0.7 : 0.3} 
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            );
          })}
        </group>

      </group>
    </Float>
  );
}
