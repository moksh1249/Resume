import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projectData = [
    {
        number: '01',
        title: "Interactive Web Portal",
        description: "A modern web portal built using React and Three.js for immersive 3D interactions. Features a responsive design, dark mode switch, and real-time data rendering.",
        techStack: ["React", "Three.js", "CSS", "Vite"],
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        githubUrl: "#",
        liveUrl: "#",
        color: "var(--accent-primary)"
    },
    {
        number: '02',
        title: "CFD Analysis Dashboard",
        description: "Desktop utility designed to handle Autodesk CFD processing workflows efficiently with interactive data visualization dashboards and Supabase as the backend.",
        techStack: ["Python", "Pandas", "Supabase", "Autodesk CFD"],
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        githubUrl: "#",
        liveUrl: "#",
        color: "var(--accent-secondary)"
    },
    {
        number: '03',
        title: "NLP Sentence Classifier",
        description: "Natural language processing model built to classify text into semantic categories using machine learning paradigms and feature engineering techniques.",
        techStack: ["Python", "Scikit-learn", "NumPy", "NLP"],
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        githubUrl: "#",
        liveUrl: "#",
        color: "var(--accent-tertiary)"
    }
];

const ProjectCard = ({ project, index }) => {
    const videoRef = useRef(null);
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={cardRef}
            className="project-card"
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => videoRef.current?.play().catch(() => { })}
            onMouseLeave={() => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
        >
            {/* Big background number */}
            <span className="project-number" style={{ '--num-color': project.color }}>
                {project.number}
            </span>

            {/* Content side */}
            <div className="project-info">
                <div className="project-top">
                    <div className="project-meta">
                        <span className="project-index mono" style={{ color: project.color }}>{project.number}</span>
                        <div className="project-divider-line" />
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                </div>

                <div className="project-bottom">
                    <div className="project-tech">
                        {project.techStack.map((tech, i) => (
                            <span key={i} className="tag">{tech}</span>
                        ))}
                    </div>
                    <div className="project-links">
                        <a href={project.githubUrl} className="project-link" aria-label="GitHub">
                            <Github size={18} /> Code
                        </a>
                        <a href={project.liveUrl} className="project-link project-link--live" aria-label="Live Demo" style={{ '--link-color': project.color }}>
                            <ExternalLink size={18} /> Live ↗
                        </a>
                    </div>
                </div>
            </div>

            {/* Video preview */}
            <div className="project-preview">
                <video
                    ref={videoRef}
                    src={project.videoUrl}
                    muted loop playsInline
                    className="project-video"
                />
                <div className="project-preview-overlay">
                    <span className="preview-label mono">Hover to Play</span>
                </div>
                <div className="project-accent-bar" style={{ background: project.color }} />
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="projects-section" ref={ref}>
            <div className="projects-header">
                <motion.div className="section-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}>
                    Projects
                </motion.div>
                <motion.h2 className="section-title-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    Selected Work
                </motion.h2>
            </div>

            <div className="projects-list">
                {projectData.map((proj, idx) => (
                    <ProjectCard key={idx} project={proj} index={idx} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
