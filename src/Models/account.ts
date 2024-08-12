import { Schema, model, Document } from "mongoose";

export interface IAccount extends Document {
  name: string;
  balance: number;
  createdAt: Date;
}

const accountSchema = new Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Account = model<IAccount>("Account", accountSchema);

export default Account;
