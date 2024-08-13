import { schema } from "../graphql/schema";
import { graphql, GraphQLError } from "graphql";
import { clearDatabase, closeDatabase, connect } from "./database-handler";

beforeAll(async () => await connect());

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe("createAccountMutation", () => {
  it("should create a new account", async () => {
    const args = { name: "Test Account" };

    const mockAccount = { name: "Test Account", balance: 0 };

    const query = `
      mutation CreateAccount($name: String!) {
        CreateAccount(name: $name) {
          name
          balance
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: args,
    });

    expect(result).toEqual({ data: { CreateAccount: mockAccount } });
  });

  it("should throw an error if account creation fails", async () => {
    const args = { name: null };

    const query = `
      mutation CreateAccount($name: String!) {
        CreateAccount(name: $name) {
          name
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
  });
});
