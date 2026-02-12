import React, { useRef, useEffect } from "react";

const CosmicDance = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const stars = [];

    // 🌟 Background stars
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
      });
    }

    // ✨ Human Silhouette Points Generator
    const generateFigure = (centerX, centerY, color) => {
      for (let i = 0; i < 1500; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 120;

        particles.push({
          x: centerX + Math.cos(angle) * radius * 0.4,
          y: centerY + Math.sin(angle) * radius,
          size: Math.random() * 2,
          color,
          offsetX: (Math.random() - 0.5) * 20,
          offsetY: (Math.random() - 0.5) * 20,
        });
      }
    };

    // Left dancer (Gold)
    generateFigure(canvas.width / 3, canvas.height / 2, "gold");

    // Right dancer (Blue)
    generateFigure(canvas.width / 1.6, canvas.height / 2, "deepskyblue");

    let animationFrame;

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🌟 Draw Stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
      });

      // ✨ Glow Effect
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(
          p.x + Math.sin(Date.now() * 0.001) * p.offsetX,
          p.y + Math.cos(Date.now() * 0.001) * p.offsetY,
          p.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        background: "black",
      }}
    />
  );
};

export default CosmicDance;
