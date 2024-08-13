import { Schema, model, Document } from "mongoose";

export interface IAccount extends Document {
  name: string;
  createdAt: Date;
}

const accountSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Account = model<IAccount>("Account", accountSchema);
