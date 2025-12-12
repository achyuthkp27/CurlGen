import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { generateCurl } from '../../utils/curlGenerator';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash'; // Load bash syntax
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import './CurlOutputPanel.css';

const CurlOutputPanel = ({ config }) => {
    const [curlCommand, setCurlCommand] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Debounce generation? The requirement was 200-300ms.
        // Let's use a timeout.
        const timer = setTimeout(() => {
            setCurlCommand(generateCurl(config));
        }, 200);
        return () => clearTimeout(timer);
    }, [config]);

    useEffect(() => {
        // Highlight syntax when code changes
        if (curlCommand) {
            Prism.highlightAll();
        }
    }, [curlCommand]);

    const handleCopy = () => {
        navigator.clipboard.writeText(curlCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="curl-output-panel">
            <div className="glass-panel p-6">
                <div className="result-header mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Terminal size={20} className="text-secondary" />
                        Generated cURL
                    </h2>
                </div>

                <div className="code-block-container">
                    <div className="code-block-header">
                        <span className="lang-label">Bash</span>
                        <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
                            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <pre className="code-content">
                        <code className="language-bash">{curlCommand}</code>
                    </pre>
                </div>
            </div>

            {copied && (
                <div className="toast success">
                    <Check size={20} className="text-success" />
                    <span>Copied cURL to clipboard!</span>
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


export default CurlOutputPanel;
