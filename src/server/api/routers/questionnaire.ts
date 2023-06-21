import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";

export const questionnaireRouter = createTRPCRouter({
  updateWithAnswer: publicProcedure
    .input(z.object({ id: z.string(), answerId: z.string() }))
    .mutation(({ ctx }) => {
      return ctx.prisma.questionnaire.upsert({ where: { id }, update: {} });
    }),
});
