"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ImagePlus, X, Upload } from "lucide-react";
import Image from "next/image";
import { set } from "date-fns";
import { useFormContext } from "react-hook-form";
import { AnimalSchema } from "@/utils/schemas";
import { Input } from "./ui/input";

interface PhotoUploadProps {
  file?: File;
  setFile: (file: File) => void;
}

const ImageUpload = ({ file, setFile }: PhotoUploadProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setUploadProgress(0);

      const newPhoto = URL.createObjectURL(acceptedFiles[0]);

      setPhoto(newPhoto);

      console.log("newPhoto", newPhoto);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      if (acceptedFiles[0]) {
        setFile(acceptedFiles[0]);
      }
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }
          ${photo && "border-none"}
       
        `}
      >
        {photo !== null && (
          <div className="relative group">
            <Image width={200} height={200} src={photo} alt="Uploaded photo" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute z-10 top-2 w-6 h-6 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setPhoto(null);
              }}
            >
              <X className="h-1 w-1" />
            </Button>
          </div>
        )}
        <Input {...getInputProps()} />
        <div
          className={`flex flex-col items-center gap-2 ${
            photo ? "hidden" : ""
          }`}
        >
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </div>
          <div className="text-xs text-muted-foreground">
            JPEG, JPG, PNG, or WEBP (max. 5MB each)
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 animate-bounce" />
            <span className="text-sm">Uploading...</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
