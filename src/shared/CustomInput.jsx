import React, { useState } from "react";
import "./Shared.css";
import Select from "react-select";

const CustomInput = ({
  placeholder,
  type,
  short,
  name,
  options,
  handleFilterInput,
  isMulti,
}) => {
  const [placeholderVisible, setPlaceHolderVisible] = useState(true);

  const onInputChange = (value) => {
    if (value && (!!value.length || !!Object.keys(value).length))
      setPlaceHolderVisible(false);
    else setPlaceHolderVisible(true);
    handleFilterInput(name, value);
  };

  return (
    <div className="custom-input-box">
      {!placeholderVisible && <p className="label">{short || placeholder}</p>}
      {type === "select" ? (
        <Select
          isMulti={isMulti}
          backspaceRemovesValue
          isClearable
          name={name}
          options={options}
          className="select"
          classNamePrefix={placeholder}
          placeholder={placeholder}
          onChange={(e) => onInputChange(e)}
        />
      ) : (
        <input
          className="input-comp-name"
          type="text"
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default CustomInput;
