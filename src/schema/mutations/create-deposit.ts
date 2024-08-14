import { GraphQLNonNull, GraphQLInt, GraphQLID } from "graphql";
import { TransactionType } from "../types/transaction-type";
import { createTransaction } from "@/services/transaction";
import { randomUUID } from "crypto";
import { getById } from "@/services/account";

export const createDepositMutation = {
  type: TransactionType,
  args: {
    accountId: { type: new GraphQLNonNull(GraphQLID) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, { accountId, amount }) => {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    const account = await getById(accountId);

    const idempotencyId = randomUUID();

    const transaction = await createTransaction(
      account.id,
      amount,
      "deposit",
      idempotencyId,
      null
    );

    return transaction;
  },
};
