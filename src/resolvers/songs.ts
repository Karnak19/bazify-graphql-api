import { Album, Artist, Song } from ".prisma/client";
import { Queries } from "../..";

export const songQuery: Queries<Song | Song[], { id: string }> = {
  songs: (parent, args, { prisma }) => {
    return prisma.song.findMany();
  },
  song: (parent, { id }, { prisma }) => {
    return prisma.song.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });
  },
};

export const songRelationResolver: Queries<
  Artist | Album | null,
  { id: string }
> = {
  artist: (parent, args, { prisma }) => {
    return prisma.song
      .findFirst({
        where: { id: parent.id },
      })
      .artist();
  },
  album: (parent, args, { prisma }) => {
    return prisma.song
      .findFirst({
        where: { id: parent.id },
      })
      .album();
  },
};
