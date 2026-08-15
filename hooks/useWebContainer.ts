// hooks/useWebContainer.ts
import { useState, useRef, useCallback } from 'react';
import { WebContainer } from '@webcontainer/api';
import type { ProjectFile } from '@/types/chat';

let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

export function useWebContainer() {
    const [url, setUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    const processOutput = useCallback((data: string) => {
        setLogs(prev => [...prev, data]);
    }, []);

    function generateFileTree(files: { path: string; content: string }[]) {
        const tree: any = {};

        for (const file of files) {
            const parts = file.path.split('/');
            const filename = parts.pop();
            let currentDir = tree;

            // Directories create
            for (const dir of parts) {
                if (!currentDir[dir]) {
                    currentDir[dir] = { directory: {} };
                }
                currentDir = currentDir[dir].directory;
            }

            // File insert
            if (filename) {
                currentDir[filename] = {
                    file: {
                        contents: file.content
                    }
                };
            }
        }
        return tree;
    }

    const bootAndRun = useCallback(async (files: ProjectFile[]) => {
        setIsLoading(true);
        setError(null);
        setLogs([]);
        setUrl(null);

        try {
            // 1. Boot WebContainer
            if (!webcontainerInstance) {
                if (!bootPromise) {
                    processOutput("Booting WebContainer...");
                    bootPromise = WebContainer.boot();
                }
                webcontainerInstance = await bootPromise;
                processOutput("WebContainer booted successfully.");
            }

            const instance = webcontainerInstance;
            if (!instance) throw new Error("Failed to boot WebContainer");

            // 2. SAFETY: Convert all files to 100% STRING format
            processOutput("Sanitizing files...");
            const safeFiles = files.map((file) => {
                let safePath = file.path.replace(/^\.\//, "");
                let safeContent = file.content;
                if (typeof safeContent !== 'string') {
                    safeContent = JSON.stringify(safeContent || '', null, 2);
                }

                return { path: safePath, content: safeContent };
            }).filter(file => file.path && file.path !== '');

            const hasEnv = safeFiles.some(f => f.path === '.env' || f.path === '.env.local');

            if (!hasEnv) {
                safeFiles.push({
                    path: '.env.local',
                    content: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Z2l2aW5nLWNveW90ZS0yOC5jbGVyay5hY2NvdW50cy5kZXYk`
                });
            }

            // 3. TREE MOUNT: Mount the files into the correct directory structure
            processOutput(`Mounting ${safeFiles.length} files...`);
            const fileTree = generateFileTree(safeFiles);
            await instance.mount(fileTree);
            processOutput("All files mounted successfully.");

            // 4. Install Dependencies
            processOutput("Running npm install...");
            const installProcess = await instance.spawn("npm", ["install"]);

            installProcess.output.pipeTo(
                new WritableStream({
                    write(data) {
                        processOutput(data);
                    },
                })
            );
            const installCode = await installProcess.exit;
            if (installCode !== 0) throw new Error(`npm install failed with code ${installCode}`);

            // 5. Run Dev Server
            processOutput("Starting development server...");
            const devProcess = await instance.spawn("npm", ["run", "dev"]);

            devProcess.output.pipeTo(
                new WritableStream({
                    write(data) {
                        processOutput(data);
                    },
                })
            );

            // 6. Listen for Server Ready
            instance.on('server-ready', (port, serverUrl) => {
                processOutput(`Server is ready on ${serverUrl}`);
                setUrl(serverUrl);
                setIsLoading(false);
                setServerError(null); 
            });

            // --- NEW: AUTO ERROR DETECTION ---
            devProcess.exit.then((code) => {
                if (code !== 0) {
                    const errMsg = `Dev server exited with code ${code}.`;
                    setError(errMsg);
                    setIsLoading(false);
                    setServerError(useBuildStore.getState().logs.join('\n'));
                }
            });

        } catch (err: any) {
            console.error("WebContainer Error:", err);
            setError(err.message || "Failed to start WebContainer");
            setIsLoading(false);
        }
    }, [url, processOutput]);

    const updateFile = useCallback(async (path: string, content: string) => {
        const instance = webcontainerInstance;
        if (!instance) return;

        try {
            await instance.fs.writeFile(path, content);
            processOutput(`Updated ${path} (Hot Reloading...)`);
        } catch (err) {
            console.error("File update error:", err);
        }
    }, [processOutput]);

    return { url, isLoading, error, logs, serverError, bootAndRun, updateFile };
}