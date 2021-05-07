import express from "express";
import passport from "passport";

import server from "./server";
import auth from "./auth";

const PORT = process.env.PORT || 4000;

const app = express();

(async () => {
  await server.start();

  server.applyMiddleware({ app });

  app.use(passport.initialize());
  require("./passport");

  app.use("/auth", auth);

  await new Promise((resolve) =>
    app.listen({ port: PORT }, () => {
      console.log(`
      Server running on port ${PORT}.
      GraphQL running on ${server.graphqlPath}.
      `);
      resolve;
    })
  );
})();
