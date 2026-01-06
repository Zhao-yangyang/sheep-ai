'use client';

import { Button } from '@sheepgpt/ui/components/ui/button';
import { trpc } from '../lib/trpc';

export default function Home() {
  const hello = trpc.ai.hello.useQuery({ text: 'SheepGPT' });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-4xl font-bold">SheepGPT Core</h1>
      <div className="text-xl">
        {hello.data ? hello.data.greeting : 'Loading AI...'}
      </div>
      <Button onClick={() => alert('Clicked!')}>Click Me</Button>
    </main>
  );
}
