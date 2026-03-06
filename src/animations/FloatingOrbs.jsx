/**
 * FloatingOrbs – ambient glowing orb blobs that slowly drift across a section.
 * They use the portfolio's accent colour tokens so they respect both dark and light themes.
 * Each section that uses FloatingOrbs must have `position: relative; overflow: hidden`.
 */
import React from 'react';
import { motion } from 'framer-motion';
import './FloatingOrbs.css';

const ORB_CONFIGS = [
    {
        color: 'var(--accent-primary)',
        size: 380,
        x: '-8%',
        y: '5%',
        animDelay: 0,
        duration: 14,
        path: { x: [0, 30, -20, 10, 0], y: [0, -30, 20, -15, 0] },
    },
    {
        color: 'var(--accent-secondary)',
        size: 260,
        x: '75%',
        y: '50%',
        animDelay: 2,
        duration: 18,
        path: { x: [0, -25, 15, -10, 0], y: [0, 25, -20, 10, 0] },
    },
    {
        color: 'var(--accent-tertiary)',
        size: 200,
        x: '55%',
        y: '-5%',
        animDelay: 4.5,
        duration: 12,
        path: { x: [0, 20, -12, 8, 0], y: [0, 18, -22, 5, 0] },
    },
];

const FloatingOrbs = ({ intensity = 1 }) => (
    <div className="floating-orbs" aria-hidden="true">
        {ORB_CONFIGS.map((orb, i) => {
            const s = Math.round(orb.size * intensity);
            return (
                <motion.div
                    key={i}
                    className="floating-orb"
                    style={{
                        width: s,
                        height: s,
                        left: orb.x,
                        top: orb.y,
                        background: `radial-gradient(circle, color-mix(in srgb, ${orb.color} 18%, transparent) 0%, transparent 70%)`,
                    }}
                    animate={{ x: orb.path.x, y: orb.path.y, scale: [1, 1.06, 0.97, 1.04, 1] }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: orb.animDelay,
                    }}
                />
            );
        })}
    </div>
);

export default FloatingOrbs;
