import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FileImage, X, UploadCloud } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "@radix-ui/react-progress";
import { storage } from "../../services/Firebase";

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

export default function ImagesUpload({ msg, uploadPath, onSubmit }) {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getFileIconAndColor = (file) => {
    return {
      icon: <FileImage size={40} className={ImageColor.fillColor} />,
      color: ImageColor.bgColor,
    };
  };

  const uploadFilesToFirebase = (files) => {
    const promises = files.map((file) => {
      const storageRef = ref(storage, `${uploadPath}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setFilesToUpload((prev) =>
              prev.map((f) =>
                f.file.name === file.name ? { ...f, progress } : f
              )
            );
          },
          (error) => {
            console.error("Error uploading file: ", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve({ file, downloadURL });
            });
          }
        );
      });
    });

    return Promise.all(promises);
  };

  const removeFile = async (fileToRemove) => {
    try {
      if (uploadedFiles.some((f) => f.file.name === fileToRemove.name)) {
        const storageRef = ref(storage, `${uploadPath}/${fileToRemove.name}`);
        await deleteObject(storageRef);
      }

      setFilesToUpload((prev) =>
        prev.filter((file) => file.file.name !== fileToRemove.name)
      );
      setUploadedFiles((prev) =>
        prev.filter((file) => file.file.name !== fileToRemove.name)
      );
    } catch (error) {
      console.error("Error removing file from Firebase Storage: ", error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({ file, progress: 0 }));
    setFilesToUpload((prev) => [...prev, ...files]);
  }, []);

  const handleSubmit = async () => {
    const result = await uploadFilesToFirebase(filesToUpload.map((f) => f.file));
    setUploadedFiles(result);
    setFilesToUpload([]);
    onSubmit(result.map((r) => r.downloadURL));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxFiles: 10,
  });

  return (
    <div>
      {!filesToUpload.length && !uploadedFiles.length && (
        <div>
          <label
            {...getRootProps()}
            className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <UploadCloud size={20} />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Drag files</span>
              </p>
              <p className="text-xs text-gray-500">{msg}</p>
            </div>
          </label>
          <Input
            {...getInputProps()}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </div>
      )}

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileData) => (
                <div
                  key={fileData.file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {getFileIconAndColor(fileData.file).icon}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground">
                          {fileData.file.name.slice(0, 25)}
                        </p>
                        <span className="text-xs">{fileData.progress}%</span>
                      </div>
                      <Progress.Root
                        value={fileData.progress}
                        className="h-1 bg-gray-200 rounded"
                      >
                        <Progress.Indicator
                          className={`${getFileIconAndColor(fileData.file).color} h-full rounded`}
                          style={{ width: `${fileData.progress}%` }}
                        />
                      </Progress.Root>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(fileData.file)}
                    className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((fileData) => (
              <div
                key={fileData.file.lastModified}
                className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">
                    {getFileIconAndColor(fileData.file).icon}
                  </div>
                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground">
                        {fileData.file.name.slice(0, 25)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(fileData.file)}
                  className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(filesToUpload.length > 0 || uploadedFiles.length > 0) && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Upload Files
        </button>
      )}
    </div>
  );
}
