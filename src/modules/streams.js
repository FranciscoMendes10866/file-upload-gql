import stream from "stream";

import { bucket, s3 } from "./bucket.js";

export const createUploadStream = (key) => {
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: s3
      .upload({
        Bucket: bucket,
        Key: key,
        Body: pass,
      })
      .promise(),
  };
};
