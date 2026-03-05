import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projectData = [
    {
        number: '01',
        title: "SyncED",
        description: "An educational app created during the Hackaccino 24-hour hackathon. Addresses college students' educational challenges with integrated resume building and note preparation features.",
        techStack: ["Dart", "Flutter", "Firebase"],
        videoUrl: "",
        githubUrl: "https://github.com/moksh1249/SyncED",
        liveUrl: "https://github.com/moksh1249/SyncED",
        color: "var(--accent-primary)"
    },
    {
        number: '02',
        title: "Imagine Cup 2026",
        description: "An inclusive educational application designed specifically for students with ADHD, dyslexia, and autism. Provides tailored learning tools and accessibility features with future expansion capabilities.",
        techStack: ["Dart", "Flutter", "Accessibility"],
        videoUrl: "",
        githubUrl: "https://github.com/moksh1249/imagine-cup-2026",
        liveUrl: "https://github.com/moksh1249/imagine-cup-2026",
        color: "var(--accent-secondary)"
    },
    {
        number: '03',
        title: "Nandi Scan V2",
        description: "An upgraded version of the original Nandi Scan with significantly improved user interface and enhanced server functionality for better performance and usability.",
        techStack: ["Dart", "Flutter", "Backend API"],
        videoUrl: "",
        githubUrl: "https://github.com/moksh1249/nandi-scan-v2",
        liveUrl: "https://github.com/moksh1249/nandi-scan-v2",
        color: "var(--accent-tertiary)"
    },
    {
        number: '04',
        title: "Music App",
        description: "A personal music application project designed to enhance portfolio skills. Features modern UI/UX and core music streaming functionality for user engagement.",
        techStack: ["Dart", "Flutter", "Audio API"],
        videoUrl: "",
        githubUrl: "https://github.com/moksh1249/music_app",
        liveUrl: "https://github.com/moksh1249/music_app",
        color: "var(--accent-primary)"
    },
    {
        number: '05',
        title: "Instagram Analyzer",
        description: "A web application that analyzes Instagram creator accounts and provides insights into posting patterns, engagement metrics, and creator-friendly analytics for content optimization.",
        techStack: ["HTML", "JavaScript", "Instagram API"],
        videoUrl: "",
        githubUrl: "https://github.com/moksh1249/Insta_analyzer",
        liveUrl: "https://github.com/moksh1249/Insta_analyzer",
        color: "var(--accent-secondary)"
    },
    {
        number: '06',
        title: "F1 concept design",
        description: "My first autodesk 360 project where I designed a simple F1 car concept. The project was a great learning experience in 3D modeling and design principles, showcasing my ability to create complex structures and attention to detail.",
        techStack: ["autodesk 360", "3D Modeling", "Design"],
        videoUrl: "",
        githubUrl: "",
        liveUrl: "",
        color: "var(--accent-primary)"
    },
    {
        number: '07',
        title: "Cansat concept design",
        description: "A cansat design project where I created a conceptual design for a small satellite that can be launched and deployed in the atmosphere. This project involved understanding the principles of satellite design, aerodynamics, and payload integration, demonstrating my ability to apply engineering concepts to real-world applications.",
        techStack: ["autodesk 360", "3D Modeling", "Aerospace Design"],
        videoUrl: "",
        githubUrl: "",
        liveUrl: "",
        color: "var(--accent-secondary)"
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
