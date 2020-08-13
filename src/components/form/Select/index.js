import React from "react";
import CreatableSelect from "react-select/creatable";
import { Field } from "react-final-form";
import Highlighter from "react-highlight-words";

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

const formatOptionLabel = ({ label = "" }, { inputValue }) => {
  return (
    <Highlighter
      searchWords={[inputValue]}
      textToHighlight={label}
      highlightStyle={{ background: "transparent", fontWeight: 900 }}
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
      // defaultMenuIsOpen
      // menuIsOpen
    />
  );
};

const SelectComponent = (props) => (
  <Field component={renderSelect} {...props} />
);

export default SelectComponent;
