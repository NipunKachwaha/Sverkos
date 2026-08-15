// hooks/useSpeechToText.ts

import { useState, useRef, useCallback, useEffect } from "react";

interface SpeechToTextOptions {
    lang?: string;
    continuous?: boolean;
    interimResults?: boolean;
    maxAlternatives?: number;
    onFinalTranscript?: (text: string) => void;
    onInterimTranscript?: (text: string) => void;
    onError?: (error: string) => void;
    onEnd?: () => void;
}

interface SpeechToTextReturn {
    isListening: boolean;
    isSupported: boolean;
    transcript: string;
    interimTranscript: string;
    startListening: () => void;
    stopListening: () => void;
    toggleListening: () => void;
    resetTranscript: () => void;
    error: string | null;
}

export function useSpeechToText(options: SpeechToTextOptions = {}): SpeechToTextReturn {
    const {
        lang = "hi-IN",
        continuous = true,
        interimResults = true,
        maxAlternatives = 1,
        onFinalTranscript,
        onInterimTranscript,
        onError,
        onEnd,
    } = options;

    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState(false);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const isStoppingManually = useRef(false);

    // Browser support check — only on client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognitionAPI =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            setIsSupported(!!SpeechRecognitionAPI);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                isStoppingManually.current = true;
                recognitionRef.current.abort();
                recognitionRef.current = null;
            }
        };
    }, []);

    const createRecognition = useCallback((): SpeechRecognition | null => {
        if (typeof window === "undefined") return null;

        const SpeechRecognitionAPI =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognitionAPI) {
            const msg = "Speech Recognition is not supported in this browser — please use Chrome";
            setError(msg);
            onError?.(msg);
            return null;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.lang = lang;
        recognition.continuous = continuous;
        recognition.interimResults = interimResults;
        recognition.maxAlternatives = maxAlternatives;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalText = "";
            let interimText = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const text = result[0].transcript;

                if (result.isFinal) {
                    finalText += text;
                } else {
                    interimText += text;
                }
            }

            if (finalText) {
                onFinalTranscript?.(finalText);
            }

            if (interimText) {
                setInterimTranscript(interimText);
                onInterimTranscript?.(interimText);
            } else {
                setInterimTranscript("");
            }
        };

        // When recognition stops (by itself or by error)
        recognition.onend = () => {
            // If not stopped manually and continuous is true, restart
            if (!isStoppingManually.current && continuous && isListening) {
                try {
                    recognition.start();
                    return;
                } catch {
                    // ignore
                }
            }

            isStoppingManually.current = false;
            setIsListening(false);
            setInterimTranscript("");
            onEnd?.();
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            if (event.error === "no-speech" || event.error === "aborted") {
                return;
            }

            const errorMessages: Record<string, string> = {
                "not-allowed": "Microphone permission denied — please allow in browser settings",
                "no-speech": "No speech detected",
                "audio-capture": "Microphone not found — please check if it is connected",
                "network": "Network error — please check your internet connection",
                "service-not-allowed": "Speech service is not available",
            };

            const msg =
                errorMessages[event.error] || `Speech error: ${event.error}`;
            setError(msg);
            onError?.(msg);
            setIsListening(false);
        };

        return recognition;
    }, [
        lang,
        continuous,
        interimResults,
        maxAlternatives,
        onFinalTranscript,
        onInterimTranscript,
        onError,
        onEnd,
        isListening,
    ]);

    const startListening = useCallback(() => {
        setError(null);

        if (recognitionRef.current) {
            recognitionRef.current.abort();
            recognitionRef.current = null;
        }

        const recognition = createRecognition();
        if (!recognition) return;

        recognitionRef.current = recognition;
        isStoppingManually.current = false;

        try {
            recognition.start();
            setIsListening(true);
        } catch (err) {
            if (err instanceof Error && err.message.includes("already started")) {
                setIsListening(true);
                return;
            }
            const msg = "Error occurred while starting speech recognition";
            setError(msg);
            onError?.(msg);
        }
    }, [createRecognition, onError]);

    const stopListening = useCallback(() => {
        isStoppingManually.current = true;

        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch {
                // ignore
            }
            recognitionRef.current = null;
        }

        setIsListening(false);
        setInterimTranscript("");
    }, []);

    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    const resetTranscript = useCallback(() => {
        setTranscript("");
        setInterimTranscript("");
    }, []);

    return {
        isListening,
        isSupported,
        transcript,
        interimTranscript,
        startListening,
        stopListening,
        toggleListening,
        resetTranscript,
        error,
    };
}