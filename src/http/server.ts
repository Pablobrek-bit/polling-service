import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyWebsocket from "@fastify/websocket";
import { getPoll } from "./routes/get-poll";
import { createPoll } from "./routes/create-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { object } from "zod";
import { pollResult } from "./ws/poll-results";

const app = fastify();

app.register(fastifyCookie, {
  secret: "teste123",
  hook: "onRequest",
});

app.register(fastifyWebsocket);

// O app vai utilizar a função createPoll para poder colocar as rotas
app.register(getPoll);
app.register(createPoll);
app.register(voteOnPoll);

app.register(pollResult);

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
