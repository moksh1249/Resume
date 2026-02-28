import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin } from 'lucide-react';
import './About.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const CounterStat = ({ num, label, delay }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            className="about-stat"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.5 }}
        >
            <span className="about-stat-num">{num}</span>
            <span className="about-stat-label">{label}</span>
        </motion.div>
    );
};

const About = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="about-section" ref={ref}>
            <div className="about-inner">
                {/* Left column */}
                <div className="about-left">
                    <motion.div className="section-label" variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                        About Me
                    </motion.div>

                    <motion.h2 className="section-title-xl about-headline" variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                        Building the future,<br />
                        <span className="text-accent">one commit</span> at a time.
                    </motion.h2>

                    <motion.p className="about-body" variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                        I'm a 2nd-year B.Tech CSE student driven by a love for elegant code and
                        meaningful products. My work spans full-stack web dev, Autodesk CAD tooling,
                        and machine learning — bridging the gap between theoretical knowledge and
                        real-world impact.
                    </motion.p>

                    <motion.p className="about-body" variants={fadeUp} custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                        I believe great software is built at the intersection of strong CS fundamentals
                        and creative problem-solving. Outside of coding, I contribute to the university
                        CS club, participate in hackathons, and explore the latest in AI.
                    </motion.p>

                    {/* Stats */}
                    <div className="about-stats">
                        <CounterStat num="4+" label="Projects Shipped" delay={0.4} />
                        <CounterStat num="15+" label="Technologies" delay={0.5} />
                        <CounterStat num="2" label="Hackathons" delay={0.6} />
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
                            <span className="edu-year">2023 – 2027</span>
                            <span className="edu-bullet">·</span>
                            <span className="edu-status">2nd Year</span>
                        </div>
                        <div className="edu-location">
                            <MapPin size={14} />
                            Your University Name
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
                            {['Generative AI', 'Flutter/Dart', '3D Web (Three.js)', 'System Design', 'Open Source'].map(t => (
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
