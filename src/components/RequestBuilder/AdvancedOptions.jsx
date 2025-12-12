import React from 'react';
import './AdvancedOptions.css';

const AdvancedOptions = ({ options, onChange }) => {
    return (
        <div className="advanced-options animate-fade-in">
            <div className="options-grid">
                {/* Flags Column */}
                <div className="option-column">
                    <h4 className="column-title">Flags</h4>
                    <div className="toggles-container">
                        <ToggleOption label="Follow Redirects (-L)" checked={options.followRedirects} onChange={(v) => onChange('followRedirects', v)} />
                        <ToggleOption label="Insecure SSL (-k)" checked={options.insecure} onChange={(v) => onChange('insecure', v)} />
                        <ToggleOption label="Verbose (-v)" checked={options.verbose} onChange={(v) => onChange('verbose', v)} />
                        <ToggleOption label="Compressed (--compressed)" checked={options.compressed} onChange={(v) => onChange('compressed', v)} />
                        <ToggleOption label="HTTP/2 (--http2)" checked={options.http2} onChange={(v) => onChange('http2', v)} />
                    </div>
                </div>

                {/* Settings Column */}
                <div className="option-column">
                    <h4 className="column-title">Settings</h4>
                    <div className="inputs-container">
                        <InputOption label="Timeout (seconds)" value={options.timeout} placeholder="30" onChange={(v) => onChange('timeout', v)} type="number" />
                        <InputOption label="User Agent" value={options.userAgent} placeholder="Mozilla/5.0..." onChange={(v) => onChange('userAgent', v)} />
                        <InputOption label="Cookie String" value={options.cookie} placeholder="key=value; key2=value2" onChange={(v) => onChange('cookie', v)} />
                    </div>
                </div>

                {/* Proxy Column */}
                <div className="option-column">
                    <h4 className="column-title">Proxy</h4>
                    <div className="inputs-container">
                        <InputOption label="Proxy Host" value={options.proxy} placeholder="http://proxy.example.com:8080" onChange={(v) => onChange('proxy', v)} />
                        <InputOption label="Proxy User" value={options.proxyUser} placeholder="username:password" onChange={(v) => onChange('proxyUser', v)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToggleOption = ({ label, checked, onChange }) => (
    <div className="option-row">
        <span className="option-label">{label}</span>
        <div
            className={`toggle-switch ${checked ? 'checked' : ''}`}
            onClick={() => onChange(!checked)}
        >
            <div className="toggle-thumb" />
        </div>
    </div>
);

const InputOption = ({ label, value, placeholder, onChange, type = 'text' }) => (
    <div className="option-input-group">
        <span className="option-label">{label}</span>
        <input
            className="option-text-input"
            type={type}
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
// End of component
// Add dummy export to replace existing default export logic if needed, but we are inside the file content replacement
const _dummy = () => { };

export default AdvancedOptions;
