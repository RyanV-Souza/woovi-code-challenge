import { GraphQLFloat, GraphQLString } from "graphql";
import AccountType from "../types/account-type";
import Account from "@/Models/account";

const createAccountMutation = {
  type: AccountType,
  args: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
  resolve(parent, args) {
    const account = new Account({
      name: args.name,
      balance: args.balance,
    });

    return account.save();
  },
};

export default createAccountMutation;
