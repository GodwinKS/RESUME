import { useRef, useState, useImperativeHandle, forwardRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ColorPreset } from '../types';

export interface ShootingStarsRef {
  trigger: () => void;
}

interface ShootingStarsProps {
  colorPreset: ColorPreset;
  enabled: boolean;
}

interface ActiveStar {
  id: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number; // 0 to 1
  speed: number;    // increment per frame
  color: THREE.Color;
  width: number;
}

export const ShootingStars = forwardRef<ShootingStarsRef, ShootingStarsProps>(
  ({ colorPreset, enabled }, ref) => {
    const [stars, setStars] = useState<ActiveStar[]>([]);
    const nextIdRef = useRef(0);
    const lastSpawnTime = useRef(0);

    // Get color based on preset
    const getThemeColor = (): THREE.Color => {
      const color = new THREE.Color();
      if (colorPreset === 'white') {
        color.setStyle('#dfebff');
      } else if (colorPreset === 'nebula') {
        color.setStyle(Math.random() > 0.5 ? '#ff4bf9' : '#00ffff');
      } else if (colorPreset === 'gold') {
        color.setStyle('#ffbe3b');
      } else if (colorPreset === 'cyberpunk') {
        color.setStyle(Math.random() > 0.5 ? '#00ffd2' : '#ff007f');
      } else if (colorPreset === 'aurora') {
        color.setStyle('#00ffd2');
      }
      return color;
    };

    // Spawn a shooting star at random start points in front of the camera bounds
    const spawnStar = () => {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30 + 10, // starts higher up
        -30 - Math.random() * 20         // mid depth
      );
      
      const angle = -Math.PI / 6 + (Math.random() - 0.5) * 0.3; // travel downwards-right
      const distance = 25 + Math.random() * 15;
      
      const end = new THREE.Vector3(
        start.x + Math.cos(angle) * distance,
        start.y + Math.sin(angle) * distance,
        start.z + (Math.random() - 0.5) * 5
      );

      const newStar: ActiveStar = {
        id: nextIdRef.current++,
        start,
        end,
        progress: 0,
        speed: 0.015 + Math.random() * 0.02, // super fast duration
        color: getThemeColor(),
        width: 1 + Math.random() * 2,
      };

      setStars((prev) => [...prev, newStar].slice(-8)); // cap at 8
    };

    // Expose a trigger method to build interactivity
    useImperativeHandle(ref, () => ({
      trigger: () => {
        spawnStar();
        // and sometimes trigger a double!
        setTimeout(() => spawnStar(), 250);
      },
    }));

    // Update position paths and spawn randomly
    useFrame((state) => {
      if (!enabled) return;

      const time = state.clock.getElapsedTime();

      // Spawn random shooting star every 4-7 seconds automatically
      if (time - lastSpawnTime.current > 4.5 + Math.random() * 4) {
        spawnStar();
        lastSpawnTime.current = time;
      }

      // Animate active star list
      setStars((prev) => {
        const active = prev
          .map((star) => ({
            ...star,
            progress: star.progress + star.speed,
          }))
          .filter((star) => star.progress < 1.1); // allow past 1.0 slightly for complete tail exit

        return active;
      });
    });

    return (
      <group>
        {stars.map((star) => {
          // Calculate segment coordinates for drawing line trail
          const starPos = star.start.clone().lerp(star.end, Math.min(1, star.progress));
          
          // Tail is slightly behind the current progression
          const tailProgress = Math.max(0, star.progress - 0.12);
          const tailPos = star.start.clone().lerp(star.end, tailProgress);

          // Render shooting star trail line using native standard Line primitives
          return (
            <LineSegment
              key={star.id}
              start={starPos}
              end={tailPos}
              color={star.color}
              lineWidth={star.width}
              opacity={star.progress > 0.8 ? 1 - (star.progress - 0.8) / 0.3 : 1}
            />
          );
        })}
      </group>
    );
  }
);

ShootingStars.displayName = 'ShootingStars';

// Custom inline shader Line rendering segment with clean gradient decay
interface LineSegmentProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: THREE.Color;
  lineWidth: number;
  opacity: number;
}

function LineSegment({ start, end, color, opacity }: LineSegmentProps) {
  const points = useMemo(() => [start, end], [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity * 0.9}
        linewidth={2} // Note: WebGL restricts basic material line widths in most browsers to 1, but we can rely on AdditiveBlending for brilliance
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </line>
  );
}
