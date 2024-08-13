import { GraphQLID, GraphQLNonNull } from "graphql";
import { AccountType } from "../types/account-type";
import { getById, showBalance } from "@/services/account";

export const showBalanceQuery = {
  type: AccountType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { id }) {
    const balance = await showBalance(id);

    return balance;
  },
};
