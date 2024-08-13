import { Schema, model, Document } from "mongoose";
import { IAccount } from "./account";

export interface ITransaction extends Document {
  type: "deposit" | "transfer";
  account: IAccount;
  amount: number;
  balance: number;
  createdAt: Date;
  idempotencyId: string;
}

const transactionSchema = new Schema({
  type: { type: String, enum: ["deposit", "transfer"], required: true },
  accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  idempotencyId: { type: String, unique: true, required: true },
});

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
