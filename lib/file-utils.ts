// lib/file-utils.ts
export function buildNestedFiles(files: { path: string; content: string }[]): Record<string, any> {
    const root: Record<string, any> = {};

    for (const file of files) {
        const parts = file.path.split('/').filter(p => p.trim() !== '');
        if (parts.length === 0) continue;

        let current = root;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i === parts.length - 1) {
                current[part] = file.content;
            } else {
                if (!current[part] || typeof current[part] === 'string') {
                    current[part] = {};
                }
                current = current[part];
            }
        }
    }
    return root;
}