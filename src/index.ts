import Koa from "koa";
import Router from "@koa/router";
import { createHandler } from "graphql-http/lib/use/koa";
import { schema } from "./graphql/schema";
import koaPlayGround from "graphql-playground-middleware-koa";
import mongoose from "mongoose";

const app = new Koa();
const router = new Router();

mongoose.connect("mongodb://localhost:27017/bank");

router.get("/", (ctx) => {
  const routes = ["/graphql - GraphiQL", "/playground - GraphQL Playground"];

  ctx.status = 200;

  ctx.body = routes.join("\n");
});

router.all("/graphql", createHandler({ schema }));
router.all("/playground", koaPlayGround({ endpoint: "/graphql" }));

app.use(router.routes()).use(router.allowedMethods());

app.listen(4001, () => console.log("Server running on port 4001"));
