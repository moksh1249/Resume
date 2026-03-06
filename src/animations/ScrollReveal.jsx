/**
 * ScrollReveal – a versatile scroll-triggered reveal wrapper.
 * Wrap any content to animate it in when it enters the viewport.
 *
 * Props:
 *   direction – 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate' | 'clip' (default 'up')
 *   delay     – animation delay in seconds
 *   duration  – animation duration in seconds (default 0.65)
 *   ease      – framer-motion easing (default expo-like)
 *   margin    – IntersectionObserver root margin (default '-80px')
 *   once      – only play once (default true)
 *   className / style – forwarded to the wrapper div
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VARIANTS = {
    up:     { hidden: { opacity: 0, y: 40 },              visible: { opacity: 1, y: 0 } },
    down:   { hidden: { opacity: 0, y: -40 },             visible: { opacity: 1, y: 0 } },
    left:   { hidden: { opacity: 0, x: -50 },             visible: { opacity: 1, x: 0 } },
    right:  { hidden: { opacity: 0, x: 50 },              visible: { opacity: 1, x: 0 } },
    scale:  { hidden: { opacity: 0, scale: 0.86 },        visible: { opacity: 1, scale: 1 } },
    rotate: { hidden: { opacity: 0, rotate: -6, y: 24 },  visible: { opacity: 1, rotate: 0, y: 0 } },
    clip:   {
        hidden:  { clipPath: 'inset(0 0 100% 0)', y: 16 },
        visible: { clipPath: 'inset(0 0 0% 0)',   y: 0 },
    },
};

const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.65,
    ease = [0.25, 0.46, 0.45, 0.94],
    margin = '-80px',
    once = true,
    className,
    style,
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once, margin });
    const variant = VARIANTS[direction] ?? VARIANTS.up;

    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            variants={variant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration, delay, ease }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
