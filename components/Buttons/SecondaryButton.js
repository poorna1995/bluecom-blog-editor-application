import React from "react";
import classNames from "classnames";
export default function SecondaryButton({ children, className='', ...props }) {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
        className,
      )}
      {...props}
    >
      {" "}
      {children}
    </button>
  );
}
