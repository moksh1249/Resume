import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

/* ── Word-by-word reveal animation ── */
const sentence = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const word = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const AnimatedTitle = ({ text, className }) => (
    <motion.span className={className} variants={sentence} initial="hidden" animate="visible">
        {text.split(' ').map((w, i) => (
            <motion.span key={i} variants={word} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                {w}
            </motion.span>
        ))}
    </motion.span>
);

/* ── Magnetic Button ── */
const MagneticBtn = ({ children, href, className }) => {
    const btnRef = useRef(null);
    const handleMouseMove = (e) => {
        const el = btnRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const handleMouseLeave = () => {
        if (btnRef.current) btnRef.current.style.transform = 'translate(0, 0)';
    };
    return (
        <a
            ref={btnRef}
            href={href}
            className={`btn magnetic-btn ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </a>
    );
};

/* ── Role Cycler ── */
const roles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Problem Solver', 'CSE Student'];

const RoleCycler = () => {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => { setIndex(i => (i + 1) % roles.length); setVisible(true); }, 400);
        }, 2800);
        return () => clearInterval(interval);
    }, []);
    return (
        <span className={`role-cycler ${visible ? 'role-visible' : 'role-hidden'}`}>
            {roles[index]}
        </span>
    );
};

/* ── Decorative right panel (no Three.js) ── */
const HeroDecor = () => (
    <div className="hero-decor" aria-hidden="true">
        {/* Large orbit rings */}
        <div className="decor-ring decor-ring-1" />
        <div className="decor-ring decor-ring-2" />
        <div className="decor-ring decor-ring-3" />

        {/* Central glow orb */}
        <div className="decor-orb" />

        {/* Floating code snippets */}
        <motion.div
            className="decor-pill decor-pill-1"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            <span className="dpill-dot dpill-dot--green" />
            <span className="dpill-text mono">AI / ML</span>
        </motion.div>

        <motion.div
            className="decor-pill decor-pill-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
            <span className="dpill-dot dpill-dot--yellow" />
            <span className="dpill-text mono">React · Flutter</span>
        </motion.div>

        <motion.div
            className="decor-pill decor-pill-3"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        >
            <span className="dpill-dot dpill-dot--pink" />
            <span className="dpill-text mono">Open to Work</span>
        </motion.div>

        {/* Grid dots background */}
        <div className="decor-grid" />

        {/* Animated code block */}
        <motion.div
            className="decor-code-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
        >
            <div className="dcb-header">
                <span className="dcb-dot" style={{ background: '#ff5f57' }} />
                <span className="dcb-dot" style={{ background: '#febc2e' }} />
                <span className="dcb-dot" style={{ background: '#28c840' }} />
                <span className="dcb-filename mono">portfolio.js</span>
            </div>
            <div className="dcb-body mono">
                <div><span className="dcb-kw">const</span> <span className="dcb-var">dev</span> = {'{'}</div>
                <div className="dcb-indent"><span className="dcb-str">name</span>: <span className="dcb-val">"Your Name"</span>,</div>
                <div className="dcb-indent"><span className="dcb-str">role</span>: <span className="dcb-val">"CSE Student"</span>,</div>
                <div className="dcb-indent"><span className="dcb-str">passion</span>: <span className="dcb-val">"Building things"</span></div>
                <div>{'}'}</div>
            </div>
        </motion.div>
    </div>
);

/* ── Main hero ── */
const Hero = () => {
    return (
        <section id="home" className="hero-section">
            {/* Left: content */}
            <div className="hero-content">
                {/* Badge */}
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <span className="pulse-dot" />
                    Open to Opportunities
                </motion.div>

                {/* Main title */}
                <h1 className="hero-title">
                    <AnimatedTitle text="Hi, I'm" className="hero-hello" />
                    <br />
                    <motion.span
                        className="hero-name"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Your Name
                    </motion.span>
                </h1>

                {/* Role line */}
                <motion.p
                    className="hero-role"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                >
                    <span className="role-prefix mono">const role = </span>
                    <span className="role-quote mono">"</span>
                    <RoleCycler />
                    <span className="role-quote mono">"</span>
                </motion.p>

                {/* Description */}
                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                >
                    2nd year CSE student passionate about building AI-integrated apps,
                    exploring full-stack development, and solving complex algorithmic challenges.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                >
                    <MagneticBtn href="#projects" className="btn-primary">View Projects ↗</MagneticBtn>
                    <MagneticBtn href="mailto:email@example.com" className="btn-outline">Get in Touch</MagneticBtn>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    {[['4+', 'Projects'], ['15+', 'Technologies'], ['2nd', 'Year @ College']].map(([num, label]) => (
                        <div key={label} className="hero-stat">
                            <span className="stat-num">{num}</span>
                            <span className="stat-label">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Right: decorative panel (no Three.js) */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <HeroDecor />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span className="scroll-text mono">scroll</span>
                <div className="scroll-line">
                    <div className="scroll-dot" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
