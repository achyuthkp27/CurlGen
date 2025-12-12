import React from 'react';
import CustomSelect from '../UI/CustomSelect';
import './AuthSection.css';

const AUTH_TYPES = [
    { value: 'none', label: 'No Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'apikey', label: 'API Key' },
];

const AuthSection = ({ auth, onChange }) => {
    return (
        <div className="auth-section animate-fade-in">
            <div className="auth-type-selector">
                <label className="text-sm text-secondary">Type:</label>
                <div style={{ width: '200px' }}>
                    <CustomSelect
                        value={auth.type}
                        onChange={(val) => onChange('type', val)}
                        options={AUTH_TYPES}
                    />
                </div>
            </div>

            {auth.type !== 'none' && (
                <div className="auth-details animate-fade-in">
                    {auth.type === 'bearer' && (
                        <div className="auth-input-group">
                            <label className="auth-label">Token</label>
                            <input
                                className="auth-input"
                                type="text"
                                placeholder="Bearer Token"
                                value={auth.token}
                                onChange={(e) => onChange('token', e.target.value)}
                            />
                        </div>
                    )}

                    {auth.type === 'basic' && (
                        <>
                            <div className="auth-input-group">
                                <label className="auth-label">Username</label>
                                <input
                                    className="auth-input"
                                    type="text"
                                    placeholder="Username"
                                    value={auth.username}
                                    onChange={(e) => onChange('username', e.target.value)}
                                />
                            </div>
                            <div className="auth-input-group">
                                <label className="auth-label">Password</label>
                                <input
                                    className="auth-input"
                                    type="password"
                                    placeholder="Password"
                                    value={auth.password}
                                    onChange={(e) => onChange('password', e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {auth.type === 'apikey' && (
                        <>
                            <div className="auth-input-group">
                                <label className="auth-label">Key</label>
                                <input
                                    className="auth-input"
                                    type="text"
                                    placeholder="Key Name (e.g. x-api-key)"
                                    value={auth.apiKeyName}
                                    onChange={(e) => onChange('apiKeyName', e.target.value)}
                                />
                            </div>
                            <div className="auth-input-group">
                                <label className="auth-label">Value</label>
                                <input
                                    className="auth-input"
                                    type="text"
                                    placeholder="Value"
                                    value={auth.apiKey}
                                    onChange={(e) => onChange('apiKey', e.target.value)}
                                />
                            </div>
                            <div className="auth-input-group">
                                <label className="auth-label">Add to</label>
                                <CustomSelect
                                    value={auth.location || 'header'}
                                    onChange={(val) => onChange('location', val)}
                                    options={[
                                        { value: 'header', label: 'Header' },
                                        { value: 'query', label: 'Query Params' }
                                    ]}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AuthSection;
