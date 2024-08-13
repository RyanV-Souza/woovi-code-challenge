import { schema } from "../graphql/schema";
import { graphql, GraphQLError } from "graphql";
import { clearDatabase, closeDatabase, connect } from "./database-handler";
import { createAccount } from "@/services/account";

beforeAll(async () => await connect());

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe("getAccountByIdQuery", () => {
  let accountId: string;

  beforeAll(async () => {
    const account = await createAccount("Test Account");
    accountId = account.id;
  });

  it("should return the correct account by ID", async () => {
    const query = `
      query account($id: ID!) {
        account(id: $id) {
          id
          name
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: { id: accountId },
    });

    expect(result).toEqual({
      data: {
        account: {
          id: accountId,
          name: "Test Account",
          balance: 0,
        },
      },
    });
  });

  it("should return an error if id is invalid", async () => {
    const query = `
      query account($id: ID!) {
        account(id: $id) {
          id
          name
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: { id: "invalid_id" },
    });

    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(GraphQLError);
    expect(result.errors[0].message).toMatch(/Invalid id/i);
  });

  it("should return an error if account is not found", async () => {
    const query = `
      query account($id: ID!) {
        account(id: $id) {
          id
          name
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: { id: "551137c2f9e1fac808a5f572" },
    });

    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(GraphQLError);
    expect(result.errors[0].message).toMatch(/Account not found/i);
  });

  it("should return an error if ID is not provided", async () => {
    const query = `
      query account($id: ID!) {
        account(id: $id) {
          id
          name
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: { id: null },
    });

    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(GraphQLError);
  });
});
