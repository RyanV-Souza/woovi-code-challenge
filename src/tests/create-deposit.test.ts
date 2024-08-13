import { schema } from "../graphql/schema";
import { graphql, GraphQLError } from "graphql";
import { clearDatabase, closeDatabase, connect } from "./database-handler";
import { createAccount } from "@/services/account";

beforeAll(async () => await connect());

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe("createDepositMutation", () => {
  let accountId: string;

  beforeAll(async () => {
    const account = await createAccount("Test Account");
    accountId = account.id;
  });

  it("should create a deposit transaction", async () => {
    //Valor em centavos
    const args = { accountId, amount: 10000 };

    const expectedTransaction = {
      accountId,
      amount: 10000,
      type: "deposit",
      balance: 10000, // O saldo após o depósito deve ser atualizado
    };

    const query = `
      mutation CreateDeposit($accountId: ID!, $amount: Int!) {
        CreateDeposit(accountId: $accountId, amount: $amount) {
          accountId
          amount
          type
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: args,
    });

    expect(result).toEqual({ data: { CreateDeposit: expectedTransaction } });
  });

  it("should throw an error if id is not an objectId", async () => {
    const args = { accountId: "invalid-id", amount: 100 };

    const query = `
      mutation CreateDeposit($accountId: ID!, $amount: Int!) {
        CreateDeposit(accountId: $accountId, amount: $amount) {
          accountId
          amount
          type
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: args,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(GraphQLError);
    expect(result.errors[0].message).toMatch(/Invalid id/i);
  });

  it("should throw an error if account is not found", async () => {
    const args = { accountId: "551137c2f9e1fac808a5f572", amount: 100 };

    const query = `
      mutation CreateDeposit($accountId: ID!, $amount: Int!) {
        CreateDeposit(accountId: $accountId, amount: $amount) {
          accountId
          amount
          type
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: args,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(GraphQLError);
    expect(result.errors[0].message).toMatch(/Account not found/i);
  });

  it("should throw an error if amount is negative", async () => {
    const args = { accountId, amount: -100 };

    const query = `
      mutation CreateDeposit($accountId: ID!, $amount: Int!) {
        CreateDeposit(accountId: $accountId, amount: $amount) {
          accountId
          amount
          type
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: args,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(GraphQLError);
    expect(result.errors[0].message).toMatch(/Invalid amount/i);
  });
});
