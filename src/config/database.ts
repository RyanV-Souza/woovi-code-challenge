import mongoose from "mongoose";

export function connect() {
  const { MONGO_USER, MONGO_PASSWORD } = process.env;

  if (!MONGO_USER || !MONGO_PASSWORD) {
    mongoose.connect("mongodb://localhost:27017/bank");

    return;
  }

  const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@woovi-test.ef8rb.mongodb.net/?retryWrites=true&w=majority&appName=Woovi-Test`;

  mongoose.connect(uri, { dbName: "bank" });
}
