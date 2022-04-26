import { useCallback } from "react";
import { gql, useMutation } from "urql";
import { useDropzone } from "react-dropzone";

const UploadFileDocument = gql`
  mutation fileUpload($file: Upload!) {
    fileUpload(file: $file) {
      Location
    }
  }
`;

export function App() {
  const [result, uploadFile] = useMutation(UploadFileDocument);

  const { data, error } = result;

  const onDrop = useCallback(async (files) => {
    const file = files[0];
    await uploadFile({ file });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {error && (
        <pre>
          <code>{error.message}</code>
        </pre>
      )}

      {data && <img src={data.fileUpload.Location} alt />}
    </>
  );
}
