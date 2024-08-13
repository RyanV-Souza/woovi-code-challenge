import { GraphQLNonNull, GraphQLString } from "graphql";
import { AccountType } from "../types/account-type";
import { createAccount } from "@/services/account";

export const createAccountMutation = {
  type: AccountType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { name }) {
    const account = await createAccount(name);

    return account;
  },
};
