import React from 'react';
import { Wand2 } from 'lucide-react';
import FormDataEditor from './FormDataEditor';
import CustomSelect from '../UI/CustomSelect';
import './BodySection.css';

const BODY_TYPES = [
    { value: 'none', label: 'None' },
    { value: 'form-data', label: 'form-data' },
    { value: 'urlencoded', label: 'x-www-form-urlencoded' },
    { value: 'raw', label: 'raw' },
    { value: 'binary', label: 'binary' },
];

const RAW_TYPES = [
    { value: 'json', label: 'JSON' },
    { value: 'text', label: 'Text' },
    { value: 'xml', label: 'XML' },
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'JavaScript' },
];

const BodySection = ({ body, onChange, onActions }) => {
    return (
        <div className="body-section animate-fade-in">
            <div className="body-type-selector">
                {BODY_TYPES.map(t => (
                    <label key={t.value} className="body-type-label">
                        <input
                            type="radio"
                            name="bodyType"
                            value={t.value}
                            checked={body.type === t.value}
                            onChange={(e) => onChange('type', e.target.value)}
                        />
                        {t.label}
                    </label>
                ))}
            </div>

            <div className="body-editor-container pt-4">
                {body.type === 'none' && (
                    <div className="text-secondary text-sm italic p-4">This request does not have a body.</div>
                )}

                {body.type === 'raw' && (
                    <div className="animate-fade-in">
                        <div className="body-toolbar">
                            <div style={{ width: '150px' }}>
                                <CustomSelect
                                    value={body.rawType}
                                    onChange={(val) => onChange('rawType', val)}
                                    options={RAW_TYPES}
                                />
                            </div>
                            {body.rawType === 'json' && (
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '0.45rem 1rem' }} /* Match CustomSelect height roughly */
                                    onClick={() => {
                                        try {
                                            const fmt = JSON.stringify(JSON.parse(body.content), null, 2);
                                            onChange('content', fmt);
                                        } catch (e) { /* ignore */ }
                                    }}
                                    title="Prettify JSON"
                                >
                                    <Wand2 size={14} className="text-accent-primary" />
                                    <span>Prettify</span>
                                </button>
                            )}
                        </div>
                        <textarea
                            className="body-textarea"
                            value={body.content}
                            onChange={(e) => onChange('content', e.target.value)}
                            placeholder={body.rawType === 'json' ? '{\n  "key": "value"\n}' : 'Enter body content...'}
                        />
                    </div>
                )}

                {body.type === 'form-data' && (
                    <FormDataEditor
                        items={body.formData || []}
                        onAdd={() => onActions.addFormData()}
                        onUpdate={(idx, field, val) => onActions.updateFormData(idx, field, val)}
                        onRemove={(idx) => onActions.removeFormData(idx)}
                    />
                )}

                {body.type === 'urlencoded' && (
                    <div className="animate-fade-in">
                        <p className="text-xs text-secondary mb-2">Enter data in raw format for now (key=value&...)</p>
                        <textarea
                            className="body-textarea"
                            value={body.content}
                            onChange={(e) => onChange('content', e.target.value)}
                            placeholder="key=value&foo=bar"
                        />
                    </div>
                )}

                {body.type === 'binary' && (
                    <div className="animate-fade-in p-4 bg-element rounded border border-border">
                        <label className="auth-label mb-2">File Path</label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="/path/to/file or filename"
                            value={body.binaryPath}
                            onChange={(e) => onChange('binaryPath', e.target.value)}
                        />
                        <p className="text-xs text-secondary mt-2">
                            This file will be used with curl's <code>--data-binary @filename</code> option.
                        </p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default BodySection;
