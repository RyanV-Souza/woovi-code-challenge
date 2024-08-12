import { Schema, model, Document } from "mongoose";
import { IAccount } from "./account";

export interface ITransaction extends Document {
  fromAccount: IAccount;
  toAccount: IAccount;
  amount: number;
  createdAt: Date;
}

const transactionSchema = new Schema({
  fromAccount: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  toAccount: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
