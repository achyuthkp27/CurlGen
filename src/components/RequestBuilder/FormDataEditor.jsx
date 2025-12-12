import React from 'react';
import { Trash2 } from 'lucide-react';
import CustomSelect from '../UI/CustomSelect';
import './KeyValueEditor.css'; // Reuse KV styles

const FormDataEditor = ({ items, onAdd, onUpdate, onRemove }) => {
    return (
        <div className="kv-editor">
            <div className="kv-row kv-header" style={{ gridTemplateColumns: '32px 1fr 100px 1fr 32px' }}>
                <span></span>
                <span>Key</span>
                <span>Type</span>
                <span>Value</span>
                <span></span>
            </div>

            {items.map((item, index) => (
                <div key={item.id || index} className="kv-row animate-fade-in" style={{ gridTemplateColumns: '32px 1fr 100px 1fr 32px', overflow: 'visible' }}>
                    <input
                        type="checkbox"
                        className="kv-checkbox"
                        checked={item.enabled ?? true}
                        onChange={(e) => onUpdate(index, 'enabled', e.target.checked)}
                    />
                    <input
                        className="kv-input"
                        placeholder="Key"
                        value={item.key}
                        onChange={(e) => onUpdate(index, 'key', e.target.value)}
                    />
                    <CustomSelect
                        value={item.type || 'text'}
                        onChange={(val) => onUpdate(index, 'type', val)}
                        options={[
                            { value: 'text', label: 'Text' },
                            { value: 'file', label: 'File' }
                        ]}
                        className="h-full"
                    />
                    <input
                        className="kv-input"
                        placeholder={item.type === 'file' ? 'File path / @filename' : 'Value'}
                        value={item.value}
                        onChange={(e) => onUpdate(index, 'value', e.target.value)}
                    />
                    <button
                        className="btn btn-icon danger"
                        onClick={() => onRemove(index)}
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}

            <button className="btn btn-secondary btn-sm self-start" onClick={onAdd}>
                + Add Field
            </button>
        </div>
    );
};

export default FormDataEditor;
