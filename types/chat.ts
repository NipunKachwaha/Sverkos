export interface Message {
    id: string;
    role: "user" | "model";
    content: string;
    createdAt: number;
}

export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

export interface StreamChunk {
    text: string;
    done: boolean;
    error?: string;
}

export interface PlanForgeConfig {
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
}

export const DEFAULT_CONFIG: PlanForgeConfig = {
    maxOutputTokens: 8192,
    temperature: 0.8,
    topP: 0.95,
    topK: 40,
};

export interface ProjectFile {
    id: string;
    path: string;
    content: string;
    language: string;
    isEntry?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    framework: string;
    status: "planning" | "generating" | "ready" | "deployed" | "error";
    files: ProjectFile[];
    createdAt: Date;
    updatedAt: Date;
}

export interface GenerationMessage {
    type:
    | "plan"
    | "file_start"
    | "file_chunk"
    | "file_complete"
    | "complete"
    | "error";
    path?: string;
    file?: ProjectFile;
    message?: string;
    fileCount?: number;
}