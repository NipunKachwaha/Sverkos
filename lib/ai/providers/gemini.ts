import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider {
    private client: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.client = new GoogleGenerativeAI(apiKey);
    }

    async generateCode(prompt: string, systemPrompt: string, maxTokens: number = 4096) {
        // Gemini 1.5 Pro is best for coding tasks
        const model = this.client.getGenerativeModel({
            model: 'gemini-1.5-pro',
            systemInstruction: systemPrompt
        });

        const response = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: maxTokens },
        });

        return response.response.text();
    }

    async streamCode(prompt: string, systemPrompt: string, callback: (chunk: string) => void) {
        const model = this.client.getGenerativeModel({
            model: 'gemini-1.5-pro',
            systemInstruction: systemPrompt
        });

        const stream = await model.generateContentStream({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 4096 },
        });

        for await (const chunk of stream) {
            const chunkText = chunk.text();
            if (chunkText) {
                callback(chunkText);
            }
        }
    }
}