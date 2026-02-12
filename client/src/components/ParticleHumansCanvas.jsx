import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleHumansCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    function createParticleFigure(offsetX, color1, color2) {
      const particleCount = 6000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const colorA = new THREE.Color(color1);
      const colorB = new THREE.Color(color2);

      for (let i = 0; i < particleCount; i++) {
        const t = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1.2;

        const x = radius * Math.cos(t);
        const y = Math.sin(t * 2) * 2.8;
        const z = (Math.random() - 0.5) * 0.6;

        positions[i * 3] = x + offsetX;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const mixed = colorA.clone().lerp(colorB, Math.random());
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      return points;
    }

    const singer = createParticleFigure(-2.5, '#ffcc33', '#ff8800');
    const dancer = createParticleFigure(2.5, '#33ccff', '#0066ff');

    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 80;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      singer.rotation.y += 0.002;
      dancer.rotation.y -= 0.002;
      singer.position.y = Math.sin(t) * 0.25;
      dancer.position.y = Math.cos(t) * 0.25;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
