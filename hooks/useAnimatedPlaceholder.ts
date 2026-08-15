import { useState, useEffect, useRef } from "react";

type AnimationPhase = "typing" | "pausing" | "deleting";

export function useAnimatedPlaceholder(
    phrases: string[],
    typingSpeed: number = 50,
    deletingSpeed: number = 30,
    delayDuration: number = 2000
): string {
    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [phase, setPhase] = useState<AnimationPhase>("typing");
    const phrasesRef = useRef(phrases);
    useEffect(() => {
        phrasesRef.current = phrases;
    }, [phrases]);

    useEffect(() => {
        const currentPhrases = phrasesRef.current;
        if (!currentPhrases?.length) return;

        const currentPhrase = currentPhrases[phraseIndex];
        let timeoutId: NodeJS.Timeout;

        switch (phase) {
            case "typing": {
                if (text === currentPhrase) {
                    setPhase("pausing");
                } else {
                    timeoutId = setTimeout(() => {
                        setText(currentPhrase.slice(0, text.length + 1));
                    }, typingSpeed);
                }
                break;
            }
            case "pausing": {
                timeoutId = setTimeout(() => {
                    setPhase("deleting");
                }, delayDuration);
                break;
            }
            case "deleting": {
                if (text === "") {
                    setPhase("typing");
                    setPhraseIndex((prev) => (prev + 1) % currentPhrases.length);
                } else {
                    timeoutId = setTimeout(() => {
                        setText(currentPhrase.slice(0, text.length - 1));
                    }, deletingSpeed);
                }
                break;
            }
        }

        return () => clearTimeout(timeoutId);
    }, [text, phase, phraseIndex, typingSpeed, deletingSpeed, delayDuration]);

    return text;
}