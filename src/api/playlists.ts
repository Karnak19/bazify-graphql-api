import express from "express";

import prisma from "../../prisma/client";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        songs: {
          select: {
            id: true,
            title: true,
            s3_link: true,
            artist: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(playlists);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findFirst({
      where: {
        id,
      },
      include: {
        songs: {
          select: {
            id: true,
            title: true,
            duration: true,
            s3_link: true,
            album: {
              select: {
                id: true,
                title: true,
                picture: true,
              },
            },
            artist: {
              select: {
                id: true,
                picture: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(playlist);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description, picture } = req.body;

    const playlist = await prisma.playlist.create({
      data: {
        title,
        description,
        picture,
      },
    });

    return res.json(playlist).status(201);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { title, description, picture } = req.body;
    const { id } = req.params;

    await prisma.playlist.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        picture,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:idPlaylist/songs/:idSong", async (req, res, next) => {
  try {
    const { title, description, picture } = req.body;
    const { idPlaylist, idSong } = req.params;

    await prisma.playlist.update({
      where: {
        id: idPlaylist,
      },
      data: {
        title,
        description,
        picture,
        songs: {
          disconnect: {
            id: idSong,
          },
        },
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.playlist.delete({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});

export default router;
