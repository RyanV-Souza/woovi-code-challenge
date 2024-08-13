import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

export async function connect() {
  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  await mongoose.connect(uri, { dbName: "test" });
}

export async function closeDatabase() {
  await mongod.stop();
  await mongoose.connection.close();
  await mongoose.disconnect();
}

export async function clearDatabase() {
  await mongoose.connection.dropDatabase();
}
