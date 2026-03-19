"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";

function InputFile({ empty = false, children }) {
  return (
    <div
      className={`text-center ${
        empty ? "text-gray-600 dark:text-gray-400" : "text-white"
      }`}
    >
      <PhotoIcon
        aria-hidden="true"
        className={`mx-auto size-12 ${
          empty ? "text-gray-300 dark:text-gray-600" : "text-gray-300"
        } `}
      />
      <div className={`mt-4 flex text-sm/6`}>
        <label
          htmlFor="image"
          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:focus-within:outline-indigo-500 dark:hover:text-indigo-300"
        >
          <span>Upload a image</span>
          {children}
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs/5">PNG, JPG, WEBP up to 5MB</p>
    </div>
  );
}

export default InputFile;
