import {
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import AccountType from "./account-type";

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    fromAccount: { type: AccountType },
    toAccount: { type: AccountType },
    amount: { type: GraphQLFloat },
    createdAt: { type: GraphQLString },
  }),
});

export default TransactionType;
