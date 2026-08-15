import OpenAI from 'openai';

export class OpenAIProvider {
    private client: OpenAI;

    constructor(apiKey: string) {
        this.client = new OpenAI({ apiKey });
    }

    async generateCode(prompt: string, systemPrompt: string, maxTokens: number = 4096) {
        const response = await this.client.chat.completions.create({
            model: 'gpt-4o',
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
            model: 'gpt-4o',
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