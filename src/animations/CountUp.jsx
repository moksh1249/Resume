/**
 * CountUp – animates a number from `from` to `to` once the element
 * enters the viewport. Powered by framer-motion's `animate` utility
 * so it respects the same easing as the rest of the site.
 *
 * Props:
 *   from     – start value (default 0)
 *   to       – target value (required)
 *   suffix   – text appended after the number, e.g. "+" or "nd"
 *   duration – animation duration in seconds (default 1.6)
 *   className
 */
import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

const CountUp = ({ from = 0, to, suffix = '', duration = 1.6, className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [display, setDisplay] = useState(from);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(from, to, {
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, from, to, duration]);

    return (
        <span ref={ref} className={className}>
            {display}{suffix}
        </span>
    );
};

export default CountUp;
