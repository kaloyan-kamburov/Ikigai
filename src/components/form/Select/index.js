import React from "react";
import CreatableSelect from "react-select/async-creatable";
import { Field } from "react-final-form";
import Highlighter from "react-highlight-words";
import { debounce } from "underscore";

const styles = {
  container: (provided) => ({
    ...provided,
    border: "none",
  }),
  control: (provided) => ({
    ...provided,
    border: "0",
    borderBottom: "1px solid #000",
    borderRadius: 0,
    boxShadow: "none",
  }),
  // option: (provided) => ({ ...provided, background: "red" }),
  menu: (provided) => ({
    border: "1px solid #000",
    boxShadow: "3px 3px",
    marginTop: "3px",
    position: "absolute",
    width: "100%",
    background: "#fff",
    zIndex: 1,
  }),
  multiValue: (provided) => ({
    ...provided,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #979797",
    borderRadius: 0,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    paddingLeft: 0,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    cursor: "pointer",
    width: 22,
    padding: 0,
    // display: "flex",
    justifyContent: "flex-end",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: 0,
    paddingRight: 0,
  }),
  input: (provided) => ({ ...provided, width: "100%" }),
  dropdownIndicator: () => ({ display: "none" }),
};
const options = [
  {
    label: "Skateboarding",
    value: "Skateboarding",
  },
  {
    label: "Drawing",
    value: "Drawing",
  },
  {
    label: "Cooking",
    value: "Cooking",
  },
  {
    label: "Travelling",
    value: "Travelling",
  },
  {
    label: "Design",
    value: "Design",
  },
];

// const loadOptions = async (inputValue, callback) => {
//   if (!inputValue || inputValue.length < 2) {
//     return callback([]);
//   }
//   try {
//     const res = await fetch(`http://localhost:3001/items?q=${inputValue}`);
//     return res.json();
//   } catch (e) {
//     return callback([]);
//   }
// };

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    return callback(options);
  }, 2000);
};

const formatOptionLabel = ({ label = "" }, { inputValue }) => {
  return (
    <Highlighter
      searchWords={[inputValue]}
      textToHighlight={label}
      highlightStyle={{
        background: "transparent",
        fontFamily: "Campton-Bold",
      }}
    />
  );
};

const formatCreateLabel = (value) => `Add ${value}`;

const renderSelect = (props) => {
  const onChange = (item) => {
    // Final form provided utility method
    const { onChange, value } = props.input;
    onChange(item);
  };
  return (
    <CreatableSelect
      onChange={onChange}
      value={props.input.value}
      styles={styles}
      placeholder="Start typing"
      isMulti
      classNamePrefix="custom-select"
      {...props}
      formatOptionLabel={formatOptionLabel}
      formatCreateLabel={formatCreateLabel}
      loadOptions={debounce(loadOptions, 500)}
      cacheOptions
      // defaultMenuIsOpen
      // menuIsOpen
    />
  );
};

const SelectComponent = (props) => (
  <Field component={renderSelect} {...props} />
);

export default SelectComponent;
