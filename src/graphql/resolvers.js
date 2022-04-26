import { ApolloError } from "apollo-server-express";
import { GraphQLUpload } from "graphql-upload";

import { createUploadStream } from "../modules/streams.js";

export const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    fileUpload: async (parent, { file }) => {
      const { filename, createReadStream } = await file;

      const stream = createReadStream();

      let result;

      try {
        const uploadStream = createUploadStream(filename);
        stream.pipe(uploadStream.writeStream);
        result = await uploadStream.promise;
      } catch (error) {
        console.log(
          `[Error]: Message: ${error.message}, Stack: ${error.stack}`
        );
        throw new ApolloError("Error uploading file");
      }

      return result;
    },
  },
};
