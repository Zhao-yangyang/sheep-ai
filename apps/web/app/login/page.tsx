'use client';

import { Suspense, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@sheepgpt/ui/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // For demo efficiency, we use anonymous sign-in or a fake flow if keys aren't real yet.
    // In production, you'd add Email/Password or OAuth here.
    try {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) {
            alert('Login Failed: ' + error.message);
        } else {
            router.push('/');
        }
    } catch (e) {
        console.error(e);
        alert('Login Error');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome to SheepGPT
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
             <Button 
                onClick={handleLogin} 
                className="w-full flex justify-center py-2 px-4"
                disabled={loading}
            >
             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
             Try Anonymous Login (Needs Supabase Setting)
           </Button>
           <p className="text-xs text-red-500 mt-2">
             Note: If "Enable Anonymous Sign-ins" is OFF in Supabase, this will fail. 
             If you just want to verify the app works, the Fact that you see this page means Client is OK.
           </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
