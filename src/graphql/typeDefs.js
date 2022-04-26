import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Upload

  type FileUploadResponse {
    ETag: String!
    Location: String!
    key: String!
    Key: String!
    Bucket: String!
  }

  type Query {
    otherFields: Boolean!
  }

  type Mutation {
    fileUpload(file: Upload!): FileUploadResponse!
  }
`;