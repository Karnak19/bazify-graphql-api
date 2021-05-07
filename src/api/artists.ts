import express from "express";

import prisma from "../../prisma/client";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const artists = await prisma.artist.findMany();

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const artists = await prisma.artist.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { picture } = req.body;
  try {
    const artists = await prisma.artist.update({
      where: {
        id,
      },
      data: {
        picture,
      },
    });

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/songs", async (req, res, next) => {
  const { id } = req.params;
  try {
    const s = await prisma.artist.findUnique({
      where: {
        id,
      },
      include: {
        songs: {
          select: {
            title: true,
            s3_link: true,
            album: {
              select: {
                picture: true,
                title: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(s);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/albums", async (req, res, next) => {
  const { id } = req.params;
  try {
    const s = await prisma.artist.findUnique({
      where: {
        id,
      },
      include: {
        albums: true,
      },
    });

    res.status(200).json(s);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, picture } = req.body;
  try {
    const newArtist = await prisma.artist.create({
      data: {
        name,
        picture,
      },
    });
    return res.status(201).send(newArtist);
  } catch (error) {
    res.status(error.statusCode || 500);
    return next(error);
  }
});

export default router;
