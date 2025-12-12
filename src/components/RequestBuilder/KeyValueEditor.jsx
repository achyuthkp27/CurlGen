import React from 'react';
import { Trash2, CheckSquare, Square, Plus } from 'lucide-react'; // Need to ensure lucide-react is installed
import './KeyValueEditor.css';

const KeyValueEditor = ({ items, onAdd, onUpdate, onRemove, typeName = 'Item', hideDescription = false }) => {
    return (
        <div className="kv-editor">
            {items.length > 0 && (
                <div className={`kv-row kv-header ${hideDescription ? 'hide-desc' : ''}`}>
                    <span></span>
                    <span>Key</span>
                    <span>Value</span>
                    {!hideDescription && <span>Description</span>}
                    <span></span>
                </div>
            )}

            {items.map((item, index) => (
                <div key={item.id || index} className={`kv-row animate-fade-in ${hideDescription ? 'hide-desc' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
                    <input
                        type="checkbox"
                        className="kv-checkbox"
                        checked={item.enabled}
                        onChange={(e) => onUpdate(index, 'enabled', e.target.checked)}
                    />
                    <input
                        className="kv-input"
                        placeholder="Key"
                        value={item.key}
                        onChange={(e) => onUpdate(index, 'key', e.target.value)}
                    />
                    <input
                        className="kv-input"
                        placeholder="Value"
                        value={item.value}
                        onChange={(e) => onUpdate(index, 'value', e.target.value)}
                    />
                    {!hideDescription && (
                        <input
                            className="kv-input"
                            placeholder="Description"
                            value={item.description || ''}
                            onChange={(e) => onUpdate(index, 'description', e.target.value)}
                        />
                    )}
                    <button
                        className="btn btn-icon danger"
                        onClick={() => onRemove(index)}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}

            <button className="btn btn-secondary btn-sm self-start" onClick={onAdd}>
                <Plus size={16} />
                <span>Add Item</span>
            </button>
        </div>
    );
};

export default KeyValueEditor;
