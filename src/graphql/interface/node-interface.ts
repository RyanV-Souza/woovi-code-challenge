import { GraphQLID, GraphQLInterfaceType, GraphQLNonNull } from "graphql";
import { AccountType } from "../types/account-type";
import { TransactionType } from "../types/transaction-type";

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
