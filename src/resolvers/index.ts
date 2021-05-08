import { songQuery, songRelationResolver } from "./songs";
import { artistQuery, artistRelationResolver } from "./artists";
import { albumQuery, albumRelationResolver } from "./albums";

const resolvers = {
  Query: {
    ...songQuery,
    ...artistQuery,
    ...albumQuery,
  },
  // Mutation: {},
  Song: {
    ...songRelationResolver,
  },
  Artist: {
    ...artistRelationResolver,
  },
  Album: {
    ...albumRelationResolver,
  },
};

export default resolvers;
