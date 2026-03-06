import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin } from 'lucide-react';
import FloatingOrbs from '../animations/FloatingOrbs';
import CountUp from '../animations/CountUp';
import ScrollReveal from '../animations/ScrollReveal';
import './About.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

/* Clip-path curtain reveal variant — text sweeps up into view */
const clipReveal = {
    hidden: { clipPath: 'inset(0 0 100% 0)', y: 16 },
    visible: (i = 0) => ({
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        transition: { duration: 0.85, delay: i * 0.14, ease: [0.76, 0, 0.24, 1] },
    }),
};

/* CounterStat now uses the animated CountUp */
const CounterStat = ({ num, label }) => {
    const match = String(num).match(/^(\d+)(.*)$/);
    const to = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : '';
    return (
        <div className="about-stat">
            <span className="about-stat-num">
                <CountUp to={to} suffix={suffix} />
            </span>
            <span className="about-stat-label">{label}</span>
        </div>
    );
};

const About = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="about-section" ref={ref}>
            {/* Ambient floating orbs – low intensity so they're subtle */}
            <FloatingOrbs intensity={0.65} />

            <div className="about-inner">
                {/* Left column */}
                <div className="about-left">
                    <motion.div className="section-label" variants={clipReveal} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                        About Me
                    </motion.div>

                    <motion.h2 className="section-title-xl about-headline" variants={clipReveal} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                        Building the future,<br />
                        <span className="text-accent">one commit</span> at a time.
                    </motion.h2>

                    <ScrollReveal direction="up" delay={0.25} duration={0.6}>
                        <p className="about-body">
                            I'm a 2nd-year B.Tech CSE student driven by a love for elegant code and
                            meaningful products. My work spans full-stack web dev, Autodesk CAD tooling,
                            and machine learning — bridging the gap between theoretical knowledge and
                            real-world impact.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.38} duration={0.6}>
                        <p className="about-body">
                            I believe great software is built at the intersection of strong CS fundamentals
                            and creative problem-solving. Outside of coding, I contribute to the university
                            CS club, participate in hackathons, and explore the latest in AI.
                        </p>
                    </ScrollReveal>

                    {/* Animated stats */}
                    <div className="about-stats">
                        <CounterStat num="6+" label="Projects" />
                        <CounterStat num="15+" label="Technologies" />
                        <CounterStat num="2" label="Hackathons" />
                    </div>
                </div>

                {/* Right column */}
                <div className="about-right">
                    {/* Education Card */}
                    <motion.div
                        className="glass-card edu-card"
                        variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    >
                        <div className="edu-card-header">
                            <GraduationCap size={22} className="edu-icon" />
                            <span className="edu-tag mono">Education</span>
                        </div>

                        <h3 className="edu-degree">B.Tech — Computer Science &amp; Engineering</h3>
                        <div className="edu-meta">
                            <span className="edu-year">2024 – 2028</span>
                            <span className="edu-bullet">·</span>
                            <span className="edu-status">2nd Year</span>
                        </div>
                        <div className="edu-location">
                            <MapPin size={14} />
                            Bennett University
                        </div>

                        <div className="edu-timeline">
                            {[
                                { sem: 'Sem 1 & 2', topics: 'Fundamentals, C++, Maths' },
                                { sem: 'Sem 3 & 4', topics: 'DSA, OOP, OS, DBMS' },
                                { sem: 'Sem 5+', topics: 'AI/ML, Networks, Projects' },
                            ].map(({ sem, topics }) => (
                                <div key={sem} className="edu-sem">
                                    <div className="edu-sem-dot" />
                                    <div>
                                        <span className="edu-sem-name mono">{sem}</span>
                                        <span className="edu-sem-topics">{topics}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interests card */}
                    <motion.div
                        className="glass-card interests-card"
                        variants={fadeUp} custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    >
                        <BookOpen size={18} className="edu-icon" />
                        <span className="interests-title">Currently Exploring</span>
                        <div className="interests-tags">
                            {['Agentic AI', 'Flutter/Dart', '3D Web (Three.js)', 'System Design', 'Open Source', 'Rive'].map(t => (
                                <span key={t} className="tag">{t}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
