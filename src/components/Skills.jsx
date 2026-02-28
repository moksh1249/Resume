import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
        skills: ["Flutter", "Supabase", "Git", "REST APIs", "Autodesk 360", "Autodesk CFD", "Autodesk Revit", "Figma", "Rive"]
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
            <div className="skills-header">
                <motion.div className="section-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}>
                    Skills
                </motion.div>
                <motion.h2 className="section-title-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    What I Work With
                </motion.h2>
            </div>

            {/* Category cards in grid */}
            <motion.div
                className="skills-grid"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {skillCategories.map((cat, i) => (
                    <motion.div
                        key={cat.title}
                        className="skill-card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        style={{ '--card-accent': cat.color }}
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
