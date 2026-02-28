import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './Experience.css';

const experienceData = [
    {
        type: 'competition',
        title: "Hackathon Finalist",
        organization: "National Coding Competition",
        date: "2023",
        description: "Built a fully functional real-time web application using React, Node.js, and WebSockets under 48 hours. Placed in the top 5 teams nationally.",
        tags: ["React", "Node.js", "WebSockets"],
        color: "var(--accent-primary)"
    },
    {
        type: 'role',
        title: "Technical Team Member",
        organization: "University Computer Science Club",
        date: "2022 – Present",
        description: "Assisted in building platforms for college fests, developed internal tools, and organized open source contribution workshops for 100+ students.",
        tags: ["Community", "Web Dev", "Open Source"],
        color: "var(--accent-secondary)"
    },
    {
        type: 'achievement',
        title: "AI/ML Research Project",
        organization: "Academic Initiative",
        date: "2024",
        description: "Independently developed an NLP sentence classifier as part of a self-driven research initiative, achieving 87% accuracy on the test set using Scikit-learn.",
        tags: ["Python", "NLP", "Machine Learning"],
        color: "var(--accent-tertiary)"
    }
];

const TimelineItem = ({ item, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            className={`timeline-item ${index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Connector dot */}
            <motion.div
                className="timeline-dot"
                style={{ '--dot-color': item.color }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
            />

            {/* Card */}
            <div className="timeline-card glass-card">
                <div className="timeline-card-top">
                    <span className="timeline-date mono">{item.date}</span>
                    <span className="timeline-type-badge" style={{ '--badge-color': item.color }}>
                        {item.type}
                    </span>
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-org">{item.organization}</p>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-tags">
                    {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section id="experience" className="experience-section" ref={ref}>
            <div className="experience-header">
                <motion.div className="section-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}>
                    Experience
                </motion.div>
                <motion.h2 className="section-title-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    Journey &amp; Milestones
                </motion.h2>
            </div>

            <div className="timeline-wrapper">
                {/* Animated center line */}
                <div className="timeline-track">
                    <motion.div className="timeline-track-fill" style={{ height: lineHeight }} />
                </div>

                {/* Items */}
                <div className="timeline-list">
                    {experienceData.map((item, idx) => (
                        <TimelineItem key={idx} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
