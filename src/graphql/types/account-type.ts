import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { showBalance } from "@/services/account";

export const AccountType = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLInt,
      resolve: async (field) => {
        const balance = await showBalance(field.id);

        return balance;
      },
    },
    createdAt: {
      type: GraphQLString,
      resolve: (field) => new Date(field.createdAt).toISOString(),
    },
  }),
});
