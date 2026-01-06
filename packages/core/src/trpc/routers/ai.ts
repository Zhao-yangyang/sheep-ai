import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../init';
import { defaultModel } from '../../ai/providers';
import { generateText } from 'ai';

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text ?? 'world'}`,
      };
    }),
    
  chat: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      console.log("AI Router: Sending prompt to DeepSeek:", input.prompt);
      
      try {
        const result = await generateText({
          model: defaultModel,
          prompt: input.prompt,
        });

        console.log("AI Router: Received result from SDK:", JSON.stringify(result, null, 2));
        
        return {
          response: result.text
        };
      } catch (error) {
        console.error("AI Router Error:", error);
        throw error;
      }
    }),
});
