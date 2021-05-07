import express from "express";

import prisma from "../../prisma/client";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const albums = await prisma.album.findMany();
    return res.status(200).json(albums);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const albums = await prisma.album.findFirst({
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
          },
        },
      },
    });
    return res.status(200).json(albums);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { title, picture } = req.body;
    const { id } = req.params;

    await prisma.album.update({
      where: {
        id,
      },
      data: {
        title,
        picture,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});

export default router;
