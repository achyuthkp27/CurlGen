import React, { useState } from 'react';
import Navbar from './Navbar';
import ClickSparkle from '../UI/ClickSparkle';
import ScrollReveal from '../UI/ScrollReveal';
import Hero from './Hero';
import './AppLayout.css';

// Context for passing data down without prop drilling if needed
// But for now, we'll compose it in App.jsx or here.
// Actually, let's keep App.jsx for context providers if any.

const AppLayout = ({ children, bottomContent }) => {
    return (
        <div className="app-layout">
            <ClickSparkle />
            <Navbar />
            <Hero />
            <main className="main-content">
                <ScrollReveal delay={0.2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div id="builder-section" className="content-grid">
                        {children}
                    </div>
                    {bottomContent && (
                        <div className="bottom-section mt-8">
                            {bottomContent}
                        </div>
                    )}
                </ScrollReveal>
            </main>
            <footer className="footer">
                <p>&copy; 2024 cURL Studio. Built with React & Vite.</p>
            </footer>
        </div>
    );
};

export default AppLayout;
