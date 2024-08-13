const { GraphQLSchema } = require("graphql");
import { RootQuery } from "./queries";
import { Mutation } from "./mutations";

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
