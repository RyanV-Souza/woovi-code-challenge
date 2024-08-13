import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connect() {
  const mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  await mongoose.connect(uri, { dbName: "test" });
}

export async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect();
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];

    await collection.deleteMany({});
  }
}
