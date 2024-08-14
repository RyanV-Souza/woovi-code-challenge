import { GraphQLID } from "graphql";
import { AccountType } from "../types/account-type";
import { getById } from "../../services/account";

export const getAccountByIdQuery = {
  type: AccountType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, { id }) {
    const account = await getById(id);

    return account;
  },
};
