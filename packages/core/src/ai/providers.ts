import { createOpenAI } from '@ai-sdk/openai';
import { type LanguageModel } from 'ai';

// Custom DeepSeek Provider using OpenAI compatible layer specifically configured
// Error logs showed SDK hitting /v1/responses which suggests it was inferring a newer or different API structure
// We will explicitly configure the provider to map correctly.

const baseUrl = process.env.OPENAI_BASE_URL ?? 'https://api.deepseek.com/v1';

// Custom configuration for DeepSeek
// We ensure /v1 suffix is present
const finalBaseUrl = baseUrl.endsWith('/v1') ? baseUrl : `${baseUrl}/v1`;

console.log("Initializing DeepSeek Provider with BaseURL:", finalBaseUrl);

export const deepseek = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: finalBaseUrl,
  name: 'deepseek',
});

// Explicitly type the model
export const defaultModel: LanguageModel = deepseek.chat('deepseek-chat');

