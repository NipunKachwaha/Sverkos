// stores/build-store.ts
import { create } from "zustand";
import type { ProjectFile } from "@/types/chat";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
}

export interface GenerationProgress {
    current: number;
    total: number;
    currentFile: string;
    status: "idle" | "planning" | "generating" | "complete" | "error";
    message: string;
}

interface BuildState {
    // Files State
    files: ProjectFile[];
    activeFilePath: string | null;

    // UI State
    activeTab: "code" | "preview" | "split";
    showChat: boolean;
    selectedModel: string;

    // Chat State
    chatMessages: ChatMessage[];

    // Generation State
    isGenerating: boolean;
    generationProgress: GenerationProgress;

    // Derived State Helper (Zustand way)
    getActiveFile: () => ProjectFile | undefined;

    // File Actions
    setFiles: (files: ProjectFile[]) => void;
    addOrUpdateFile: (file: ProjectFile) => void;
    removeFile: (path: string) => void;
    setActiveFilePath: (path: string | null) => void;
    updateFileContent: (path: string, content: string) => void;
    clearFiles: () => void;

    // UI Actions
    setActiveTab: (tab: "code" | "preview" | "split") => void;
    toggleChat: () => void;
    setShowChat: (show: boolean) => void;
    setSelectedModel: (model: string) => void;

    // Chat Actions
    addMessage: (role: "user" | "assistant" | "system", content: string) => void;
    clearChat: () => void;

    // Generation Actions
    setGenerating: (isGenerating: boolean) => void;
    setProgress: (progress: Partial<GenerationProgress>) => void;
    resetProgress: () => void;

    // Reset entire build state (when switching projects)
    resetBuildState: () => void;
}

const initialProgress: GenerationProgress = {
    current: 0,
    total: 0,
    currentFile: "",
    status: "idle",
    message: "",
};

export const useBuildStore = create<BuildState>()((set, get) => ({
    // Initial States
    files: [],
    activeFilePath: null,
    activeTab: "split",
    showChat: true,
    selectedModel: "claude-3-opus",
    chatMessages: [],
    isGenerating: false,
    generationProgress: initialProgress,

    // Derived Helper
    getActiveFile: () => {
        const { files, activeFilePath } = get();
        return files.find((f) => f.path === activeFilePath);
    },

    // File Actions
    setFiles: (files) => {
        set({ files });
        // Auto-select first file if none is selected
        if (files.length > 0 && !get().activeFilePath) {
            set({ activeFilePath: files[0].path });
        }
    },

    addOrUpdateFile: (file) =>
        set((state) => {
            const exists = state.files.find((f) => f.path === file.path);
            let newFiles: ProjectFile[];

            if (exists) {
                // Update existing file content
                newFiles = state.files.map((f) => (f.path === file.path ? { ...f, ...file } : f));
            } else {
                // Add new file
                newFiles = [...state.files, file];
            }

            return {
                files: newFiles,
                // Auto-select the newly added/updated file
                activeFilePath: file.path,
            };
        }),

    removeFile: (path) =>
        set((state) => {
            const newFiles = state.files.filter((f) => f.path !== path);
            return {
                files: newFiles,
                // If deleted file was active, select the first available file
                activeFilePath:
                    state.activeFilePath === path
                        ? newFiles[0]?.path || null
                        : state.activeFilePath,
            };
        }),

    setActiveFilePath: (path) => set({ activeFilePath: path }),

    updateFileContent: (path, content) =>
        set((state) => ({
            files: state.files.map((f) =>
                f.path === path ? { ...f, content } : f
            ),
        })),

    clearFiles: () => set({ files: [], activeFilePath: null }),

    // UI Actions
    setActiveTab: (activeTab) => set({ activeTab }),
    toggleChat: () => set((state) => ({ showChat: !state.showChat })),
    setShowChat: (showChat) => set({ showChat }),
    setSelectedModel: (selectedModel) => set({ selectedModel }),

    // Chat Actions
    addMessage: (role, content) =>
        set((state) => ({
            chatMessages: [
                ...state.chatMessages,
                {
                    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    role,
                    content,
                    timestamp: new Date(),
                },
            ],
        })),

    clearChat: () => set({ chatMessages: [] }),

    // Generation Actions
    setGenerating: (isGenerating) => set({ isGenerating }),

    setProgress: (progress) =>
        set((state) => ({
            generationProgress: { ...state.generationProgress, ...progress },
        })),

    resetProgress: () => set({ generationProgress: initialProgress, isGenerating: false }),

    // Master Reset (Jab user dusra project open kare)
    resetBuildState: () =>
        set({
            files: [],
            activeFilePath: null,
            activeTab: "split",
            showChat: true,
            chatMessages: [],
            isGenerating: false,
            generationProgress: initialProgress,
        }),
}));