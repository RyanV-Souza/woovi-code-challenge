import { GraphQLList } from "graphql";
import { AccountType } from "../types/account-type";
import { getAll } from "@/services/account";

export const getAllAccountsQuery = {
  type: new GraphQLList(AccountType),
  args: {},
  async resolve(parent, args) {
    const accounts = await getAll();

    return accounts;
  },
};
