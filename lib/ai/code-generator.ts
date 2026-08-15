// lib/ai/code-generator.ts
import { AnthropicProvider } from './providers/anthropic';
import { OpenAIProvider } from './providers/openai';
import { GeminiProvider } from './providers/gemini';
import { XAIProvider } from './providers/xai';
import { getContextPrompt, getCodeGenerationPrompt } from './prompt-templates';
import { Project, ProjectFile } from '@/db/schema';

export class CodeGenerator {
    private providers: {
        anthropic: AnthropicProvider;
        openai: OpenAIProvider;
        gemini: GeminiProvider;
        xai: XAIProvider;
    };

    constructor() {
        // Initialize providers with API keys from environment
        this.providers = {
            anthropic: new AnthropicProvider(process.env.ANTHROPIC_API_KEY || ''),
            openai: new OpenAIProvider(process.env.OPENAI_API_KEY || ''),
            gemini: new GeminiProvider(process.env.GEMINI_API_KEY || ''),
            xai: new XAIProvider(process.env.XAI_API_KEY || ''),
        };
    }

    async generateProjectFiles(
        project: Project,
        userPrompt: string,
        existingFiles: ProjectFile[] = [],
        model: string = 'anthropic'
    ) {
        const provider = this.getProvider(model);

        // Prepare context from existing files
        const context = getContextPrompt(existingFiles);

        // Create the full prompt for code generation
        const fullPrompt = getCodeGenerationPrompt(userPrompt, project.framework, context);

        // System prompt for the AI
        const systemPrompt = `You are an expert web developer specializing in ${project.framework} applications. 
    Generate clean, production-ready code based on the user's requirements.
    Return the code in a structured JSON format with file paths and content.`;

        // Generate code
        const response = await provider.generateCode(fullPrompt, systemPrompt, 8000);

        // Parse the response to extract files
        return this.parseGeneratedFiles(response);
    }

    async streamProjectFiles(
        project: Project,
        userPrompt: string,
        existingFiles: ProjectFile[] = [],
        model: string = 'anthropic',
        callback: (file: ProjectFile) => void
    ) {
        const provider = this.getProvider(model);

        // Similar setup as above but with streaming
        const context = getContextPrompt(existingFiles);
        const fullPrompt = getCodeGenerationPrompt(userPrompt, project.framework, context);
        const systemPrompt = `...`; // Same as above

        let buffer = '';

        await provider.streamCode(fullPrompt, systemPrompt, (chunk) => {
            buffer += chunk;

            // Try to parse complete file objects from the buffer
            const fileRegex = /```json\n({[\s\S]*?})\n```/g;
            let match;

            while ((match = fileRegex.exec(buffer)) !== null) {
                try {
                    const file = JSON.parse(match[1]);
                    callback(file);

                    // Remove the processed part from the buffer
                    buffer = buffer.substring(0, match.index) + buffer.substring(match.index + match[0].length);
                } catch (e) {
                    // If parsing fails, continue accumulating
                    continue;
                }
            }
        });
    }

    private getProvider(model: string) {
        switch (model) {
            case 'anthropic': return this.providers.anthropic;
            case 'openai': return this.providers.openai;
            case 'gemini': return this.providers.gemini;
            case 'xai': return this.providers.xai;
            default: return this.providers.anthropic;
        }
    }

    private parseGeneratedFiles(response: string): ProjectFile[] {
        // Extract JSON file objects from the response
        const fileRegex = /```json\n({[\s\S]*?})\n```/g;
        const files: ProjectFile[] = [];
        let match;

        while ((match = fileRegex.exec(response)) !== null) {
            try {
                const file = JSON.parse(match[1]);
                if (file.path && file.content) {
                    files.push({
                        id: '', // Will be assigned by the database
                        projectId: '', // Will be assigned by the caller
                        path: file.path,
                        content: file.content,
                        language: this.getLanguageFromPath(file.path),
                        isEntry: file.isEntry || false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                }
            } catch (e) {
                console.error('Error parsing file:', e);
            }
        }

        return files;
    }

    private getLanguageFromPath(path: string): string {
        const ext = path.split('.').pop()?.toLowerCase();
        const languageMap: Record<string, string> = {
            'ts': 'typescript',
            'tsx': 'typescriptreact',
            'js': 'javascript',
            'jsx': 'javascriptreact',
            'css': 'css',
            'html': 'html',
            'json': 'json',
            'md': 'markdown',
            // Add more mappings as needed
        };

        return languageMap[ext || ''] || 'plaintext';
    }
}