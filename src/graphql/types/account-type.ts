import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { showBalance } from "@/services/account";
import { NodeInterface } from "../interface/node-interface";

export const AccountType = new GraphQLObjectType({
  name: "Account",
  interfaces: [NodeInterface],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLInt,
      resolve: async (obj) => {
        const balance = await showBalance(obj.id);
        return balance;
      },
    },
    createdAt: {
      type: GraphQLString,
      resolve: (obj) => new Date(obj.createdAt).toISOString(),
    },
  }),
});
