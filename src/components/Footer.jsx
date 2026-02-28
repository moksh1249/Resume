import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Code2 } from 'lucide-react';
import './Footer.css';

const socials = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:email@example.com', label: 'Email' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Code2, href: '#', label: 'LeetCode' },
];

const Footer = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <footer className="footer" ref={ref}>
            <div className="footer-inner">
                {/* Big display text */}
                <motion.div
                    className="footer-headline"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="footer-cta-text">Let's Build Something</h2>
                    <span className="footer-cta-accent">Remarkable.</span>
                </motion.div>

                {/* Contact button */}
                <motion.a
                    href="mailto:email@example.com"
                    className="btn btn-primary footer-contact-btn"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Get In Touch ↗
                </motion.a>

                {/* Divider */}
                <div className="footer-divider" />

                {/* Bottom row */}
                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    <div className="footer-logo">
                        <span className="logo-mark">P</span>
                        <span className="footer-copy">
                            © {new Date().getFullYear()} Portfolio. Crafted with care.
                        </span>
                    </div>

                    {/* Socials */}
                    <div className="footer-socials">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a key={label} href={href} className="social-link" aria-label={label}>
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
