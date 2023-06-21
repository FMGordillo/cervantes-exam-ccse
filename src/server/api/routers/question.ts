import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany({
      include: {
        answers: {
          select: {
            id: true,
            text: true,
            isCorrectAnswer: false,
          },
        },
      },
    });
  }),
});
