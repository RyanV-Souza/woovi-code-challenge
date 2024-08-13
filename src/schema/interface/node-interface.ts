import { GraphQLID, GraphQLInterfaceType, GraphQLNonNull } from "graphql";

export const NodeInterface = new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolveType: (obj) => {
    if (obj.name) {
      return "Account";
    }
    if (obj.type) {
      return "Transaction";
    }
    return null;
  },
});
