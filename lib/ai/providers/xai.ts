import OpenAI from 'openai';

export class XAIProvider {
    private client: OpenAI;

    constructor(apiKey: string) {
        // xAI uses the standard OpenAI SDK but pointing to their endpoint
        this.client = new OpenAI({
            apiKey,
            baseURL: "https://api.x.ai/v1"
        });
    }

    async generateCode(prompt: string, systemPrompt: string, maxTokens: number = 4096) {
        const response = await this.client.chat.completions.create({
            model: 'grok-beta', // ya jo bhi current model identifier ho
            max_tokens: maxTokens,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
        });

        return response.choices[0]?.message?.content || '';
    }

    async streamCode(prompt: string, systemPrompt: string, callback: (chunk: string) => void) {
        const stream = await this.client.chat.completions.create({
            model: 'grok-beta',
            max_tokens: 4096,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                callback(content);
            }
        }
    }
}