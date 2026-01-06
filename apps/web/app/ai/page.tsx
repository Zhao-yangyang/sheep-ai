'use client';

import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { Button } from '@sheepgpt/ui/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function AIPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  
  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
        console.log("Frontend received:", data);
        setResponse(data.response);
    },
    onError: (err) => {
        console.error("Frontend error:", err);
    }
  });

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">AI Chat Test (DeepSeek)</h1>
      
      <div className="space-y-2">
        <textarea
            className="w-full p-2 border rounded"
            placeholder="Ask something..."
            value={prompt}
            onChange={(e) => setPrompt((e.target as HTMLTextAreaElement).value)}
        />
        <Button 
            onClick={() => chatMutation.mutate({ prompt })}
            disabled={chatMutation.isPending || !prompt}
        >
            {chatMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : null}
            Send
        </Button>
      </div>

      {response && (
        <div className="p-4 bg-gray-100 rounded mt-4">
            <h3 className="font-semibold">Response:</h3>
            <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
      
       {chatMutation.error && (
        <div className="p-4 bg-red-100 text-red-600 rounded mt-4">
            Error: {chatMutation.error.message}
        </div>
      )}
    </div>
  );
}
