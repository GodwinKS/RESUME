import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface StarscapeProps {
  speed?: number;
  starCount?: number;
  starSize?: number;
  twinkleSpeed?: number;
  enableParallax?: boolean;
}

export default function Starscape({ 
  speed = 0.4,
  starCount = 4000,
  starSize = 5,
  twinkleSpeed = 0.6,
  enableParallax = true
}: StarscapeProps) {
  const starsRef = useRef<THREE.Group>(null);
  const globalMouseRef = useRef({ x: 0, y: 0 });

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

  // Slow astronomical rotation drift and optional cursor parallax
  useFrame((state) => {
    if (starsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Continuous passive rotation
      starsRef.current.rotation.y = time * speed * 0.02;
      starsRef.current.rotation.x = time * speed * 0.01;

      // Dynamic cursor parallax reacting to mouse movement using global tracked mouse position
      if (enableParallax) {
        const targetX = globalMouseRef.current.x * 0.25;
        const targetY = globalMouseRef.current.y * 0.25;
        starsRef.current.position.x = THREE.MathUtils.lerp(starsRef.current.position.x, targetX, 0.05);
        starsRef.current.position.y = THREE.MathUtils.lerp(starsRef.current.position.y, targetY, 0.05);
      } else {
        // Return smoothly to center coordinate if parallax disabled
        starsRef.current.position.x = THREE.MathUtils.lerp(starsRef.current.position.x, 0, 0.05);
        starsRef.current.position.y = THREE.MathUtils.lerp(starsRef.current.position.y, 0, 0.05);
      }
    }
  });

  return (
    <group ref={starsRef}>
      {/* High performance prefabricated star cluster with reactive key mapping */}
      <Stars
        key={`stars-${starCount}-${starSize}-${twinkleSpeed}`}
        radius={115}      // Radius of the inner sphere of stars
        depth={60}        // Depth of star field
        count={starCount}  // Density of stars fixed to 4000
        factor={starSize}  // Size factor fixed to 5
        saturation={0.8}  // Color saturation of stars
        fade              // Fading stars in distance
        speed={twinkleSpeed * 1.5} // Star twinkling speed (flicker rate)
      />
    </group>
  );
}
