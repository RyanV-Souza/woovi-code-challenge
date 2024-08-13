import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { AccountType } from "./account-type";
import { getById } from "@/services/account";

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    accountId: { type: GraphQLID },
    account: {
      type: AccountType,
      resolve: async (field) => {
        const account = await getById(field.accountId);

        return account;
      },
    },
    amount: { type: GraphQLInt },
    balance: { type: GraphQLInt },
    idempotencyId: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (field) => new Date(field.createdAt).toISOString(),
    },
  }),
});
