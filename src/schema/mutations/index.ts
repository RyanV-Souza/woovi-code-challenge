import { GraphQLObjectType } from "graphql";
import { createAccountMutation } from "./create-account";
import { createTransferMutation } from "./create-transfer";
import { createDepositMutation } from "./create-deposit";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateAccount: createAccountMutation,
    CreateTransfer: createTransferMutation,
    CreateDeposit: createDepositMutation,
  },
});
