import React from "react";
import Select from "react-select";

const FormSelectInput = ({
  title,
  required,
  options,
  labelStyles,
  noPadding,
  styles,
  containerStyles,
  inputRef,
  ...props
}) => {
  const ref = React.createRef();

  const customStyles = {
    control: (styles) => ({
      ...styles,
      // paddingTop: "6px",
      // paddingBottom: "7px",
      borderRadius: "8px",
      marginTop: "8px",
      width: "100%",
      ":hover": {
        // borderColor: theme.palette.grey[800],
      },
      ":focus-within": {
        // borderColor: theme.palette.primary.main,
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 99999,
      // fontFamily: "Mulish, sans-serif",
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
    input: (styles) => ({
      ...styles,
      "input:focus": {
        boxShadow: "none",
      },
    }),
  };

  return (
    <div
      style={{
        paddingTop: noPadding ? "0px" : "24px",
        width: "100%",
        ...containerStyles,
      }}
      ref={inputRef}
    >
      {title && (
        <label
          htmlFor={title}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        ref={ref}
        styles={styles || customStyles}
        closeMenuOnSelect
        theme={(th) => ({
          ...th,
          // borderRadius: 0,
          colors: {
            ...th.colors,
            // primary: theme.palette.primary.main,
          },
          borderColor: th.primary,
        })}
        options={options}
        {...props}
      />
    </div>
  );
};

export default FormSelectInput;
