import { createTRPCRouter, publicProcedure } from './init';
import { aiRouter } from './routers/ai';

export const appRouter = createTRPCRouter({
  ai: aiRouter,
  me: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});

export type AppRouter = typeof appRouter;
