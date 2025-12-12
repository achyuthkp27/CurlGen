import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo">
                    <div className="logo-icon-wrapper">
                        <Zap size={20} className="logo-icon" />
                    </div>
                    <span className="logo-text text-gradient">cURL Studio</span>
                </div>
                <div className="nav-links">
                    {/* Links removed as per user request */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
