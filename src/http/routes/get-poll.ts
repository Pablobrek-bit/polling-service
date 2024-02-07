import z from "zod";
import { prisma } from "../../lib/prisma-client";
import { FastifyInstance } from "fastify";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollID", async (request, reply) => {
    const getPollParams = z.object({
      pollID: z.string().uuid(),
    });

    const { pollID } = getPollParams.parse(request.params);

    // Buscando o poll pelo ID
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollID,
      },
      // Incluindo as opções do poll
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return reply.status(201).send(poll);
  });
}
