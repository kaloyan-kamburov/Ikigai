import React from "react";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";
import { useHistory, useLocation } from "react-router-dom";

const GoodAt = () => {
  const history = useHistory();
  const location = useLocation();
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
  ];

  const handleSubmit = (values) => {
    history.push({
      pathname: "/what-the-world-needs",
      state: {
        ...location.state,
        love: values.options,
      },
    });
  };

  return (
    <>
      <h1>What you love?</h1>
      <Form
        validate={(values) => {
          const errors = {};
          if (!values.options || !values.options.length) {
            errors.options = "Required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
        initialValues={{
          options: (location.state && location.state.love) || null,
        }}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Select
                name="options"
                isMulti
                options={options}
                value={props.initialValues.options}
              />
              <button disabled={props.invalid} type="submit">
                Next
              </button>
            </form>
          );
        }}
      </Form>
      <button
        onClick={() =>
          history.push({
            pathname: "what-are-you-good-at",
            state: location.state,
          })
        }
      >
        Back
      </button>
    </>
  );
};

export default GoodAt;
