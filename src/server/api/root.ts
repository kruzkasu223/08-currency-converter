import { createTRPCRouter } from "./trpc";
import { currenciesRouter } from "./routers/currencies";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  currencies: currenciesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
