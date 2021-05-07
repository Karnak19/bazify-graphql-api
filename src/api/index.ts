import express from "express";

import songs from "./songs";
import albums from "./albums";
import playlists from "./playlists";
import artists from "./artists";
import { checkToken } from "../middlewares";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use(checkToken);

router.use("/albums", albums);
router.use("/songs", songs);
router.use("/playlists", playlists);
router.use("/artists", artists);

export default router;
