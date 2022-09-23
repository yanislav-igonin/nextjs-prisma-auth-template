import { createRouter } from './context';
import { z } from 'zod';

export const exampleRouter = createRouter()
  .query('hello', {
    input: z.object({ text: z.string() }),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
        time: new Date(),
      };
    },
  });
