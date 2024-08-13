import { GraphQLObjectType } from "graphql";
import { getAccountByIdQuery } from "./get-account-by-id";
import { getAllAccountsQuery } from "./get-all-accounts";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    account: getAccountByIdQuery,
    accounts: getAllAccountsQuery,
  },
});
