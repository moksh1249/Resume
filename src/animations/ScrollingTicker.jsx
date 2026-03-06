/**
 * ScrollingTicker – a horizontal marquee band whose speed is linked to the
 * vertical scroll velocity of the page (faster scroll → faster ticker).
 * Inspired by design-agency portfolio sites.
 *
 * Two rows scroll in opposite directions, creating a visual depth effect.
 * Colours are drawn from the site's accent CSS variables.
 *
 * Props:
 *   items       – string[] of labels to repeat
 *   baseVelocity – base scroll speed in px/s (default 90)
 */
import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
    useAnimationFrame,
    useMotionValue,
} from 'framer-motion';
import './ScrollingTicker.css';

/* Maps an ever-growing / ever-shrinking value into a looping range [min, max). */
const wrap = (min, max, v) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

const TickerRow = ({ items, baseVelocity = 90, direction = -1, color }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 5], { clamp: false });

    /*
     * The track is 4× items wide; we loop between -25% and 0% so one full
     * copy scrolls off-screen before we reset — no visible jump.
     */
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
    const directionRef = useRef(direction);
    const lastVfSignRef = useRef(0); // tracks sign of previous frame's velocity factor

    useAnimationFrame((_, delta) => {
        let move = directionRef.current * baseVelocity * (delta / 1000);
        const vf = velocityFactor.get();
        const vfSign = Math.sign(vf);

        // Only flip direction when scroll velocity sign changes (not every frame)
        if (vfSign !== 0 && vfSign !== lastVfSignRef.current) {
            directionRef.current = vfSign < 0 ? -direction : direction;
            lastVfSignRef.current = vfSign;
        }

        // Add a velocity bonus (clamped to avoid runaway speeds)
        move += directionRef.current * Math.abs(move) * Math.min(Math.abs(vf), 4);
        baseX.set(baseX.get() + move);
    });

    // Quadruple items so the loop is seamless
    const repeated = [...items, ...items, ...items, ...items];

    return (
        <div className="ticker-row">
            <motion.div className="ticker-track" style={{ x }}>
                {repeated.map((item, i) => (
                    <span key={i} className="ticker-item" style={{ '--ticker-color': color }}>
                        {item}
                        <span className="ticker-sep" aria-hidden="true">·</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

const ScrollingTicker = ({ items, baseVelocity = 90 }) => (
    <section className="scrolling-ticker" aria-hidden="true">
        <TickerRow
            items={items}
            baseVelocity={baseVelocity}
            direction={-1}
            color="var(--accent-primary)"
        />
        <TickerRow
            items={[...items].reverse()}
            baseVelocity={baseVelocity * 0.7}
            direction={1}
            color="var(--accent-secondary)"
        />
    </section>
);

export default ScrollingTicker;
