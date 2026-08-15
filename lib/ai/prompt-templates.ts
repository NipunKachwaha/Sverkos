// lib/ai/prompt-templates.ts
import { ProjectFile } from '@/db/schema';

export function getContextPrompt(existingFiles: ProjectFile[]): string {
    if (existingFiles.length === 0) return '';

    let context = "Here are the existing files in the project:\n\n";

    for (const file of existingFiles) {
        context += `File: ${file.path}\n`;
        context += "```" + getLanguageExtension(file.language) + "\n";
        context += file.content + "\n";
        context += "```\n\n";
    }

    return context;
}

export function getCodeGenerationPrompt(
    userPrompt: string,
    framework: string,
    context: string
): string {
    return `User wants to build: ${userPrompt}

 ${context ? `Existing project context:\n${context}` : ''}

Generate a complete ${framework} application that fulfills the user's requirements. 
For each file, provide the path and content in the following JSON format:

\`\`\`json
{
  "path": "path/to/file.ext",
  "content": "file content here",
  "isEntry": false
}
\`\`\`

Make sure to include all necessary files for a complete, working application.
Include package.json with all required dependencies.
Include any necessary configuration files.
For the main entry file, set "isEntry": true.`;
}

function getLanguageExtension(language: string): string {
    const extensionMap: Record<string, string> = {
        'typescript': 'typescript',
        'typescriptreact': 'tsx',
        'javascript': 'javascript',
        'javascriptreact': 'jsx',
        'css': 'css',
        'html': 'html',
        'json': 'json',
        'markdown': 'markdown',
    };

    return extensionMap[language] || '';
}