import express from "express";
import passport from "passport";
import cors from "cors";

import server from "./server";
import auth from "./auth";
import api from "./api";

const PORT = process.env.PORT || 4000;

const app = express();

(async () => {
  await server.start();

  app.use(cors());
  app.use(passport.initialize());
  require("./passport");

  server.applyMiddleware({
    app,
    cors: {
      origin: "*",
    },
  });

  app.use("/auth", auth);
  app.use("/api/v1", api);

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
