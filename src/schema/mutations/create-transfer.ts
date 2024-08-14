import { GraphQLID, GraphQLInt, GraphQLNonNull } from "graphql";
import { createTransaction } from "@/services/transaction";
import { randomUUID } from "crypto";
import { getById } from "@/services/account";
import { TransferResultType } from "../types/transfer-result-type";

export const createTransferMutation = {
  type: TransferResultType,
  args: {
    fromAccountId: { type: new GraphQLNonNull(GraphQLID) },
    toAccountId: { type: new GraphQLNonNull(GraphQLID) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent, { fromAccountId, toAccountId, amount }) {
    if (fromAccountId === toAccountId) {
      throw new Error("Cannot transfer money to the same account");
    }

    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    const fromAccount = await getById(fromAccountId);

    const toAccount = await getById(toAccountId);

    const transfer = await createTransaction(
      fromAccount.id,
      amount,
      "transfer",
      randomUUID(),
      toAccount.id
    );

    const deposit = await createTransaction(
      toAccount.id,
      amount,
      "deposit",
      randomUUID(),
      fromAccount.id
    );

    return { transfer, deposit };
  },
};
