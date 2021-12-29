import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const onDropRejected = () => {
    alert('Please drop upto 5 files only!');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: '.pdf, .doc, .docx, .rtf, .ppt',
    onDropRejected,
  });

  return (
    <div
      className="bg-white cursor-pointer shadow-md rounded-xl p-8 w-full text-center"
      {...getRootProps()}
    >
      <div className="border-2 border-dashed divide-x rounded-md p-10 border-pink-100 flex flex-col justify-center items-center">
        <input {...getInputProps()} />
        <i class="fa fa-upload" aria-hidden="true"></i>
        <p className="text-lg font-semibold mb-1">
          Drop your files here or <span className="text-pink-100">browse</span>
        </p>
        <p className="text-md text-gray-400">
          Max 5 files. PDF or .doc files are recommended.
        </p>
      </div>
    </div>
  );
};

export default FileDropzone;