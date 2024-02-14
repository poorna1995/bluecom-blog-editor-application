import React from "react";

export default function TextButton({ children, ...props }) {
  return (
    <button
      className="text-sm font-semibold leading-6 text-gray-900"
      {...props}
    >
      {children}
    </button>
  );
}
