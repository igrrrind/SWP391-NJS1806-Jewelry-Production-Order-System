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

import {storage} from '../../services/Firebase'



const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

export default function ImageUpload({msg,uploadPath,uploadFileName}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  const getFileIconAndColor = (file) => {
    return {
      icon: <FileImage size={40} className={ImageColor.fillColor} />,
      color: ImageColor.bgColor,
    };
  };

  const uploadFileToFirebase = (file) => {
    const storageRef = ref(storage, `${uploadPath}/${uploadFileName}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (progress === 100) {
          setUploadedFile(file);
          setFileToUpload(null);
          return;
        }

        setFileToUpload({
          progress,
          File: file,
        });
      },
      (error) => {
        console.error("Error uploading file: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const removeFile = async () => {
    try {
      // Remove file from Firebase Storage if uploaded
      if (uploadedFile) {
        const storageRef = ref(storage, `${uploadPath}/${uploadFileName}.png`);
        await deleteObject(storageRef);
      }
  
      // Clear uploaded file state
      setUploadedFile(null);
      setFileToUpload(null);
    } catch (error) {
      console.error("Error removing file from Firebase Storage: ", error);
    }
  };


  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileToUpload({
      progress: 0,
      File: file,
    });
    uploadFileToFirebase(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
        'image/jpeg': ['.jpeg'],
      },
    maxFiles: 1,
  });

  return (
    <div>
      {!uploadedFile && !fileToUpload && (
        <div>
          <label
            {...getRootProps()}
            className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
          >
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <UploadCloud size={20} />
              </div>

              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Drag files</span>
              </p>
              <p className="text-xs text-gray-500">
                {msg}
              </p>
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

      {fileToUpload && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              File to upload
            </p>
            <div className="space-y-2 pr-3">
              <div
                key={fileToUpload.File.lastModified}
                className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
              >
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">
                    {getFileIconAndColor(fileToUpload.File).icon}
                  </div>

                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground ">
                        {fileToUpload.File.name.slice(0, 25)}
                      </p>
                      <span className="text-xs">{fileToUpload.progress}%</span>
                    </div>
                    <Progress
                      progress={fileToUpload.progress}
                      className={getFileIconAndColor(fileToUpload.File).color}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFile()}
                  className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFile && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded File
          </p>
          <div className="space-y-2 pr-3">
            <div
              key={uploadedFile.lastModified}
              className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center flex-1 p-2">
                <div className="text-white">
                  {getFileIconAndColor(uploadedFile).icon}
                </div>
                <div className="w-full ml-2 space-y-1">
                  <div className="text-sm flex justify-between">
                    <p className="text-muted-foreground ">
                      {uploadedFile.name.slice(0, 25)}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFile()}
                className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
