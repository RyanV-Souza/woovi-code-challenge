import { GraphQLObjectType } from "graphql";
import { TransactionType } from "./transaction-type";

export const TransferResultType = new GraphQLObjectType({
  name: "TransferResult",
  fields: () => ({
    transfer: { type: TransactionType },
    deposit: { type: TransactionType },
  }),
});
