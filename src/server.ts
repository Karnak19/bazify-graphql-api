import { ApolloServer } from "apollo-server";

import prisma from "../prisma/client";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma: prisma,
  },
});
