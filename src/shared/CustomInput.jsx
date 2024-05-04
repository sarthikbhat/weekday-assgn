import React, { useState } from "react";
import "./Shared.css";
import Select from "react-select";

const CustomInput = ({ placeholder, type, short, name, options }) => {
  const [placeholderVisible, setPlaceHolderVisible] = useState(true);

  const selectClick = () => {
    setPlaceHolderVisible(false);
  };

  const onInputChange = () => {
    setPlaceHolderVisible(false);
  };

  return (
    <div className="custom-input-box">
      {!placeholderVisible && <p>{short || placeholder}</p>}
      {type === "select" ? (
        <Select
          isMulti
          name={name}
          options={options}
          className="select"
          classNamePrefix={placeholder}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="input-comp-name"
          type="text"
          onChange={() => onInputChange()}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default CustomInput;
