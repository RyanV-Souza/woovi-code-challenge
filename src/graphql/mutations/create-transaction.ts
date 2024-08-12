import { GraphQLFloat, GraphQLID } from "graphql";
import Account from "@/Models/account";
import TransactionType from "../types/transaction-type";
import Transaction from "@/Models/transaction";

const createTransactionMutation = {
  type: TransactionType,
  args: {
    fromAccountId: { GraphQLID },
    toAccountId: { GraphQLID },
    amount: { GraphQLFloat },
  },
  async resolve(parent, args) {
    const fromAccount = await Account.findById(args.fromAccountId);
    const toAccount = await Account.findById(args.toAccountId);

    if (!fromAccount || !toAccount) {
      throw new Error("Account not found");
    }

    if (fromAccount.balance < args.amount) {
      throw new Error("Insufficient balance");
    }

    fromAccount.balance -= args.amount;
    toAccount.balance += args.amount;

    await Promise.all([fromAccount.save(), toAccount.save()]);

    const transaction = new Transaction({
      fromAccount,
      toAccount,
      amount: args.amount,
    });

    return transaction.save();
  },
};

export default createTransactionMutation;
