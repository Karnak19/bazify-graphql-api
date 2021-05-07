import fs from "fs";
import express from "express";
import mm from "music-metadata";
import FileType from "file-type";

import { s3UploadFile } from "../aws";
import { asyncFormParse, slugify, mp3DurationString } from "../utils";
import prisma from "../../prisma/client";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const songs = await prisma.song.findMany({
      select: {
        id: true,
        title: true,
        duration: true,
        s3_link: true,
        artist: {
          select: {
            name: true,
            picture: true,
          },
        },
        album: {
          select: {
            title: true,
            picture: true,
          },
        },
        playlists: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { files } = await asyncFormParse(req);

    if (files.file.length > 1) {
      res.status(400);
      throw new Error("Please send only 1 file");
    }

    const { path } = files.file[0];

    const {
      common: { album, albumartist, title },
      format: { duration },
    } = await mm.parseFile(path, {
      duration: true,
    });

    if (!album || !albumartist || !title) {
      const errorMessage = {
        ...(!album && {
          album: "This audio file doesn't have an album in metadata",
        }),

        ...(!albumartist && {
          albumartist:
            "This audio file doesn't have an albumartist in metadata",
        }),
        ...(!title && {
          title: "This audio file doesn't have a title in metadata",
        }),
      };

      throw new Error(JSON.stringify(errorMessage));
    }

    const buffer = fs.readFileSync(path);
    const durationInSeconds = await mp3DurationString(duration);
    const type = await FileType.fromBuffer(buffer);
    const fileName = `${slugify(albumartist)}/${slugify(album)}/${slugify(
      title
    )}`;

    const count = await prisma.song.count({
      where: { title },
    });

    if (count !== 0) {
      res.status(400);
      throw new Error("This song already exists");
    }

    const data = await s3UploadFile(buffer, fileName, type);

    console.log(`Upload to S3 done ! ${fileName}`);

    const newSong = await prisma.song.create({
      data: {
        title,
        duration: durationInSeconds,
        s3_link: data.Location,
        album: {
          connectOrCreate: {
            create: {
              title: album,
              artist: {
                connect: {
                  name: albumartist,
                },
              },
            },
            where: {
              title: album,
            },
          },
        },
        artist: {
          connectOrCreate: {
            create: {
              name: albumartist,
            },
            where: {
              name: albumartist,
            },
          },
        },
      },
    });

    return res.status(201).json(newSong);
  } catch (error) {
    res.status(error.code === "P2002" ? 400 : res.statusCode || 500);
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { duration, playlistId } = req.body;
  const { id } = req.params;

  try {
    const song = await prisma.song.update({
      where: {
        id,
      },
      data: {
        duration,
        playlists: {
          connect: {
            id: playlistId,
          },
        },
      },
    });

    res.status(204).json(song);
  } catch (error) {
    next(error);
  }
});

export default router;
