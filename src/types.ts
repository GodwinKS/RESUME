export type ColorPreset = 'white' | 'nebula' | 'gold' | 'cyberpunk' | 'aurora';
export type CoreStyle = 'hologram' | 'torus_array' | 'tetrahedron' | 'point_cluster';

export interface StarfieldSettings {
  starCount: number;
  starSize: number;
  rotationSpeed: number;
  colorPreset: ColorPreset;
  coreStyle: CoreStyle;
  twinkleSpeed: number;
  enableParallax: boolean;
  nebulaDensity: number;
  enableShootingStars: boolean;
  depth: number;
}

export type PortfolioSection = 'home' | 'projects' | 'skills' | 'contact';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  role: string;
  link: string;
  spaceCoordinates: [number, number, number]; // Coordinates for camera focuses
}
