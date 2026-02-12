// HeroCanvas.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';

function RotatingStars() {
  const starsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.04;
      starsRef.current.rotation.x = t * 0.01;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={40}     // spread of particles
      depth={30}      // z‑depth
      count={2500}    // number of particles
      factor={6}      // particle size (bigger = larger particles)
      saturation={0}  // keep them white/neutral
      fade            // fade with depth for nicer look
      speed={0}       // we handle rotation in useFrame
    />
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="pointer-events-none"
    >
      <color attach="background" args={['#030014']} />
      <ambientLight intensity={0.2} />
      <RotatingStars />
    </Canvas>
  );
}
