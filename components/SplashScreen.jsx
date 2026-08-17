import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

    useEffect(() => {
        // Phase 1 – letters animate in (0 → 900ms)
        // Phase 2 – hold briefly (900ms → 1800ms)
        const holdTimer = setTimeout(() => setPhase('exit'), 1900);
        // Phase 3 – exit animation plays (1800ms → 2600ms), then unmount
        const doneTimer = setTimeout(() => onComplete(), 2800);
        return () => { clearTimeout(holdTimer); clearTimeout(doneTimer); };
    }, [onComplete]);

    const letters = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];

    return (
        <div className={`splash ${phase}`} aria-hidden="true">
            {/* Background radial glow */}
            <div className="splash-glow" />

            <div className="splash-content">
                {/* Monogram mark */}
                <div className={`splash-mark ${phase}`}>
                    <span>P</span>
                </div>

                {/* Word reveal */}
                <div className="splash-word">
                    {letters.map((l, i) => (
                        <span
                            key={i}
                            className={`splash-letter ${phase}`}
                            style={{ animationDelay: `${i * 55}ms` }}
                        >
                            {l}
                        </span>
                    ))}
                </div>

                {/* Tagline */}
                <p className={`splash-tagline ${phase}`}>
                    <span className="mono">Loading experience...</span>
                </p>

                {/* Progress bar */}
                <div className={`splash-bar ${phase}`}>
                    <div className="splash-bar-fill" />
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
