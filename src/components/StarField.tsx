import React, { useEffect, useRef } from 'react';

interface StarFieldProps {
  is404Effect?: boolean;
}

const StarField: React.FC<StarFieldProps> = ({ is404Effect = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    type Star = {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      driftX: number;
      driftY: number;
      type: 'normal' | 'bright' | 'distant' | 'shooting';
      life?: number; // For shooting stars
    };

    const stars: Star[] = [];
    const numStars = is404Effect ? 180 : 200; // Fewer regular stars if shooting stars are present to avoid clutter

    for (let i = 0; i < numStars; i++) {
      const type = Math.random() < 0.1 ? 'bright' : Math.random() < 0.3 ? 'distant' : 'normal';
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'bright' ? Math.random() * 3 + 1 : type === 'distant' ? Math.random() * 1 + 0.3 : Math.random() * 2 + 0.5,
        opacity: type === 'bright' ? Math.random() * 0.4 + 0.6 : type === 'distant' ? Math.random() * 0.3 + 0.1 : Math.random() * 0.6 + 0.3,
        twinkleSpeed: type === 'bright' ? Math.random() * 0.01 + 0.005 : Math.random() * 0.008 + 0.002,
        driftX: is404Effect ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.1, // Faster drift for 404
        driftY: is404Effect ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.1, // Faster drift for 404
        type
      });
    }

    const generateShootingStar = (burstSide?: number, baseX?: number, baseY?: number) => {
      if (!canvas) return;

      const side = burstSide !== undefined ? burstSide : Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let startX, startY, velocityX, velocityY;

      const speed = Math.random() * 8 + 3; // Base speed for shooting stars

      // Original random generation for single stars
      switch (side) {
        case 0: // Top
          startX = Math.random() * canvas.width;
          startY = 0;
          break;
        case 1: // Right
          startX = canvas.width;
          startY = Math.random() * canvas.height;
          break;
        case 2: // Bottom
          startX = Math.random() * canvas.width;
          startY = canvas.height;
          break;
        case 3: // Left
          startX = 0;
          startY = Math.random() * canvas.height;
          break;
        default:
          startX = 0; startY = 0; // Fallback
      }

      // Determine velocity based on the chosen side
      switch (side) {
        case 0: // Top to Bottom
          velocityX = (Math.random() - 0.5) * 1;
          velocityY = speed;
          break;
        case 1: // Right to Left
          velocityX = -speed;
          velocityY = (Math.random() - 0.5) * 1;
          break;
        case 2: // Bottom to Top
          velocityX = (Math.random() - 0.5) * 1;
          velocityY = -speed;
          break;
        case 3: // Left to Right
          velocityX = speed;
          velocityY = (Math.random() - 0.5) * 1;
          break;
        default:
          velocityX = 0; velocityY = 0; // Fallback
      }

      stars.push({
        x: startX,
        y: startY,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: 0, // No twinkling for shooting stars
        driftX: velocityX,
        driftY: velocityY,
        type: 'shooting',
        life: 100 // Life in frames
      });
    };

    let animationId: number;
    let time = 0;
    let shootingStarInterval: number | null = null;

    if (is404Effect) {
      generateShootingStar(); // Generate first shooting star immediately
      shootingStarInterval = setInterval(() => {
        // Only generate a new shooting star if there isn't one already
        const hasShootingStar = stars.some(star => star.type === 'shooting');
        if (!hasShootingStar) {
          generateShootingStar();
        }
      }, 10000); // Check every 10 seconds
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.016; // ~60fps

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];

        if (star.type === 'shooting') {
          star.x += star.driftX;
          star.y += star.driftY;
          star.life! -= 1; // Decrease life

          // Remove shooting star if it's out of life or off-screen
          if (star.life! <= 0 || star.x < -100 || star.x > canvas.width + 100 || star.y < -100 || star.y > canvas.height + 100) {
            stars.splice(i, 1);
            continue; // Skip drawing this star
          }

          // Draw shooting star as a trail
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * (star.life! / 100)})`; // Fade out
          ctx.lineWidth = star.size; // Thickness of the trail
          ctx.lineCap = 'round'; // Round ends for the trail
          ctx.beginPath();
          const trailLength = 50; // Length of the trail
          const prevX = star.x - star.driftX * trailLength;
          const prevY = star.y - star.driftY * trailLength;
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(star.x, star.y);
          ctx.stroke();

        } else {
          star.x += star.driftX;
          star.y += star.driftY;

          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;

          const twinkle = Math.sin(time * star.twinkleSpeed) * 0.2 + 0.8;
          const finalOpacity = star.opacity * twinkle;

          if (star.type === 'bright') {
            const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${finalOpacity * 0.3})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
          }

          if (star.type === 'bright' && Math.random() < 0.005) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${finalOpacity * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(star.x - star.size * 2, star.y);
            ctx.lineTo(star.x + star.size * 2, star.y);
            ctx.moveTo(star.x, star.y - star.size * 2);
            ctx.lineTo(star.x, star.y + star.size * 2);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      if (shootingStarInterval) {
        clearInterval(shootingStarInterval);
      }
    };
  }, [is404Effect]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0f0f23 0%, #000000 70%, #000000 100%)' }}
    />
  );
};

export default StarField;