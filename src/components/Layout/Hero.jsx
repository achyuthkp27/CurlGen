import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import ScrollReveal from '../UI/ScrollReveal';
import './Hero.css';

const TEXTS = ["Build API Requests", "Generate cURL Commands", "Test Endpoints", "Debug Faster"];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    // 3D Tilt State
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (index >= TEXTS.length) {
            setIndex(0); // Loop
            return;
        }

        if (subIndex === TEXTS[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1500); // Wait before deleting
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => prev + 1); // Next word
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 50 : 100); // Speed

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);

    // Handle 3D Tilt
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate rotation (max 10 degrees)
        const rotateX = ((centerY - clientY) / centerY) * 10;
        const rotateY = ((clientX - centerX) / centerX) * 10;

        setTilt({ x: rotateX, y: rotateY });
    };

    // Scroll to builder
    const scrollToBuilder = () => {
        const element = document.getElementById('builder-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="hero-section" onMouseMove={handleMouseMove}>
            <div className="hero-bg-glow" />

            <div
                className="hero-content"
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                }}
            >
                <ScrollReveal>
                    <div className="badge-pill">
                        <Terminal size={12} />
                        <span>v1.0.0 Alpha</span>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <h1 className="hero-title">
                        <span className="text-gradient">cURL Studio</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <p className="hero-subtitle">
                        The intelligent way to {` `}
                        <span className="typing-text">
                            {TEXTS[index % TEXTS.length].substring(0, subIndex)}
                            <span className="cursor">|</span>
                        </span>
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg" onClick={scrollToBuilder}>
                            Start Building <ArrowRight size={18} />
                        </button>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Hero;
