import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import { graphqlHTTP } from "koa-graphql";

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => {
  console.log("oi");
});

router.all("/graphql", graphqlHTTP({ schema: null, graphiql: true }));

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => console.log("Server running on port 4000"));
