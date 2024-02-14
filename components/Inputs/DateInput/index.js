import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function DateInput({ label, value, setValue, required }) {
  //   const [value, setValue] = useState({
  //     startDate: new Date(),
  //     // endDate: new Date().setMonth(11),
  //   });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <div className="w-full sm:col-span-6">
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>{" "}
      <Datepicker
        value={value}
        onChange={handleValueChange}
        useRange={false}
        asSingle={true}
        primaryColor="blue"
      />
    </div>
  );
}
