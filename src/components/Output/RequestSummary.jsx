import React from 'react';
import './CurlOutputPanel.css'; // Re-use existing styles for now

const RequestSummary = ({ config }) => {
    return (
        <div className="glass-panel p-6 w-full animate-fade-in">
            <h3 className="text-lg font-bold mb-4">Request Summary</h3>
            <div className="summary-grid full-width-summary">
                <div className="summary-item">
                    <span className="summary-label">Method</span>
                    <span className="summary-value" style={{ color: getMethodColor(config.method) }}>{config.method}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Headers</span>
                    <span className="summary-value">{config.headers.filter(h => h.enabled && h.key).length + (config.auth.type !== 'none' ? 1 : 0) + (['POST', 'PUT', 'PATCH'].includes(config.method) ? 1 : 0)}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Body Type</span>
                    <span className="summary-value capitalize">{config.body.type}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Auth Type</span>
                    <span className="summary-value capitalize">{config.auth.type === 'apikey' ? 'API Key' : config.auth.type}</span>
                </div>
            </div>
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

export default RequestSummary;
