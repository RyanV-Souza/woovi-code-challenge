import { schema } from "../graphql/schema";
import { graphql } from "graphql";
import { clearDatabase, closeDatabase, connect } from "./database-handler";
import { createAccount } from "@/services/account";

beforeAll(async () => await connect());

afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

describe("accounts with pagination", () => {
  beforeEach(async () => {
    await clearDatabase();
    await createAccount("Account 1");
    await createAccount("Account 2");
    await createAccount("Account 3");
    await createAccount("Account 4");
  });

  it("should return the first 2 accounts", async () => {
    const query = `
      query Accounts($first: Int!) {
        accounts(first: $first) {
          edges {
            cursor
            node {
              id
              name
              balance
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    const variables = { first: 2 };

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
    });

    expect(result).toEqual({
      data: {
        accounts: {
          edges: [
            {
              cursor: expect.any(String),
              node: { id: expect.any(String), name: "Account 1", balance: 0 },
            },
            {
              cursor: expect.any(String),
              node: { id: expect.any(String), name: "Account 2", balance: 0 },
            },
          ],
          pageInfo: {
            endCursor: expect.any(String),
            hasNextPage: "true",
          },
        },
      },
    });
  });

  it("should return the next 2 accounts after the given cursor", async () => {
    const firstQuery = `
      query Accounts($first: Int!) {
        accounts(first: $first) {
          edges {
            cursor
            node {
              id
              name
              balance
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    const firstVariables = { first: 2 };

    const firstResult = await graphql({
      schema,
      source: firstQuery,
      variableValues: firstVariables,
    });

    const endCursor = firstResult.data.accounts.pageInfo.endCursor;

    const nextQuery = `
      query Accounts($first: Int!, $after: String) {
        accounts(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              name
              balance
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    const nextVariables = { first: 2, after: endCursor };

    const nextResult = await graphql({
      schema,
      source: nextQuery,
      variableValues: nextVariables,
    });

    expect(nextResult).toEqual({
      data: {
        accounts: {
          edges: [
            {
              cursor: expect.any(String),
              node: { id: expect.any(String), name: "Account 3", balance: 0 },
            },
            {
              cursor: expect.any(String),
              node: { id: expect.any(String), name: "Account 4", balance: 0 },
            },
          ],
          pageInfo: {
            endCursor: expect.any(String),
            hasNextPage: "false",
          },
        },
      },
    });
  });

  it("should return an empty array if there are no more accounts after the cursor", async () => {
    const firstQuery = `
      query Accounts($first: Int!) {
        accounts(first: $first) {
          edges {
            cursor
            node {
              id
              name
              balance
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    const firstVariables = { first: 4 };

    const firstResult = await graphql({
      schema,
      source: firstQuery,
      variableValues: firstVariables,
    });

    const endCursor = firstResult.data.accounts.pageInfo.endCursor;

    const nextQuery = `
      query Accounts($first: Int!, $after: String) {
        accounts(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              name
              balance
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    const nextVariables = { first: 2, after: endCursor };

    const nextResult = await graphql({
      schema,
      source: nextQuery,
      variableValues: nextVariables,
    });

    expect(nextResult).toEqual({
      data: {
        accounts: {
          edges: [],
          pageInfo: {
            endCursor: null,
            hasNextPage: "false",
          },
        },
      },
    });
  });
});
