import { Account } from "@/models/account";
import { Transaction } from "@/models/transaction";
import { Types } from "mongoose";

export async function createAccount(name: string) {
  const account = new Account({ name });

  await account.save();

  return account;
}

export async function getById(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid id");
  }

  const account = await Account.findById(id);

  if (!account) {
    throw new Error("Account not found");
  }

  return account;
}

export async function showBalance(id: string) {
  const account = await getById(id);

  const latestTransaction = await Transaction.findOne({
    accountId: account.id,
  }).sort({
    createdAt: -1,
  });

  if (!latestTransaction) {
    return 0;
  }

  const balance = latestTransaction.balance;

  //Os dados são salvos em centavos, caso necessário, dividir por 100 para obter o valor real
  return balance;
}
