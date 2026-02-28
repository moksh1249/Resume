import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navItems = ['About', 'Skills', 'Projects', 'Experience'];

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar-logo">
                <a href="#home" className="logo-link">
                    <span className="logo-mark">P</span>
                    <span className="logo-text">ortfolio</span>
                </a>
            </div>

            <div className={`navbar-links ${mobileOpen ? 'navbar-links--open' : ''}`}>
                {navItems.map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="nav-item"
                        onClick={() => setMobileOpen(false)}
                    >
                        {item}
                        <span className="nav-underline" />
                    </a>
                ))}
            </div>

            <div className="navbar-actions">
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <button
                    className={`hamburger ${mobileOpen ? 'hamburger--open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
