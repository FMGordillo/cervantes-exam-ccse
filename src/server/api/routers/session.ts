import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";

export const sessionRouter = createTRPCRouter({
  create: publicProcedure.mutation(({ ctx }) => {
    return ctx.prisma.session.create({
      data: {},
    });
  }),

  updateWithAnswer: publicProcedure
    .input(z.object({ id: z.string(), answerId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.session.update({
        where: { id: input.id },
        data: {
          answers: {
            set: {
              id: input.answerId,
            },
          },
        },
      });
    }),
});
