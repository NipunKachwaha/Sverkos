// hooks/useAIGeneration.ts
import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Project, ProjectFile } from '@/db/schema';

export function useAIGeneration() {
  const { userId } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<ProjectFile[]>([]);

  const generateProject = useCallback(async (
    projectId: string,
    prompt: string,
    model: string = 'anthropic',
    stream: boolean = true
  ) => {
    if (!userId) {
      setError('User not authenticated');
      return null;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedFiles([]);
    setProgress(0);

    try {
      if (stream) {
        // Use streaming API
        const response = await fetch('/api/generate/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectId, prompt, model }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate project');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No response body');
        }

        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          // Process complete messages
          const messages = buffer.split('\n\n');
          buffer = messages.pop() || '';
          
          for (const message of messages) {
            if (message.startsWith('data: ')) {
              try {
                const data = JSON.parse(message.slice(6));
                
                if (data.type === 'file') {
                  setGeneratedFiles(prev => [...prev, data.file]);
                  setProgress(prev => prev + 1);
                } else if (data.type === 'complete') {
                  setIsGenerating(false);
                  return data;
                } else if (data.type === 'error') {
                  throw new Error(data.message);
                }
              } catch (e) {
                console.error('Error parsing message:', e);
              }
            }
          }
        }
      } else {
        // Use non-streaming API
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectId, prompt, model }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate project');
        }

        const data = await response.json();
        setGeneratedFiles(data.files);
        setIsGenerating(false);
        return data;
      }
    } catch (err) {
      console.error('Error in generation:', err);
      setError(err.message);
      setIsGenerating(false);
      return null;
    }
  }, [userId]);

  return {
    generateProject,
    isGenerating,
    progress,
    error,
    generatedFiles,
  };
}