import React from "react";
import Select from "react-select";

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    // console.log({ data, isDisabled, isFocused, isSelected });
    return {
      ...styles,
      backgroundColor: isFocused ? "#28a745" : null,
      color: isFocused ? "#fff" : "#000",
    };
  },
};

export default ({ options, placeholder, setValue }) => (
  <Select
    defaultValue=""
    options={options}
    styles={colourStyles}
    placeholder={placeholder}
    onChange={setValue}
    isSearchable
  />
);
