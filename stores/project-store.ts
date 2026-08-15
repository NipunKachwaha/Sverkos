// stores/project-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Project {
    id: string;
    userId: string;
    name: string;
    description?: string;
    framework: string;
    status: "planning" | "generating" | "ready" | "deployed" | "error";
    createdAt: string;
    updatedAt: string;
}

interface ProjectState {
    projects: Project[];
    activeProjectId: string | null;
    isLoading: boolean;

    // Actions
    setActiveProjectId: (id: string | null) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    setProjects: (projects: Project[]) => void;
    setLoading: (loading: boolean) => void;

    // DB Sync Actions
    fetchProjectsFromDB: (userId: string) => Promise<void>;
    createProjectInDB: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<Project>;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            projects: [],
            activeProjectId: null,
            isLoading: false,

            setActiveProjectId: (id) => set({ activeProjectId: id }),

            addProject: (project) =>
                set((state) => ({
                    projects: [project, ...state.projects],
                })),

            updateProject: (id, updates) =>
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
                    ),
                })),

            deleteProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                    activeProjectId: state.activeProjectId === id ? null : state.activeProjectId,
                })),

            setProjects: (projects) => set({ projects }),
            setLoading: (isLoading) => set({ isLoading }),

            // Fetch projects from your Next.js API (Supabase)
            fetchProjectsFromDB: async (userId: string) => {
                set({ isLoading: true });
                try {
                    const res = await fetch("/api/projects");
                    if (!res.ok) throw new Error("Failed to fetch");
                    const data = await res.json();
                    set({ projects: data.projects || [], isLoading: false });
                } catch (error) {
                    console.error("Fetch projects error:", error);
                    set({ isLoading: false });
                }
            },

            // Create project via API and update local state
            createProjectInDB: async (projectData) => {
                try {
                    const res = await fetch("/api/projects", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(projectData),
                    });

                    if (!res.ok) throw new Error("Failed to create project");

                    const data = await res.json();
                    const newProject = data.project as Project;

                    // Update local state
                    get().addProject(newProject);
                    get().setActiveProjectId(newProject.id);

                    return newProject;
                } catch (error) {
                    console.error("Create project error:", error);
                    throw error;
                }
            },
        }),
        {
            name: "sverkos-projects-storage", // LocalStorage key (Optional: remove persist if you only want DB state)
            partialize: (state) => ({ activeProjectId: state.activeProjectId }), // Sirf activeProjectId save karo local me, baaki DB se aayega
        }
    )
);