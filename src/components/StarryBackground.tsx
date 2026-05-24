import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ColorPreset, StarfieldSettings } from '../types';

interface StarryBackgroundProps extends StarfieldSettings {
  activeSection: string;
}

// Custom GLSL shaders for high-performance GPU twinkling and organic circular glow stars
const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform float uTwinkleSpeed;

  attribute float aPhase;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = aColor;
    
    // TWINKLE: High-quality individual star flickering using trigonometric noise on the GPU
    float twinkle = 0.4 + 0.6 * sin(uTime * uTwinkleSpeed * 1.5 + aPhase * 25.0);
    vTwinkle = twinkle;

    // View-space position calculations
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Distance Attenuation: stars scale proportionally when camera is close
    gl_PointSize = uSize * (350.0 / -mvPosition.z) * twinkle;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    // Distance from the center of the viewport-point coordinate [0, 1]
    float dist = distance(gl_PointCoord, vec2(0.5));
    
    // Disc Mask: discard pixels outside the star's circular boundary
    if (dist > 0.5) discard;
    
    // Radiant Edge Formula: Create a magnificent organic glow halo
    float glow = smoothstep(0.5, 0.05, dist);
    
    // Core intensity blending
    float intensity = glow * (0.8 + 0.2 * vTwinkle);
    
    gl_FragColor = vec4(vColor, intensity);
  }
`;

export default function StarryBackground({
  starCount,
  starSize,
  rotationSpeed,
  colorPreset,
  twinkleSpeed,
  enableParallax,
  depth,
  activeSection,
}: StarryBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate unique 3D positions spread uniformly inside a stellar envelope
  const positions = useMemo(() => {
    const arr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      // Golden ratio / Fibonacci spherical distribution + volume jitter for hyper-realistic scattering
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Focus more stars at visual infinity, but keep some field depth
      const r = depth * 0.15 + (depth * 0.85) * Math.pow(Math.random(), 1.5);
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [starCount, depth]);

  // Generate unique twinkling phases for each star
  const phases = useMemo(() => {
    const arr = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      arr[i] = Math.random() * Math.PI * 2.0;
    }
    return arr;
  }, [starCount]);

  // Map chosen color preset to dynamic individual RGB components
  const colors = useMemo(() => {
    const arr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      let r = 1.0, g = 1.0, b = 1.0;

      if (colorPreset === 'white') {
        const tint = Math.random();
        if (tint > 0.85) {
          r = 0.88; g = 0.94; b = 1.0; // Cool cryogenic blue tint
        } else if (tint > 0.7) {
          r = 1.0; g = 0.96; b = 0.88; // Warm solar quartz yellow tint
        }
      } else if (colorPreset === 'nebula') {
        const choice = Math.random();
        if (choice < 0.4) {
          // Deep violet/indigo
          r = 0.5 + Math.random() * 0.3;
          g = 0.2 + Math.random() * 0.2;
          b = 1.0;
        } else if (choice < 0.8) {
          // Radiant pink & magenta
          r = 1.0;
          g = 0.1 + Math.random() * 0.3;
          b = 0.7 + Math.random() * 0.3;
        } else {
          // Electric aqua cyan
          r = 0.2;
          g = 0.8 + Math.random() * 0.2;
          b = 0.9 + Math.random() * 0.1;
        }
      } else if (colorPreset === 'gold') {
        const choice = Math.random();
        if (choice < 0.65) {
          r = 1.0; g = 0.82 + Math.random() * 0.12; b = 0.3 + Math.random() * 0.2; // Warm amber gold
        } else {
          r = 0.9 + Math.random() * 0.1; g = 0.52 + Math.random() * 0.15; b = 0.1; // Deep golden honey
        }
      } else if (colorPreset === 'cyberpunk') {
        const choice = Math.random();
        if (choice < 0.5) {
          r = 0.02; g = 0.95; b = 0.98; // High-volt radioactive cyan
        } else {
          r = 1.0; g = 0.02; b = 0.65; // Hyper neon fuchsia
        }
      } else if (colorPreset === 'aurora') {
        const choice = Math.random();
        if (choice < 0.6) {
          r = 0.1; g = 0.92; b = 0.45 + Math.random() * 0.15; // Luminous northern emerald green
        } else {
          r = 0.2; g = 0.75; b = 0.85; // Muted arctic mint teal
        }
      }

      arr[i * 3] = r;
      arr[i * 3 + 1] = g;
      arr[i * 3 + 2] = b;
    }
    return arr;
  }, [starCount, colorPreset]);

  // Sync uniforms on changes
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: starSize },
    uTwinkleSpeed: { value: twinkleSpeed }
  }), []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uSize.value = starSize;
      materialRef.current.uniforms.uTwinkleSpeed.value = twinkleSpeed;
    }
  }, [starSize, twinkleSpeed]);

  // Frame loop animations to rotate, twinkle, and response to mouse pointers
  useFrame((state) => {
    const { clock, pointer } = state;
    const time = clock.getElapsedTime();

    // 1. Advance shader timeline
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    // 2. Rotate starfield based on drift velocity
    if (pointsRef.current) {
      // Background idle cosmic drift
      const baseRotationX = time * rotationSpeed * 0.015;
      const baseRotationY = time * rotationSpeed * 0.03;

      // 3. Section specific camera orientations
      let sectionRotationX = 0;
      let sectionRotationY = 0;
      if (activeSection === 'projects') {
        sectionRotationX = 0.3;
        sectionRotationY = -0.4;
      } else if (activeSection === 'skills') {
        sectionRotationX = -0.2;
        sectionRotationY = 0.5;
      } else if (activeSection === 'contact') {
        sectionRotationX = 0.4;
        sectionRotationY = 0.2;
      }

      // Parallax interaction with mouse pointer
      let parallaxX = 0;
      let parallaxY = 0;
      if (enableParallax) {
        parallaxX = pointer.x * 0.12;
        parallaxY = -pointer.y * 0.12;
      }

      // Smoothly blend rotational forces
      const targetRotationX = baseRotationX + sectionRotationX + parallaxY;
      const targetRotationY = baseRotationY + sectionRotationY + parallaxX;

      // Smooth interpolation using slerp-like lerping
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.04;
      pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry key={`${starCount}-${colorPreset}-${depth}`}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={phases.length}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
