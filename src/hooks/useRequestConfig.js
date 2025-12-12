import { useReducer, useMemo, useEffect } from 'react';

const initialState = {
    method: 'GET',
    url: '',
    params: [], // { key, value, enabled, description }
    headers: [], // { key, value, enabled, description }
    auth: { type: 'none', token: '', username: '', password: '', apiKey: '', apiKeyLocation: 'header', apiKeyName: '' },
    body: { type: 'none', rawType: 'json', content: '', formData: [], binaryPath: '' }, // formData: { key, value, type: text/file }
    options: {
        followRedirects: true,
        http2: false,
        verbose: false,
        compressed: true,
        insecure: false, // -k
        timeout: '',
        cookie: '', // --cookie
        userAgent: '', // --user-agent
        proxy: '', // --proxy
        proxyUser: '', // --proxy-user
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_NESTED_FIELD':
            return { ...state, [action.parent]: { ...state[action.parent], [action.field]: action.value } };
        case 'UPDATE_ITEM':
            // Generic updater for lists (params, headers, formData)
            // action: { list: 'params', index, field, value }
            const newList = [...state[action.list]];
            newList[action.index] = { ...newList[action.index], [action.field]: action.value };
            return { ...state, [action.list]: newList };
        case 'ADD_ITEM':
            return { ...state, [action.list]: [...state[action.list], action.payload] };
        case 'REMOVE_ITEM':
            return { ...state, [action.list]: state[action.list].filter((_, i) => i !== action.index) };

        // Form Data specific actions (nested in body)
        case 'ADD_FORM_DATA':
            return { ...state, body: { ...state.body, formData: [...state.body.formData, action.payload] } };
        case 'UPDATE_FORM_DATA':
            const newFormData = [...state.body.formData];
            newFormData[action.index] = { ...newFormData[action.index], [action.field]: action.value };
            return { ...state, body: { ...state.body, formData: newFormData } };
        case 'REMOVE_FORM_DATA':
            return { ...state, body: { ...state.body, formData: state.body.formData.filter((_, i) => i !== action.index) } };

        case 'SET_STATE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const useRequestConfig = () => {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        try {
            const saved = localStorage.getItem('curl_studio_config');
            if (!saved) return initial;

            const parsed = JSON.parse(saved);

            // Migration: Ensure all list items have IDs
            parsed.params = (parsed.params || []).map(p => ({ ...p, id: p.id || generateId() }));
            parsed.headers = (parsed.headers || []).map(h => ({ ...h, id: h.id || generateId() }));
            if (parsed.body && parsed.body.formData) {
                parsed.body.formData = parsed.body.formData.map(f => ({ ...f, id: f.id || generateId() }));
            }

            return { ...initial, ...parsed };
        } catch (e) {
            return initial;
        }
    });

    useEffect(() => {
        localStorage.setItem('curl_studio_config', JSON.stringify(state));
    }, [state]);

    const actions = useMemo(() => ({
        setMethod: (method) => dispatch({ type: 'SET_FIELD', field: 'method', value: method }),
        setUrl: (url) => dispatch({ type: 'SET_FIELD', field: 'url', value: url }),

        // Params
        addParam: () => dispatch({ type: 'ADD_ITEM', list: 'params', payload: { id: generateId(), key: '', value: '', enabled: true, description: '' } }),
        updateParam: (index, field, value) => dispatch({ type: 'UPDATE_ITEM', list: 'params', index, field, value }),
        removeParam: (index) => dispatch({ type: 'REMOVE_ITEM', list: 'params', index }),

        // Headers
        addHeader: () => dispatch({ type: 'ADD_ITEM', list: 'headers', payload: { id: generateId(), key: '', value: '', enabled: true, description: '' } }),
        updateHeader: (index, field, value) => dispatch({ type: 'UPDATE_ITEM', list: 'headers', index, field, value }),
        removeHeader: (index) => dispatch({ type: 'REMOVE_ITEM', list: 'headers', index }),

        // Auth
        setAuth: (field, value) => dispatch({ type: 'SET_NESTED_FIELD', parent: 'auth', field, value }),

        // Body
        setBodyType: (type) => dispatch({ type: 'SET_NESTED_FIELD', parent: 'body', field: 'type', value: type }),
        setBodyContent: (content) => dispatch({ type: 'SET_NESTED_FIELD', parent: 'body', field: 'content', value: content }),
        setBodyRawType: (rawType) => dispatch({ type: 'SET_NESTED_FIELD', parent: 'body', field: 'rawType', value: rawType }),
        setBodyBinaryPath: (path) => dispatch({ type: 'SET_NESTED_FIELD', parent: 'body', field: 'binaryPath', value: path }),
        // Form Data actions
        addFormData: () => dispatch({ type: 'ADD_FORM_DATA', payload: { id: generateId(), key: '', value: '', type: 'text', enabled: true } }),
        updateFormData: (index, field, value) => dispatch({ type: 'UPDATE_FORM_DATA', index, field, value }),
        removeFormData: (index) => dispatch({ type: 'REMOVE_FORM_DATA', index }),

        // Options
        setOption: (field, value) => dispatch({ type: 'SET_NESTED_FIELD', parent: 'options', field, value }),
    }), []);

    return { state, actions };
};
