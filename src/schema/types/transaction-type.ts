import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { AccountType } from "./account-type";
import { getById } from "@/services/account";
import { NodeInterface } from "../interface/node-interface";

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  interfaces: [NodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: { type: GraphQLString },
    accountId: { type: GraphQLID },
    account: {
      type: AccountType,
      resolve: async (obj) => {
        const account = await getById(obj.accountId);
        return account;
      },
    },
    amount: { type: GraphQLInt },
    balance: { type: GraphQLInt },
    idempotencyId: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (obj) => new Date(obj.createdAt).toISOString(),
    },
  }),
});
