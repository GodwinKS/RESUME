import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { StarfieldSettings, PortfolioSection } from './types';
import Starscape from './components/Starscape';
import NebulaDust from './components/NebulaDust';
import { ShootingStars } from './components/ShootingStars';
import PortfolioContent from './components/PortfolioContent';
import CoreConstellation from './components/CoreConstellation';
import NameCardNode from './components/NameCardNode';

export default function App() {
  const [activeSection, setActiveSection] = useState<PortfolioSection>('home');
  // Highly optimized, hardcoded parameters customized of the visitor's requests
  const settings: StarfieldSettings = {
    starCount: 4000,
    starSize: 5,
    rotationSpeed: 0.4,          // Fixed rotation speed at 40% (0.4)
    colorPreset: 'aurora',        // Securely locked to Aurora Green
    coreStyle: 'hologram',        // Securely locked to Holo Octahedron
    twinkleSpeed: 0.6,            // Fixed flicker speed at 0.6 HZ
    enableParallax: true,         // Fully enabled cursor parallax across layers
    nebulaDensity: 0.5,           // Fixed nebula density at 50% (0.5)
    enableShootingStars: true,    // Securely locked to Active/Enabled
    depth: 45,
  };



  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#010204] font-sans">
      
      {/* Volumetric Nebulae background glowing emitters matched to Aurora Green layout */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Dynamic 3D Galactic Backdrop via React Three Fiber Canvas */}
      <div className="absolute inset-0 z-0 select-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 1000 }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Dense Field Starscape with dynamic state bindings */}
          <Starscape 
            speed={settings.rotationSpeed} 
            starCount={settings.starCount}
            starSize={settings.starSize}
            twinkleSpeed={settings.twinkleSpeed}
            enableParallax={settings.enableParallax}
          />

          {/* Interactive Core 3D Constellation Node with dynamic state bindings */}
          <CoreConstellation 
            activeSection={activeSection} 
            coreStyle={settings.coreStyle} 
            colorPreset={settings.colorPreset} 
            enableParallax={settings.enableParallax}
          />

          {/* Floating dynamic interactive 3D Name Card Node */}
          <NameCardNode activeSection={activeSection} />

          {/* Core volumetric gas dust */}
          {settings.nebulaDensity > 0 && (
            <NebulaDust density={settings.nebulaDensity} colorPreset={settings.colorPreset} />
          )}

          {/* Meteor fire trails */}
          <ShootingStars
            colorPreset={settings.colorPreset}
            enabled={settings.enableShootingStars}
          />
        </Canvas>
      </div>

      {/* Aesthetic glass atmospheric blur ring elements and vignette shading */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#010204] via-transparent to-[#010204]/40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-[#010204] to-transparent opacity-95 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-[400px] bg-gradient-to-r from-[#010204]/40 to-transparent pointer-events-none" />

      {/* Primary HTML Glassmorphic Content Layer */}
      <div className="absolute inset-0 z-10 overflow-y-auto">
        <PortfolioContent
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
    </div>
  );
}

