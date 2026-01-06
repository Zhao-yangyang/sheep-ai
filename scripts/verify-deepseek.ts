import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import dotenv from 'dotenv';
import path from 'path';

// Load env from root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiKey = process.env.OPENAI_API_KEY;
const baseUrl = process.env.OPENAI_BASE_URL ?? 'https://api.deepseek.com';

console.log("---------------------------------------------------");
console.log("Verifying DeepSeek Connection");
console.log("API Key Exists:", !!apiKey);
console.log("Base URL:", baseUrl);
console.log("---------------------------------------------------");

if (!apiKey) {
    console.error("ERROR: OPENAI_API_KEY is missing in .env");
    process.exit(1);
}

// 1. Direct Fetch Test (No SDK)
async function testDirectFetch() {
    console.log("\n[Test 1] Direct Fetch to /v1/chat/completions...");
    
    // Ensure URL has /v1
    const url = baseUrl.endsWith('/v1') 
        ? `${baseUrl}/chat/completions` 
        : `${baseUrl}/v1/chat/completions`;

    console.log("Target URL:", url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: 'Hello' }],
                stream: false
            })
        });

        if (!response.ok) {
            console.error("Direct Fetch Failed:", response.status, response.statusText);
            console.error(await response.text());
        } else {
            const data = await response.json();
            console.log("Direct Fetch Success!");
            console.log("Response Preview:", JSON.stringify(data).substring(0, 100) + "...");
        }
    } catch (e) {
        console.error("Direct Fetch Error:", e);
    }
}

// 2. SDK Test
async function testSDK() {
    console.log("\n[Test 2] Vercel AI SDK...");
    
    const formattedBaseUrl = baseUrl.endsWith('/v1') ? baseUrl : `${baseUrl}/v1`;
    console.log("SDK Base URL:", formattedBaseUrl);

    const deepseek = createOpenAI({
        apiKey: apiKey,
        baseURL: formattedBaseUrl,
    });

    try {
        const result = await generateText({
            model: deepseek('deepseek-chat'),
            prompt: 'Hello',
        });
        console.log("SDK Success!");
        console.log("Response:", result.text);
    } catch (e) {
        console.error("SDK Error:", e);
    }
}

async function run() {
    await testDirectFetch();
    await testSDK();
}

run();
