import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { AccountType } from "../types/account-type";

const AccountEdgeType = new GraphQLObjectType({
  name: "AccountEdge",
  fields: () => ({
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: { type: new GraphQLNonNull(AccountType) },
  }),
});

export const AccountConnection = new GraphQLObjectType({
  name: "AccountConnection",
  fields: () => ({
    edges: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(AccountEdgeType))
      ),
    },
    pageInfo: {
      type: new GraphQLObjectType({
        name: "PageInfo",
        fields: {
          endCursor: { type: GraphQLString },
          hasNextPage: { type: GraphQLNonNull(GraphQLString) },
        },
      }),
    },
  }),
});
