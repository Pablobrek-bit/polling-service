import { FastifyInstance } from "fastify";
import z from "zod";
import { voting } from "../../utils/voting-pub-sub";

export async function pollResult(app: FastifyInstance) {
  app.get(
    "/polls/:pollID/results",
    { websocket: true },
    (connection, request) => {
      connection.socket.on("message", (message: String) => {
        const getPollParams = z.object({
          pollID: z.string().uuid(),
        });

        const { pollID } = getPollParams.parse(request.params);

        voting.subscribe(pollID, (message) => {
          connection.socket.send(JSON.stringify(message));
        });
      });
    }
  );
}
