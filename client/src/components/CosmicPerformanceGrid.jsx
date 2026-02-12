// src/components/CosmicPerformanceGrid.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useMemo, useRef } from 'react';

function WaveParticles({ color = '#a855f7', height = 0.6, speed = 0.6 }) {
  const points = useRef();

  const positions = useMemo(() => {
    const width = 40;
    const depth = 40;
    const step = 1.2;
    const pts = [];
    for (let x = -width / 2; x < width / 2; x += step) {
      for (let z = -depth / 2; z < depth / 2; z += step) {
        pts.push(x, 0, z);
      }
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const arr = points.current.geometry.attributes.position.array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i];
      const z = arr[i + 2];
      arr[i + 1] = Math.sin((x + t * 3) * 0.3) * height + Math.cos((z - t * 2) * 0.25) * height * 0.6;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </points>
  );
}

function ParticleCardScene({ variant }) {
  return (
    <Canvas
      camera={{ position: [0, 7, 14], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#030014']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={0.7} />
      {variant === 'singing' ? (
        <WaveParticles color="#e5e7eb" height={0.8} speed={0.7} />
      ) : (
        <WaveParticles color="#a855f7" height={1.1} speed={1.1} />
      )}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

const cards = [
  {
    id: 'singing',
    title: 'Celestial Vocals',
    subtitle: 'Singing Arena',
    variant: 'singing',
    desc: 'A shimmering sound-wave of particles, pulsing gently like a choir across the cosmos.',
  },
  {
    id: 'dancing',
    title: 'Orbital Grooves',
    subtitle: 'Dance Arena',
    variant: 'dancing',
    desc: 'Energetic particle ripples that twist and bounce like a cosmic choreography.',
  },
];

const floatVariant = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

export default function CosmicPerformanceGrid() {
  return (
    <section className="relative py-24 px-6 lg:px-24 overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-40 -left-10 w-72 h-72 bg-fuchsia-500/30 blur-[120px]" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-violet-500/25 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-500/25 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* heading */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30">
            <Sparkles size={16} className="text-violet-300" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-violet-200">
              Cosmic Stage
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Singing & Dancing in the <span className="text-violet-400">Constellations</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm text-gray-400">
            Abstract particle bands that feel like sound waves and choreography, glowing inside the starfield.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={floatVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative glass-card border border-white/10 rounded-3xl overflow-hidden flex flex-col"
            >
              {/* 3D particle header */}
              <div className="h-52 w-full overflow-hidden">
                <ParticleCardScene variant={card.variant} />
              </div>

              {/* content */}
              <div className="relative z-10 p-6 space-y-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-violet-300">
                  {card.subtitle}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {card.desc}
                </p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
