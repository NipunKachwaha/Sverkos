"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chat, Message, StreamChunk } from "@/types/chat";

const STORAGE_KEY = "planforge_chats";

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

function loadChats(): Chat[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveChats(chats: Chat[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

// Helper function to convert File to Sverkos
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

export function usePlanForge() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const abortRef = useRef<AbortController | null>(null);

    // Hydrate from localStorage on mount
    useEffect(() => {
        setChats(loadChats());
    }, []);

    // Persist whenever chats change
    useEffect(() => {
        if (chats.length > 0 || loadChats().length > 0) {
            saveChats(chats);
        }
    }, [chats]);

    // Derived state
    const currentChat = chats.find((c) => c.id === currentChatId) ?? null;
    const messages = currentChat?.messages ?? [];

    // ---- Chat Management ----
    const createNewChat = useCallback((): string => {
        const chat: Chat = {
            id: generateId(),
            title: "New Plan",
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setChats((prev) => [chat, ...prev]);
        setCurrentChatId(chat.id);
        return chat.id;
    }, []);

    const loadChat = useCallback((chatId: string) => {
        setCurrentChatId(chatId);
        setStreamingContent("");
    }, []);

    const deleteChat = useCallback(
        (chatId: string) => {
            setChats((prev) => {
                const filtered = prev.filter((c) => c.id !== chatId);
                if (currentChatId === chatId) {
                    setCurrentChatId(filtered.length > 0 ? filtered[0].id : null);
                }
                return filtered;
            });
            setStreamingContent("");
        },
        [currentChatId]
    );

    const clearAllChats = useCallback(() => {
        setChats([]);
        setCurrentChatId(null);
        setStreamingContent("");
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // ---- Streaming API Call ----

    const sendMessage = useCallback(
        async (content: string, files?: File[]) => {
            if ((!content.trim() && !files?.length) || isGenerating) return;

            let imagesArray: string[] = [];
            if (files && files.length > 0) {
                const imageFiles = files.filter((f) => f.type.startsWith("image/"));
                imagesArray = await Promise.all(imageFiles.map(fileToBase64));
            }

            const userMessage: Message = {
                id: generateId(),
                role: "user",
                content: content.trim() || "Please analyze these images.", 
                createdAt: Date.now(),
            } as any; 

            if (imagesArray.length > 0) {
                (userMessage as any).images = imagesArray;
            }

            let chatId = currentChatId;
            let allMessages: any[] = []; 

            if (!chatId) {
                chatId = generateId();
                allMessages = [userMessage];
                
                const newChat: Chat = {
                    id: chatId,
                    title: content.trim().substring(0, 50) + (content.trim().length > 50 ? "..." : "Image Analysis"),
                    messages: allMessages as Message[],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                setChats((prev) => [newChat, ...prev]);
                setCurrentChatId(chatId);
            } else {
                setChats((prev) => {
                    const chatIndex = prev.findIndex((c) => c.id === chatId);
                    if (chatIndex !== -1) {
                        const chat = prev[chatIndex];
                        allMessages = [...chat.messages, userMessage];
                        
                        const updatedChats = [...prev];
                        updatedChats[chatIndex] = {
                            ...chat,
                            messages: allMessages as Message[],
                            updatedAt: Date.now(),
                        };
                        return updatedChats;
                    }
                    return prev;
                });
            }

            setIsGenerating(true);
            setStreamingContent("");

            const abortController = new AbortController();
            abortRef.current = abortController;

            try {
                const apiMessages = allMessages.map((m) => ({
                    role: m.role === "model" ? "model" : "user",
                    content: m.content,
                    ...(m.images ? { images: m.images } : {}),
                }));

                const response = await fetch("/api/plan", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: apiMessages }),
                    signal: abortController.signal,
                });

                if (!response.ok) {
                    let errMsg = `API Error: ${response.status}`;
                    try {
                        const errData = await response.json();
                        errMsg = errData.error || errMsg;
                    } catch {}
                    throw new Error(errMsg);
                }

                const reader = response.body?.getReader();
                if (!reader) throw new Error("No response body");

                const decoder = new TextDecoder();
                let buffer = "";
                let fullText = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (trimmed.startsWith("data: ")) {
                            const jsonStr = trimmed.slice(6);
                            if (jsonStr === "[DONE]") continue;
                            try {
                                const data = JSON.parse(jsonStr);
                                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                                if (text) {
                                    fullText += text;
                                    setStreamingContent(fullText);
                                }
                            } catch {}
                        }
                    }
                }

                const aiMessage: Message = {
                    id: generateId(),
                    role: "model",
                    content: fullText,
                    createdAt: Date.now(),
                };

                setChats((prev) =>
                    prev.map((c) => {
                        if (c.id !== chatId) return c;
                        return {
                            ...c,
                            messages: [...c.messages, aiMessage],
                            updatedAt: Date.now(),
                        };
                    })
                );
            } catch (err: any) {
                if (err.name === "AbortError") {
                    if (streamingContent) {
                        const partialMessage: Message = {
                            id: generateId(),
                            role: "model",
                            content: streamingContent,
                            createdAt: Date.now(),
                        };
                        setChats((prev) =>
                            prev.map((c) => {
                                if (c.id !== chatId) return c;
                                return {
                                    ...c,
                                    messages: [...c.messages, partialMessage],
                                    updatedAt: Date.now(),
                                };
                            })
                        );
                    }
                } else {
                    const errorMessage: Message = {
                        id: generateId(),
                        role: "model",
                        content: `**Error:** ${err.message}\n\nPlease try again.`,
                        createdAt: Date.now(),
                    };
                    setChats((prev) =>
                        prev.map((c) => {
                            if (c.id !== chatId) return c;
                            return {
                                ...c,
                                messages: [...c.messages, errorMessage],
                                updatedAt: Date.now(),
                            };
                        })
                    );
                }
            } finally {
                setIsGenerating(false);
                setStreamingContent("");
                abortRef.current = null;
            }
        },
        [currentChatId, isGenerating, createNewChat, streamingContent]
    );

    const stopGeneration = useCallback(() => {
        if (abortRef.current) {
            abortRef.current.abort();
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return {
        chats,
        currentChatId,
        currentChat,
        messages,
        isGenerating,
        streamingContent,
        createNewChat,
        loadChat,
        deleteChat,
        clearAllChats,
        sendMessage,
        stopGeneration,
    };
}