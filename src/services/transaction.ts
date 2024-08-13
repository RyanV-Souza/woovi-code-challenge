import { Transaction } from "../model/transaction";

export async function createTransaction(
  accountId: string,
  amount: number,
  type: "deposit" | "transfer",
  idempotencyId: string
) {
  const latestTransaction = await Transaction.findOne({
    accountId: accountId,
  }).sort({
    createdAt: -1,
  });

  const balance = latestTransaction ? latestTransaction.balance : 0;

  if (type === "transfer" && balance < amount) {
    throw new Error("Insufficient funds");
  }

  const newBalance = type === "deposit" ? balance + amount : balance - amount;

  const transaction = new Transaction({
    accountId: accountId,
    amount,
    balance: newBalance,
    type,
    idempotencyId,
  });

  await transaction.save();

  return transaction;
}
