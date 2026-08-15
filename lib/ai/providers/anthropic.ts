// lib/ai/providers/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

export class AnthropicProvider {
    private client: Anthropic;

    constructor(apiKey: string) {
        this.client = new Anthropic({ apiKey });
    }

    async generateCode(prompt: string, systemPrompt: string, maxTokens: number = 4096) {
        const response = await this.client.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: maxTokens,
            system: systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });

        return response.content[0].type === 'text' ? response.content[0].text : '';
    }

    async streamCode(prompt: string, systemPrompt: string, callback: (chunk: string) => void) {
        const stream = await this.client.messages.stream({
            model: 'claude-3-opus-20240229',
            max_tokens: 4096,
            system: systemPrompt,
            messages: [{ role: 'user', content: prompt }],
        });

        for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                callback(event.delta.text);
            }
        }
    }
}

// Similar implementations for OpenAI, Gemini, and xAI