import React from "react";
import Select from "react-select";
import { Field } from "react-final-form";

const renderSelect = (props) => {
  const onChange = (item) => {
    // Final form provided utility method
    const { onChange, value } = props.input;
    onChange(item);
  };
  return <Select onChange={onChange} value={props.input.value} {...props} />;
};

const SelectComponent = (props) => (
  <Field component={renderSelect} {...props} />
);

export default SelectComponent;
