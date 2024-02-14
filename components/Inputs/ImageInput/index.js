/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useRef, useState } from "react";
import placeholderImage from "public/assets/upload-image.png";

export default function ImageInput({
  inputRef,
  selectedFile,
  handleFileSelect,
}) {
  // const inputRef = useRef(null);
  // const [image, setImage] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const handleFileSelect = (e) => {
  //   console.log(e.target.files);
  //   const file = e.target.files[0];
  //   setSelectedFile(URL.createObjectURL(file));
  //   // setSelectedImage(file);
  //   setImage(file);
  // };
  return (
    <div>
      {selectedFile ? (
        <>
          <div className="group relative flex w-full items-center  justify-center">
            <img
              src={selectedFile}
              alt=""
              className="flex h-64 w-full rounded-lg object-cover object-top"
              ref={inputRef}
            />
            <label
              htmlFor="dropzone-file"
              className="absolute left-0 right-0 top-0 hidden h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 opacity-70 hover:bg-gray-100 group-hover:flex "
            >
              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  aria-hidden="true"
                  className="mb-3 h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or Webp
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/png , image/jpeg , image/jpg , image/webp"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </>
      ) : (
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="hover:bg-bray-600 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300  bg-gray-50   hover:bg-gray-100 "
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                aria-hidden="true"
                className="mb-3 h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or Webp
              </p>
            </div>
            <input
              id="dropzone-file"
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/png , image/jpeg , image/jpg , image/webp"
              onChange={handleFileSelect}
            />
          </label>
        </div>
      )}{" "}
    </div>
  );
}
