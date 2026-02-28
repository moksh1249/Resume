import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import SplashScreen from './components/SplashScreen';
import './index.css';

function App() {
    const [theme, setTheme] = useState('dark');
    const [splashDone, setSplashDone] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Cursor glow tracker
    useEffect(() => {
        const el = cursorRef.current;
        if (!el) return;
        const onMove = (e) => {
            requestAnimationFrame(() => {
                el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
            });
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // Section-divider wipe animation (fires once per divider entering the viewport)
    useEffect(() => {
        if (!splashDone) return;
        const dividers = document.querySelectorAll('.section-divider');
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('wipe');
                        void entry.target.offsetWidth; // force reflow
                        entry.target.classList.add('wipe');
                    }
                });
            },
            { threshold: 0.5 }
        );
        dividers.forEach((d) => obs.observe(d));
        return () => obs.disconnect();
    }, [splashDone]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return (
        <>
            {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

            <div className={`app-container site-reveal ${splashDone ? 'site-reveal--visible' : ''}`}>
                <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />
                <Navbar theme={theme} toggleTheme={toggleTheme} />
                <main>
                    <Hero />
                    <div className="section-divider" />
                    <About />
                    <div className="section-divider" />
                    <Skills />
                    <div className="section-divider" />
                    <Projects />
                    <div className="section-divider" />
                    <Experience />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
