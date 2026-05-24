import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ColorPreset } from '../types';

interface NebulaDustProps {
  density: number;
  colorPreset: ColorPreset;
}

const vertexShader = `
  attribute vec3 aColor;
  attribute float aScale;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // Huge points with camera distance scaling
    gl_PointSize = aScale * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  uniform float uDensity;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    // Hyper-soft cubic fallout curve for seamless cloud volumetric textures without rigid borders
    float alpha = pow(1.0 - (dist * 2.0), 3.0) * 0.18 * uDensity;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function NebulaDust({ density, colorPreset }: NebulaDustProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Derive cloud count from density value
  const cloudCount = useMemo(() => {
    return Math.max(10, Math.floor(density * 35));
  }, [density]);

  // Spawn cloud nodes across the middle-horizon of the canvas
  const [positions, scales, colors] = useMemo(() => {
    const pos = new Float32Array(cloudCount * 3);
    const scl = new Float32Array(cloudCount);
    const col = new Float32Array(cloudCount * 3);

    const randomColor = (preset: ColorPreset) => {
      let r = 0.5, g = 0.5, b = 0.5;
      if (preset === 'white') {
        r = 0.15; g = 0.2; b = 0.4; // Very dark bluish dust
      } else if (preset === 'nebula') {
        const c = Math.random();
        if (c < 0.5) {
          r = 0.4; g = 0.1; b = 0.65; // Soft Violet
        } else {
          r = 0.1; g = 0.2; b = 0.7; // Soft indigo
        }
      } else if (preset === 'gold') {
        r = 0.55; g = 0.25; b = 0.05; // Soft bronze/amber glow
      } else if (preset === 'cyberpunk') {
        const c = Math.random();
        if (c < 0.5) {
          r = 0.0; g = 0.4; b = 0.5; // Neon teal
        } else {
          r = 0.55; g = 0.02; b = 0.35; // Neon rose magenta
        }
      } else if (preset === 'aurora') {
        r = 0.05; g = 0.5; b = 0.25; // Soft northern lights emerald green
      }
      return [r, g, b];
    };

    for (let i = 0; i < cloudCount; i++) {
      // Clustered near center-infinity to serve as background nebulas
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 45; // Spread outwards

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Huge size scale [12 to 36 units]
      scl[i] = 12 + Math.random() * 24;

      const [cr, cg, cb] = randomColor(colorPreset);
      col[i * 3] = cr;
      col[i * 3 + 1] = cg;
      col[i * 3 + 2] = cb;
    }

    return [pos, scl, col];
  }, [cloudCount, colorPreset]);

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      // Rotate counter-clockwise to the stars to generate relative visual complexity
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.008;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.004;
    }
    if (materialRef.current && materialRef.current.uniforms.uDensity) {
      materialRef.current.uniforms.uDensity.value = density;
    }
  });

  const uniforms = useMemo(() => ({
    uDensity: { value: density }
  }), []);

  return (
    <points ref={meshRef}>
      <bufferGeometry key={`nebula-${cloudCount}-${colorPreset}`}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
      />
    </points>
  );
}
