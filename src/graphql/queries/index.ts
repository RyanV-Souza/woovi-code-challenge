import { GraphQLObjectType } from "graphql";
import { getAccountByIdQuery } from "./get-account-by-id";
import { getAllAccountsQuery } from "./get-all-accounts";
import { showBalanceQuery } from "./show-balance";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    account: getAccountByIdQuery,
    accounts: getAllAccountsQuery,
    balance: showBalanceQuery,
  },
});
