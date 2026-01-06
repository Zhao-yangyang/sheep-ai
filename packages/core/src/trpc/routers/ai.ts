import { createTRPCRouter, publicProcedure } from '../init';
import { z } from 'zod';

export const aiRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string().optional() }))
    .query(({ input }): { greeting: string } => {
      return {
        greeting: `Hello ${input.text ?? 'world'} from AI Router`,
      };
    }),
});
