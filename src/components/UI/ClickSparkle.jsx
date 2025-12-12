import React, { useState, useEffect, useCallback } from 'react';

const ClickSparkle = () => {
    const [particles, setParticles] = useState([]);

    const createParticles = useCallback((e) => {
        const particleCount = 12;
        const newParticles = [];
        const colors = ['#6366f1', '#d946ef', '#00ff94', '#ffffff'];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: Date.now() + i,
                x: e.pageX,
                y: e.pageY,
                color: colors[Math.floor(Math.random() * colors.length)],
                velocity: {
                    x: (Math.random() - 0.5) * 10,
                    y: (Math.random() - 0.5) * 10,
                },
                life: 1,
                size: Math.random() * 4 + 2,
            });
        }

        setParticles((prev) => [...prev, ...newParticles]);
    }, []);

    useEffect(() => {
        window.addEventListener('click', createParticles);
        return () => window.removeEventListener('click', createParticles);
    }, [createParticles]);

    useEffect(() => {
        if (particles.length === 0) return;

        const interval = setInterval(() => {
            setParticles((prevParticles) =>
                prevParticles
                    .map((p) => ({
                        ...p,
                        x: p.x + p.velocity.x,
                        y: p.y + p.velocity.y,
                        life: p.life - 0.05,
                        velocity: {
                            ...p.velocity,
                            y: p.velocity.y + 0.2, // gravity
                        },
                    }))
                    .filter((p) => p.life > 0)
            );
        }, 16);

        return () => clearInterval(interval);
    }, [particles]);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: '50%',
                        opacity: p.life,
                        transform: `scale(${p.life})`,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                />
            ))}
        </div>
    );
};

export default ClickSparkle;
