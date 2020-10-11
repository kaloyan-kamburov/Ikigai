import React, { useState } from "react";
import CreatableSelect from "react-select/async-creatable";
import { Field } from "react-final-form";
import Highlighter from "react-highlight-words";
import { debounce } from "underscore";
import axios from "../../../utils/api";
// import Loader from "../../Loader";

// const LoadingIndicator = (props) => {
//   return <Loader relative />;
// };

const loadOptions = async (inputValue, callback) => {
  if (!inputValue || inputValue.length < 2) {
    return callback([]);
  }
  try {
    const res = await axios({ url: `items/?q=${inputValue}`, method: "get" });
    return callback(res.data);
  } catch (e) {
    return callback([]);
  }
};

// const loadOptions = (inputValue, callback) => {
//   // setTimeout(() => {
//   return callback(options);
//   // }, 2000);
// };

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
  const styles = {
    container: (provided) => ({
      ...provided,
      border: "none",
    }),
    control: (provided) => ({
      ...provided,
      border: "0",
      borderBottom: props.inModal ? "none" : "1px solid #000",
      borderRadius: 0,
      boxShadow: "none",
      // paddingTop: props.inModal ? "50px" : "0",
    }),
    // option: (provided) => ({ ...provided, background: "red" }),
    menu: (provided) => ({
      border: "1px solid #000",
      boxShadow: "3px 3px",
      position: "absolute",
      width: "100%",
      background: "#fff",
      zIndex: 1,
      top: props.inModal ? "27px" : "inherit",
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
      // position: props.inModal ? "absolute" : "relative",
      width: "100%",
      paddingTop: props.inModal ? "36px" : "0",
    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
      position: props.inModal ? "absolute" : "relative",
      top: props.inModal ? "0" : "auto",
      borderBottom: props.inModal ? "1px solid #000" : "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      top: props.inModal ? "18px" : "50%",
    }),
    dropdownIndicator: () => ({ display: "none" }),
  };
  const onChange = (item) => {
    // Final form provided utility method
    const { onChange } = props.input;
    onChange(item);
  };

  return (
    <CreatableSelect
      onChange={onChange}
      value={props.input.value || (props.defVal && JSON.parse(props.defVal))}
      styles={styles}
      placeholder="Start typing"
      isMulti
      classNamePrefix="custom-select"
      {...props}
      formatOptionLabel={formatOptionLabel}
      formatCreateLabel={formatCreateLabel}
      loadOptions={debounce(loadOptions, 500)}
      // components={{ loadingIndicator: LoadingIndicator }}
      // menuIsOpen
      cacheOptions
    />
  );
};

const SelectComponent = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const onInputChange = (value) => {
    setMenuIsOpen(value.length >= 2);
  };
  return (
    <Field
      onInputChange={onInputChange}
      menuIsOpen={menuIsOpen}
      component={renderSelect}
      {...props}
      defVal={props.defVal}
    />
  );
};

export default SelectComponent;
