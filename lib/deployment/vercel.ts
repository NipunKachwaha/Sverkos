// lib/deployment/vercel.ts
import { Project, ProjectFile } from '@/db/schema';

export class VercelDeployment {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async deploy(project: Project, files: ProjectFile[]): Promise<{ url: string; id: string }> {
        // Create a new deployment on Vercel
        const response = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `ai-gen-${project.id}`,
                projectSettings: {
                    framework: this.getFramework(project.framework),
                },
                files: files.map(file => ({
                    file: file.path,
                    data: file.content,
                    encoding: 'utf8',
                })),
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to deploy to Vercel');
        }

        const data = await response.json();

        return {
            url: data.url,
            id: data.id,
        };
    }

    private getFramework(framework: string): string {
        const frameworkMap: Record<string, string> = {
            'nextjs': 'nextjs',
            'react': 'create-react-app',
            'vue': 'vue',
            'nuxt': 'nuxtjs',
            // Add more mappings as needed
        };

        return frameworkMap[framework] || 'nextjs';
    }
}