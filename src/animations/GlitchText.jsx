/**
 * GlitchText – renders text with an optional periodic or hover-triggered
 * colour-channel glitch effect. The glitch layers use accent-secondary
 * (turquoise) and accent-tertiary (flamingo) so they match the site theme.
 *
 * Props:
 *   text      – string to display
 *   tag       – HTML tag to use (default: 'span')
 *   className – extra class names
 *   periodic  – if true, fires the glitch on an interval
 *   interval  – ms between glitches when `periodic` is true (default 4500)
 *   onHover   – fire on mouse-enter (default true)
 */
import React, { useState, useEffect, useRef } from 'react';
import './GlitchText.css';

const GlitchText = ({
    text,
    tag: Tag = 'span',
    className = '',
    periodic = false,
    interval = 4500,
    onHover = true,
}) => {
    const activeRef = useRef(false);
    const [active, setActive] = useState(false);

    const triggerGlitch = () => {
        if (activeRef.current) return;
        activeRef.current = true;
        setActive(true);
        setTimeout(() => {
            activeRef.current = false;
            setActive(false);
        }, 550);
    };

    useEffect(() => {
        if (!periodic) return;
        const id = setInterval(triggerGlitch, interval);
        return () => clearInterval(id);
    }, [periodic, interval]);

    return (
        <Tag
            className={`glitch-text ${active ? 'glitch-text--active' : ''} ${className}`}
            data-text={text}
            onMouseEnter={onHover ? triggerGlitch : undefined}
        >
            {text}
        </Tag>
    );
};

export default GlitchText;
