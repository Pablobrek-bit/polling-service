import fastify from "fastify";
import { getPoll } from "./routes/get-poll";
import fastifyCookie from "@fastify/cookie";
import { createPoll } from "./routes/create-poll";
import { voteOnPoll } from "./routes/vote-on-poll";

const app = fastify();

// O app vai utilizar a função createPoll para poder colocar as rotas
app.register(getPoll);
app.register(createPoll);
app.register(voteOnPoll);
app.register(fastifyCookie, {
  secret: "my-secret",
  hook: "onRequest",
});

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
