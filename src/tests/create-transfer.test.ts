import { schema } from "../graphql/schema";
import { graphql, GraphQLError } from "graphql";
import { clearDatabase, closeDatabase, connect } from "./database-handler";
import { createAccount } from "@/services/account";
import { createTransaction } from "@/services/transaction";

beforeAll(async () => await connect());

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe("createTransferMutation", () => {
  let fromAccountId: string;
  let toAccountId: string;

  beforeAll(async () => {
    const fromAccount = await createAccount("From Account");
    const toAccount = await createAccount("To Account");

    fromAccountId = fromAccount.id;
    toAccountId = toAccount.id;

    await createTransaction(
      fromAccountId,
      500,
      "deposit",
      "initial-deposit-id"
    );
  });

  it("should create a transfer transaction between two accounts", async () => {
    const args = { fromAccountId, toAccountId, amount: 100 };

    const expectedTransfer = {
      accountId: fromAccountId,
      amount: 100,
      type: "transfer",
      balance: 400,
    };

    const expectedDeposit = {
      accountId: toAccountId,
      amount: 100,
      type: "deposit",
      balance: 100,
    };

    const query = `
      mutation CreateTransfer($fromAccountId: ID!, $toAccountId: ID!, $amount: Int!) {
        CreateTransfer(fromAccountId: $fromAccountId, toAccountId: $toAccountId, amount: $amount) {
          transfer {
            accountId
            amount
            type
            balance
          }
          deposit {
            accountId
            amount
            type
            balance
          }
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: args,
    });

    expect(result).toEqual({
      data: {
        CreateTransfer: {
          transfer: expectedTransfer,
          deposit: expectedDeposit,
        },
      },
    });
  });

  it("should throw an error if trying to transfer money to the same account", async () => {
    const args = { fromAccountId, toAccountId: fromAccountId, amount: 100 };

    const query = `
      mutation CreateTransfer($fromAccountId: ID!, $toAccountId: ID!, $amount: Int!) {
        CreateTransfer(fromAccountId: $fromAccountId, toAccountId: $toAccountId, amount: $amount) {
          transfer {
            accountId
            amount
            type
            balance
          }
          deposit {
            accountId
            amount
            type
            balance
          }
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
    expect(result.errors[0].message).toMatch(
      /Cannot transfer money to the same account/i
    );
  });

  it("should throw an error if transfer amount is invalid", async () => {
    const args = { fromAccountId, toAccountId, amount: -100 };

    const query = `
      mutation CreateTransfer($fromAccountId: ID!, $toAccountId: ID!, $amount: Int!) {
        CreateTransfer(fromAccountId: $fromAccountId, toAccountId: $toAccountId, amount: $amount) {
          transfer {
            accountId
            amount
            type
            balance
          }
          deposit {
            accountId
            amount
            type
            balance
          }
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
