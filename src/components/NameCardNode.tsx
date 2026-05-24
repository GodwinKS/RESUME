import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Cpu, 
  Sparkles, 
  GraduationCap
} from 'lucide-react';

interface NameCardNodeProps {
  activeSection: string;
}

export default function NameCardNode({ activeSection }: NameCardNodeProps) {
  const cardRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const globalMouseRef = useRef({ x: 0, y: 0 });

  // Handle tracking window coordinates for mouse dynamic parallax response
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

  // 3D Motion dynamics inside WebGL thread
  useFrame((state) => {
    if (!cardRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Interactive hover tilt calculations
    const floatY = Math.sin(time * 1.5) * 0.08;
    const floatRx = Math.cos(time * 0.9) * 0.02;
    const floatRy = Math.sin(time * 1.1) * 0.03;

    // React to cursor parallax drift
    const targetRx = floatRx + (globalMouseRef.current.y * 0.14);
    const targetRy = floatRy + (globalMouseRef.current.x * 0.18);

    // Responsive scaling and layout matrices based on section and display size
    const isMobile = window.innerWidth < 768;
    const isHome = activeSection === 'home';
    
    const targetYPos = isHome 
      ? (isMobile ? floatY - 2.1 : floatY) 
      : -12; // Slide deep underground if not home section
      
    const targetXPos = isMobile
      ? 0
      : 2.1;

    const targetZPos = isMobile
      ? -1.1
      : 0.35;

    const baseScale = isMobile ? 0.44 : 0.88;
    const targetScale = isHome ? (hovered ? baseScale * 1.05 : baseScale) : 0.001;

    // Dampen positions and rotations with smooth lerp physics
    cardRef.current.position.x = THREE.MathUtils.lerp(cardRef.current.position.x, targetXPos, 0.08);
    cardRef.current.position.y = THREE.MathUtils.lerp(cardRef.current.position.y, targetYPos, 0.08);
    cardRef.current.position.z = THREE.MathUtils.lerp(cardRef.current.position.z, targetZPos, 0.08);

    cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, targetRx, 0.08);
    cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, targetRy, 0.08);

    const scale = THREE.MathUtils.lerp(cardRef.current.scale.x, targetScale, 0.1);
    cardRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={cardRef} position={[2.1, -12, 0.35]} rotation={[0, -0.25, 0]}>
      {/* Volumetric Neon Glow Backing Plane */}
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[3.2, 4.2]} />
        <meshBasicMaterial 
          color="#00f2ff" 
          transparent 
          opacity={0.02} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Embedded 3D CSS Layer */}
      <Html
        transform
        distanceFactor={3}
        position={[0, 0, 0.06]}
        pointerEvents="auto"
        className="select-none"
      >
        <div 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`w-[440px] p-6 rounded-3xl bg-slate-950/90 border transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] ${
            hovered 
              ? 'border-[#00f2ff] shadow-[0_0_35px_rgba(0,242,255,0.22)] scale-[1.01]' 
              : 'border-slate-800/80 shadow-[0_0_20px_rgba(0,0,0,0.3)]'
          }`}
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Glowing laser header margin */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-cyan-500/10 via-[#00f2ff] to-indigo-500/10" />

          {/* Interactive Header with cyber security chip style */}
          <div className="flex items-start justify-between border-b border-slate-900 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <Cpu className="text-[#00f2ff] animate-pulse" size={14} />
                <span className="text-[9px] uppercase font-mono tracking-[0.25em] font-semibold text-[#00f2ff]">
                  Biometric Spec
                </span>
              </div>
              <h2 className="text-lg font-bold tracking-widest text-white uppercase mt-1 font-display">
                GODWIN KS
              </h2>
            </div>
            <span className="text-[8px] font-mono font-semibold px-2 py-0.5 bg-slate-900 border border-slate-805 text-slate-400 rounded-md">
              ID: 1708-CS
            </span>
          </div>

          {/* Core Info Specs (Responsive grid elements) */}
          <div className="space-y-4">
            
            {/* Spec Row 1: Degree & Institute */}
            <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-900 hover:border-slate-800 transition-all">
              <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-[#00f2ff]">
                <GraduationCap size={11} className="text-[#00f2ff]" />
                <span>Current Status</span>
              </div>
              <p className="text-sm font-bold text-white mt-1.5 leading-snug">
                B.Tech in Computer Science & Engineering (CSE Core)
              </p>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Vellore Institute of Technology (VIT), Chennai
              </p>
              <p className="text-[9.5px] text-slate-500 font-mono mt-3 flex items-center gap-1.5 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" /> First Semester • Active Scholar
              </p>
            </div>

          </div>

          {/* Futuristic biometric chip elements at the bottom */}
          <div className="flex items-center justify-between border-t border-slate-900 pt-3.5 mt-4 text-[7px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM_SECURE
            </span>
            <span className="flex items-center gap-1 text-[#00f2ff]/60">
              <Sparkles size={8} className="text-[#00f2ff]" /> LEVEL: ENTERPRISE
            </span>
          </div>

        </div>
      </Html>
    </group>
  );
}
