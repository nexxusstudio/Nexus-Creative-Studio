import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  trail: { x: number; y: number; opacity: number }[];
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId: number;
    
    const themeColors = {
      light: ['rgba(59, 130, 246, 0.6)', 'rgba(147, 51, 234, 0.6)', 'rgba(236, 72, 153, 0.6)'],
      dark: ['rgba(0, 210, 255, 0.8)', 'rgba(255, 0, 150, 0.8)', 'rgba(120, 255, 120, 0.8)'],
      gradient: ['rgba(0, 210, 255, 0.9)', 'rgba(255, 20, 147, 0.9)', 'rgba(50, 255, 50, 0.9)'],
      minimal: ['rgba(0, 0, 0, 0.3)', 'rgba(100, 100, 100, 0.3)', 'rgba(150, 150, 150, 0.3)'],
      cyberpunk: ['rgba(0, 255, 255, 1.0)', 'rgba(255, 0, 255, 1.0)', 'rgba(255, 255, 0, 1.0)'],
      neon: ['rgba(255, 255, 0, 1.0)', 'rgba(255, 0, 255, 1.0)', 'rgba(0, 255, 255, 1.0)']
    };
    
    const currentColors = themeColors[theme as keyof typeof themeColors] || themeColors.light;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * (theme === 'cyberpunk' || theme === 'neon' ? 1.2 : 0.8),
        vy: (Math.random() - 0.5) * (theme === 'cyberpunk' || theme === 'neon' ? 1.2 : 0.8),
        size: Math.random() * (theme === 'minimal' ? 1.5 : 3) + 1,
        opacity: Math.random() * 0.7 + 0.2,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        trail: []
      };
    }

    function updateParticles() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update trail
        p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
        if (p.trail.length > 5) {
          p.trail.shift();
        }
        
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw trail for neon and cyberpunk themes
        if (theme === 'cyberpunk' || theme === 'neon') {
          for (let j = 0; j < p.trail.length; j++) {
            const trail = p.trail[j];
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, p.size * (j / p.trail.length), 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(/[\d\.]+\)$/g, `${trail.opacity * (j / p.trail.length)})`);
            ctx.fill();
          }
        }

        // Draw main particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (theme === 'cyberpunk' || theme === 'neon') {
          ctx.shadowBlur = 20;
          ctx.shadowColor = p.color;
        }
        
        ctx.fillStyle = p.color;
        ctx.fill();
        
        if (theme === 'cyberpunk' || theme === 'neon') {
          ctx.shadowBlur = 0;
        }

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const connectionOpacity = (100 - distance) / 100 * 0.2;
            ctx.strokeStyle = currentColors[0].replace(/[\d\.]+\)$/g, `${connectionOpacity})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(updateParticles);
    }

    function init() {
      resizeCanvas();
      particles = [];
      const particleCount = theme === 'minimal' ? 30 : theme === 'cyberpunk' || theme === 'neon' ? 80 : 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
      updateParticles();
    }

    init();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
