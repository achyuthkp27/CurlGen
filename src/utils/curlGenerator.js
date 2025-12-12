export const generateCurl = (config) => {
    if (!config.url) return 'curl ""';

    let command = ['curl'];

    // Options
    if (config.options.followRedirects) command.push('-L');
    if (config.options.verbose) command.push('-v');
    if (config.options.insecure) command.push('-k');
    if (config.options.compressed) command.push('--compressed');
    if (config.options.http2) command.push('--http2');
    if (config.options.timeout) command.push(`--max-time ${config.options.timeout}`);

    if (config.options.cookie) command.push(`--cookie "${config.options.cookie}"`);
    if (config.options.userAgent) command.push(`--user-agent "${config.options.userAgent}"`);
    if (config.options.proxy) command.push(`--proxy "${config.options.proxy}"`);
    if (config.options.proxyUser) command.push(`--proxy-user "${config.options.proxyUser}"`);

    // Method
    if (config.method !== 'GET') {
        command.push(`-X ${config.method}`);
    }

    // URL + Params
    let url = config.url;
    const params = config.params.filter(p => p.enabled && p.key);
    if (params.length > 0) {
        const hiddenUrl = new URL(url.startsWith('http') ? url : `http://${url}`);
        const searchParams = new URLSearchParams(hiddenUrl.search);
        params.forEach(p => searchParams.append(p.key, p.value));
        // If original url didn't have search params, we just append ?...
        // But simplest is to construct full URL
        // Handle relative URLs or partials gracefully?
        // Let's just append query string manually to avoid validation errors on partial URLs
        const queryString = params.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
        if (url.includes('?')) {
            url += `&${queryString}`;
        } else {
            url += `?${queryString}`;
        }
    }
    command.push(`"${url}"`);

    // Headers
    const headers = config.headers.filter(h => h.enabled && h.key);

    // Auth Headers
    if (config.auth.type === 'bearer' && config.auth.token) {
        headers.push({ key: 'Authorization', value: `Bearer ${config.auth.token}` });
    } else if (config.auth.type === 'basic') {
        // Use -u for basic auth or header?
        // command.push(`-u "${config.auth.username}:${config.auth.password}"`);
        // Let's use header to be explicit in preview
        const auth = btoa(`${config.auth.username}:${config.auth.password}`);
        headers.push({ key: 'Authorization', value: `Basic ${auth}` });
    } else if (config.auth.type === 'apikey' && config.auth.location === 'header' && config.auth.apiKeyName) {
        headers.push({ key: config.auth.apiKeyName, value: config.auth.apiKey });
    }

    // Content-Type for Body
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method)) {
        if (config.body.type === 'raw') {
            if (config.body.rawType === 'json') {
                if (!headers.find(h => h.key.toLowerCase() === 'content-type')) {
                    headers.push({ key: 'Content-Type', value: 'application/json' });
                }
            } else if (config.body.rawType === 'xml') {
                if (!headers.find(h => h.key.toLowerCase() === 'content-type')) {
                    headers.push({ key: 'Content-Type', value: 'application/xml' });
                }
            }
        } else if (config.body.type === 'urlencoded') {
            if (!headers.find(h => h.key.toLowerCase() === 'content-type')) {
                headers.push({ key: 'Content-Type', value: 'application/x-www-form-urlencoded' });
            }
        }
    }

    headers.forEach(h => {
        command.push(`-H "${h.key}: ${h.value}"`);
    });

    // Body
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method)) {
        if (config.body.type === 'raw' && config.body.content) {
            // Escape quotes in body
            let data = config.body.content.replace(/"/g, '\\"');
            command.push(`-d "${data}"`);
        } else if (config.body.type === 'urlencoded') {
            // Assuming body.content is valid urlencoded string or manageable KV?
            // Task description says KV pairs.
            // Let's assume body.formData for urlencoded too? Or just raw content?
            // Plan said "Key/Value key-value pairs".
            // I'll stick to raw content for now or implement KV later.
            // For now let's assume raw text for urlencoded in 'content' or use formData
            // If KV is implemented, I'd iterate.
            // Let's handle 'urlencoded' logic if I implement KV editor.
            // For now, let's assume data is in config.body.content directly?
            // Or traverse config.body.formData?
            // Let's check implementing KV for urlencoded in UI.
            // If using formData array:
            if (config.body.formData && config.body.formData.length) {
                const str = config.body.formData.map(f => `${encodeURIComponent(f.key)}=${encodeURIComponent(f.value)}`).join('&');
                command.push(`-d "${str}"`);
            }
        } else if (config.body.type === 'form-data') {
            config.body.formData.forEach(f => {
                if (f.type === 'file') {
                    command.push(`--form "${f.key}=@${f.value || 'file'}"`);
                } else {
                    command.push(`--form "${f.key}=${f.value}"`);
                }
            });
        } else if (config.body.type === 'binary') {
            command.push(`--data-binary "@${config.body.binaryPath || 'filename'}"`);
        }
    }

    return command.join(' \\\n  ');
};
