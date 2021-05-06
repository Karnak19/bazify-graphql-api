import { songQuery, songRelationResolver } from "./songs";
import { artistQuery, artistRelationResolver } from "./artists";
import { albumRelationResolver } from "./albums";

const resolvers = {
  Query: {
    ...songQuery,
    ...artistQuery,
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
