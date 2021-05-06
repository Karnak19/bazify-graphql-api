import { gql } from "apollo-server";

export default gql`
  type Song {
    id: ID
    title: String
    s3_link: String
    duration: String
    artist: Artist
    album: Album
  }

  type Artist {
    id: ID
    name: String
    picture: String
    songs: [Song]
    albums: [Album]
  }

  type Album {
    id: ID
    title: String
    picture: String
    artist: Artist
    songs: [Song]
  }

  type Query {
    songs: [Song]
    song(id: ID!): Song

    artists: [Artist]
    artist(id: ID!): Artist
  }
`;
