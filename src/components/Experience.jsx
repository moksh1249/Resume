import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import FloatingOrbs from '../animations/FloatingOrbs';
import GlitchText from '../animations/GlitchText';
import './Experience.css';

const experienceData = [
    {
        type: 'Role',
        title: "General Secretary",
        organization: "Mobilon Club, Bennett University",
        date: "2025-2026",
        description: "Leading the Mobilon Club, I spearheaded initiatives to foster a vibrant tech community on campus. Created mobile apps, organized workshops, and speaker sessions that attracted over 200 participants, significantly increasing club engagement and visibility.",
        tags: ["Leadership", "Event Management", "Community Building", "Mobile Development"],
        color: "var(--accent-primary)"
    },
    {
        type: 'Role',
        title: " AI Developer and Researcher Intern",
        organization: "SpiderMedia Labs",
        date: "January 2025- March 2025",
        description: "During my internship at SpiderMedia Labs, I contributed to cutting-edge AI projects, developing machine learning models and conducting research that enhanced the company's product offerings. This experience honed my technical skills and deepened my understanding of AI applications in real-world scenarios.",
        tags: ["AI Development", "Machine Learning", "Research", "Internship"],
        color: "var(--accent-secondary)"
    },
    {
        type: 'Role',
        title: " Development Team co-Head",
        organization: "Astronomy club, Bennett University",
        date: "2025-2026",
        description: "As co-head of the development team in the Astronomy club, I led a group of 15 members in designing cansats, rockets and rovers for national competitions. These designs will be brought to life in the upcoming year, showcasing our commitment to innovation and hands-on learning in the field of astronomy.",
        tags: ["Leadership", "Project Management", "Astronomy", "STEM Education"],
        color: "var(--accent-tertiary)"
    },
    {
        type: 'competition',
        title: 'hackaccino 2025',
        organization: 'CSI Bennett University',
        date: 'April 2025',
        description: 'Participated in the hackaccino 2025 competition, where I collaborated with a team of developers to create an innovative solution for a student based problem. The project included chatbots for resume modifications, a calling agent that helped refine interviewing skills and various other tools to help students prepare for placements. Our solution was recognized for its creativity and impact.',
        tags: ["AI", "Flutter", "Figma", "Vaapi","n8n", "Botpress"],
        color: "var(--accent-primary)"
    },
    {
        type: 'competition',
        title: 'Smart BU Hackathon 2026',
        organization: 'Bennett University',
        date: 'March 2025',
        description: 'In the Bennett University Hackathon, I worked with a team to develop a mobile application that addressed a breed identification for BPA and the model had an accuracy of 95%. The app was designed to be user-friendly and accessible, demonstrating our ability to apply technical skills to solve real-world problems effectively.',
        tags: ["Flutter", "Resnet 18", "Computer Vision", "Mobile Development"],
        color: "var(--accent-secondary)"
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
            {/* Ambient floating orbs */}
            <FloatingOrbs intensity={0.5} />
            <div className="experience-header">
                <motion.div className="section-label"
                    initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
                    animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
                    Experience
                </motion.div>
                <motion.h2 className="section-title-xl"
                    initial={{ clipPath: 'inset(0 0 100% 0)', y: 16 }}
                    animate={inView ? { clipPath: 'inset(0 0 0% 0)', y: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}>
                    <GlitchText text="Journey & Milestones" periodic interval={7000} />
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
