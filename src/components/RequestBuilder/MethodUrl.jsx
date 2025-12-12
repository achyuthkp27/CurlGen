import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import './MethodUrl.css';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

const MethodUrl = ({ config, actions }) => {
    return (
        <div className="method-url-container glow-border">
            <MethodSelect
                value={config.method}
                onChange={actions.setMethod}
            />

            <div className="url-input-wrapper">
                <input
                    type="text"
                    className="url-input"
                    placeholder="https://api.example.com/v1/resource"
                    value={config.url}
                    onChange={(e) => actions.setUrl(e.target.value)}
                />
            </div>


        </div>
    );
};

const MethodSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const color = getMethodColor(value);

    return (
        <div className="method-select-wrapper" ref={ref}>
            <button
                className="method-trigger"
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: color }}
            >
                <span className="method-badge" style={{ backgroundColor: `${color}20`, borderColor: `${color}40` }}>
                    {value}
                </span>
                {isOpen ? <ChevronUp size={14} className="text-secondary" /> : <ChevronDown size={14} className="text-secondary" />}
            </button>

            {isOpen && (
                <div className="method-dropdown">
                    {METHODS.map(m => (
                        <div
                            key={m}
                            className={`method-option ${m === value ? 'selected' : ''}`}
                            onClick={() => {
                                onChange(m);
                                setIsOpen(false);
                            }}
                        >
                            <span
                                className="method-label"
                                style={{ color: getMethodColor(m) }}
                            >
                                {m}
                            </span>
                            {m === value && <Check size={14} className="text-success" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const getMethodColor = (method) => {
    switch (method) {
        case 'GET': return '#6366f1';
        case 'POST': return '#22c55e';
        case 'PUT': return '#eab308';
        case 'DELETE': return '#f97373';
        case 'PATCH': return '#a855f7';
        default: return '#94a3b8';
    }
}

export default MethodUrl;
