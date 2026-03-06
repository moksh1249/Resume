import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FloatingOrbs from '../animations/FloatingOrbs';
import GlitchText from '../animations/GlitchText';
import './Skills.css';

const skillCategories = [
    {
        title: "Languages",
        color: "var(--accent-primary)",
        skills: ["Python", "Java", "C/C++", "Dart", "SQL"]
    },
    {
        title: "Frameworks & Tools",
        color: "var(--accent-secondary)",
        skills: ["Flutter", "Supabase", "Git", "REST APIs", "Autodesk 360", "Autodesk CFD", "Autodesk Revit", "Figma", "Postman", "Harmonizer","Firebase"]
    },
    {
        title: "AI & Machine Learning",
        color: "var(--accent-tertiary)",
        skills: ["NumPy", "Pandas", "Scikit-learn", "NLP Fundamentals", "Feature Engineering"]
    },
    {
        title: "Core CS",
        color: "var(--accent-primary)",
        skills: ["Data Structures", "Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"]
    }
];

/* 3-D tilt card powered by framer-motion springs */
const TiltSkillCard = ({ cat, delay, inView }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
    const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
    const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 22 });
    const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 22 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <motion.div
            className="skill-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            style={{ rotateX, rotateY, transformPerspective: 900, '--card-accent': cat.color }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="skill-card-header">
                <div className="skill-card-dot" />
                <h3 className="skill-category-title">{cat.title}</h3>
            </div>
            <div className="skill-tags">
                {cat.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag" style={{ '--tag-accent': cat.color }}>
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

// Infinite marquee row
const MarqueeRow = ({ items, reverse, color }) => {
    const duplicated = [...items, ...items, ...items];
    return (
        <div className={`marquee-row ${reverse ? 'marquee-row--reverse' : ''}`}>
            <div className="marquee-track">
                {duplicated.map((skill, i) => (
                    <span key={i} className="marquee-pill" style={{ '--pill-color': color }}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Skills = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="skills" className="skills-section" ref={ref}>
            {/* Ambient floating orbs */}
            <FloatingOrbs intensity={0.55} />

            <div className="skills-header">
                <motion.div className="section-label"
                    initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
                    animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
                    Skills
                </motion.div>
                <motion.h2 className="section-title-xl"
                    initial={{ clipPath: 'inset(0 0 100% 0)', y: 16 }}
                    animate={inView ? { clipPath: 'inset(0 0 0% 0)', y: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}>
                    <GlitchText text="What I Work With" periodic interval={5000} />
                </motion.h2>
            </div>

            {/* Category cards with 3D tilt */}
            <motion.div
                className="skills-grid"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.15 }}
            >
                {skillCategories.map((cat, i) => (
                    <TiltSkillCard key={cat.title} cat={cat} delay={0.2 + i * 0.1} inView={inView} />
                ))}
            </motion.div>

            {/* Marquee rows */}
            <div className="marquee-container">
                <MarqueeRow items={skillCategories[0].skills.concat(skillCategories[3].skills)} reverse={false} color="var(--accent-primary)" />
                <MarqueeRow items={skillCategories[1].skills.concat(skillCategories[2].skills)} reverse={true} color="var(--accent-secondary)" />
            </div>
        </section>
    );
};

export default Skills;
