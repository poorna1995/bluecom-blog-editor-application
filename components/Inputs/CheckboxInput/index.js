import React from "react";

export default function CheckboxInput({
  label = "",
  helperText = "",
  checked,
  setChecked,
}) {
  return (
    <div className="relative flex gap-x-3  sm:col-span-6">
      <div className="flex h-6 items-center">
        <input
          id="candidates"
          name="candidates"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="text-sm leading-6">
        <label htmlFor="candidates" className="font-medium text-gray-900">
          {label}
        </label>
        {helperText && <p className="text-gray-500">{helperText}</p>}{" "}
      </div>
    </div>
  );
}
