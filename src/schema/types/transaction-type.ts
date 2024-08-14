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
    amount: { type: GraphQLInt }, // Todos os dados são salvos em centavos
    balance: { type: GraphQLInt }, // Todos os dados são salvos em centavos
    idempotencyId: { type: GraphQLString },
    relationAccountId: { type: GraphQLString }, // Só terá um ID quando for uma transferencia/deposito feito de uma conta para outra
    createdAt: {
      type: GraphQLString,
      resolve: (obj) => new Date(obj.createdAt).toISOString(),
    },
  }),
});
