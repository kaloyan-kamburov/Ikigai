import React, { useEffect } from "react";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";

const ItemsModal = ({
  hidden,
  closeFn,
  group: { items, sets },
  updateItems,
}) => {
  const handleSubmit = (values) => {
    updateItems(values.options, sets);
    closeFn();
  };

  useEffect(() => {
    // console.log(sets);
  }, [sets]);

  return (
    <div className={`items-modal${hidden ? " hidden" : ""}`}>
      <div className="btn-close" onClick={closeFn}></div>
      <span className="desc1">Add something to your mission</span>
      <h1>Something you love and the world needs</h1>
      <Form
        validate={(values) => {
          const errors = {};
          if (
            sets.length === 1 &&
            (!values.options || values.options.length < 3)
          ) {
            errors.options = "Required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
        initialValues={{
          options: items.map((item) => ({ label: item, value: item })),
        }}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Select
                name="options"
                isMulti
                value={props.initialValues.options}
                defVal={sessionStorage.getItem("step_A")}
              />
              <div className="form-list">
                <p className="form-list-title">Your items</p>
                <ul>
                  <li>
                    <span className="check">&#10003;</span>
                    Skateboarding
                  </li>
                  <li>Design</li>
                  <li>Hiking</li>
                </ul>
              </div>
              <div className="form-btns">
                <button
                  className="btn-small"
                  disabled={props.invalid}
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </form>
          );
        }}
      </Form>
    </div>
  );
};

export default ItemsModal;
