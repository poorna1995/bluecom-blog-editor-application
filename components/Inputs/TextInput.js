import { type } from "os";
import React from "react";

export default function TextInput({
  label = "",
  value = "",
  onChange,
  placeholder = "",
  helperText = "",
  rows = 1,
  type = "text",
  required = false,
}) {
  return (
    <div className="mt-1 sm:col-span-6">
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <input
          id={label}
          type={type || "text"}
          name={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Enter ${label}`}
          rows={rows || 3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {helperText && (
        <p className="mt-3 text-sm leading-6 text-gray-600">{helperText}</p>
      )}{" "}
    </div>
  );
}
