import React, { useState } from 'react';
import MethodUrl from './MethodUrl';
import KeyValueEditor from './KeyValueEditor';
import AuthSection from './AuthSection';
import BodySection from './BodySection';
import AdvancedOptions from './AdvancedOptions';
import './BuilderPanel.css';

const TABS = [
    { id: 'params', label: 'Params' },
    { id: 'headers', label: 'Headers' },
    { id: 'auth', label: 'Auth' },
    { id: 'body', label: 'Body' },
    { id: 'options', label: 'Settings' },
];

const BuilderPanel = ({ config, actions }) => {
    const [activeTab, setActiveTab] = useState('params');

    return (
        <div className="builder-panel">
            <MethodUrl config={config} actions={actions} />

            <div className="glass-panel p-6">
                <div className="builder-tabs">
                    <div className="tabs-header">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                                {/* Optional: Add active count indicator */}
                                {(tab.id === 'params' && config.params.filter(p => p.enabled && p.key).length > 0) &&
                                    <span className="tab-dot" />
                                }
                                {(tab.id === 'headers' && config.headers.filter(p => p.enabled && p.key).length > 0) &&
                                    <span className="tab-dot" />
                                }
                                {(tab.id === 'auth' && config.auth.type !== 'none') &&
                                    <span className="tab-dot" />
                                }
                                {(tab.id === 'body' && config.body.type !== 'none') &&
                                    <span className="tab-dot" />
                                }
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        {activeTab === 'params' && (
                            <KeyValueEditor
                                items={config.params}
                                onAdd={actions.addParam}
                                onUpdate={(index, field, val) => actions.updateParam(index, field, val)}
                                onRemove={actions.removeParam}
                                typeName="Param"
                            />
                        )}
                        {activeTab === 'headers' && (
                            <KeyValueEditor
                                items={config.headers}
                                onAdd={actions.addHeader}
                                onUpdate={(index, field, val) => actions.updateHeader(index, field, val)}
                                onRemove={actions.removeHeader}
                                typeName="Header"
                                hideDescription={true}
                            />
                        )}
                        {activeTab === 'auth' && (
                            <AuthSection auth={config.auth} onChange={actions.setAuth} />
                        )}
                        {activeTab === 'body' && (
                            <BodySection
                                body={config.body}
                                onActions={actions}
                                onChange={(field, val) => {
                                    if (field === 'type') actions.setBodyType(val);
                                    else if (field === 'content') actions.setBodyContent(val);
                                    else if (field === 'rawType') actions.setBodyRawType(val);
                                    else if (field === 'binaryPath') actions.setBodyBinaryPath(val);
                                }}
                            />
                        )}
                        {activeTab === 'options' && (
                            <AdvancedOptions options={config.options} onChange={actions.setOption} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuilderPanel;
