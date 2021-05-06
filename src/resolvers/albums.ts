import { Album, Artist, Song } from ".prisma/client";
import { Queries } from "../..";

export const albumQuery: Queries<Album | Album[], { id: string }> = {
  albums: (parent, args, { prisma }) => {
    return prisma.album.findMany();
  },
  album: (parent, { id }, { prisma }) => {
    return prisma.album.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });
  },
};

export const albumRelationResolver: Queries<
  Song[] | Artist | null,
  { id: string }
> = {
  songs: (parent, args, { prisma }) => {
    return prisma.album
      .findFirst({
        where: {
          id: parent.id,
        },
      })
      .songs();
  },
  artist: (parent, args, { prisma }) => {
    return prisma.album
      .findFirst({
        where: {
          id: parent.id,
        },
      })
      .artist();
  },
};
