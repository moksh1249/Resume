/**
 * ParticleField – canvas-based ambient particle system.
 * Renders small dots in the portfolio's three accent colours that drift
 * slowly upward, creating an "alive" background feel.
 * Fully theme-aware: re-reads CSS vars on each mount.
 */
import React, { useRef, useEffect } from 'react';
import './ParticleField.css';

const ACCENT_DARK = [
    'oklch(0.78 0.17 89)',   // mustard
    'oklch(0.72 0.15 180)',  // turquoise
    'oklch(0.75 0.17 360)',  // flamingo
];

const ACCENT_LIGHT = [
    'oklch(0.54 0.13 89)',
    'oklch(0.52 0.13 180)',
    'oklch(0.56 0.13 360)',
];

const ParticleField = ({ count = 35, opacity = 0.45 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const isDark = () =>
            document.documentElement.getAttribute('data-theme') !== 'light';

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();

        // Build particles
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.6,
            speedX: (Math.random() - 0.5) * 0.25,
            speedY: -(Math.random() * 0.35 + 0.08),
            alpha: Math.random() * 0.55 + 0.2,
            colorIdx: Math.floor(Math.random() * 3),
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const palette = isDark() ? ACCENT_DARK : ACCENT_LIGHT;
            particles.forEach((p) => {
                ctx.save();
                ctx.globalAlpha = p.alpha * opacity;
                ctx.fillStyle = palette[p.colorIdx];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around
                if (p.y < -6) {
                    p.y = canvas.height + 6;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -6) p.x = canvas.width + 6;
                if (p.x > canvas.width + 6) p.x = -6;
            });
            raf = requestAnimationFrame(draw);
        };
        draw();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [count, opacity]);

    return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
};

export default ParticleField;
