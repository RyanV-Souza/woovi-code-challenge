import { GraphQLInt, GraphQLString } from "graphql";
import { AccountConnection } from "../connections/account-connection";
import { Account } from "@/Models/account";

export const getAllAccountsQuery = {
  type: AccountConnection,
  args: {
    first: { type: GraphQLInt },
    after: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const query = {};

    if (args.after) {
      query["_id"] = {
        $gt: Buffer.from(args.after, "base64").toString("ascii"),
      };
    }

    const accounts = await Account.find(query)
      .sort({ createdAt: 1 })
      .limit(args.first + 1);

    const hasNextPage = accounts.length > args.first;

    if (hasNextPage) {
      accounts.pop();
    }

    const edges = accounts.map((account) => ({
      cursor: Buffer.from(account.id.toString()).toString("base64"),
      node: account,
    }));

    return {
      edges,
      pageInfo: {
        endCursor: edges.length ? edges[edges.length - 1].cursor : null,
        hasNextPage,
      },
    };
  },
};
