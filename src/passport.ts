import dotenv from "dotenv";

dotenv.config();

type DoneFunc = (arg0: null, arg1: any) => void;

const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;

const credentials = {
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `${process.env.API_URL}/auth/github/cb`,
};

passport.serializeUser((user: any, done: DoneFunc) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: DoneFunc) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    credentials,
    async (
      _accessToken: any,
      _refreshToken: any,
      profile: any,
      done: DoneFunc
    ) => {
      done(null, profile);
    }
  )
);
