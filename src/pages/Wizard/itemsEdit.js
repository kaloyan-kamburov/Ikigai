import React, { useEffect } from "react";
import { difference, uniq, without } from "underscore";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";

const ItemsEdit = ({ sets, items = [], onClose, posX, posY, saveFn }) => {
  const history = { useHistory };

  const handleSubmit = (values, initialValues) => {
    document.getElementById("ikigai").innerHTML = null;

    sets.forEach((setName) => {
      const itemsGroup = JSON.parse(localStorage.getItem("ikiSettings")).items[
        `step_${setName}`
      ].reduce((acc, item) => {
        acc.push(item.label);
        return acc;
      }, []);

      const itemsOptions =
        values.options && values.options.length > 0
          ? values.options.reduce((acc, item) => {
              acc.push(item.label);
              return acc;
            }, [])
          : [];

      const removedValues = difference(
        initialValues.reduce((acc, item) => {
          acc.push(item.label);
          return acc;
        }, []),
        itemsOptions
      );

      const newArr = uniq(
        uniq([
          ...itemsOptions,
          ...without(itemsGroup, ...removedValues),
        ]).reduce((acc, item) => {
          acc.push({ label: item, value: item });
          return acc;
        }, [])
      );

      const ikiSettings = JSON.parse(localStorage.getItem("ikiSettings"));
      ikiSettings.items[`step_${setName}`] = newArr;

      localStorage.setItem("ikiSettings", JSON.stringify(ikiSettings));
    });
    saveFn();
  };

  useEffect(() => {
    const ikiSettings = JSON.parse(localStorage.getItem("ikiSettings"));

    if (
      !ikiSettings ||
      !(
        ikiSettings &&
        !(
          ikiSettings.items &&
          (!ikiSettings.items.step_A ||
            !ikiSettings.items.step_B ||
            !ikiSettings.items.step_C ||
            !ikiSettings.items.step_D)
        )
      )
    ) {
      return history.push("/");
    }
  }, []);

  return (
    <div
      className="items-popup"
      style={{
        left: posX + "px",
        top: posY + "px",
      }}
    >
      <Form
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.options || values.options.length < 3) {
        //     errors.options = "Required";
        //   }
        //   return errors;
        // }}
        onSubmit={(values) =>
          handleSubmit(
            values,
            items.map((item) => ({ label: item, value: item }))
          )
        }
        initialValues={{
          options: items.map((item) => ({ label: item, value: item })),
        }}
      >
        {(props) => {
          return (
            <div className="items-popupWrapper">
            <form onSubmit={props.handleSubmit}>
              <Select className="popupSelect"
                name="options"
                isMulti
                value={props.initialValues.options}
                autoFocus
              />
              <button className="btn-save" type="submit">save</button>
            </form>
            </div>
          );
        }}
      </Form>
      <span className="closeBtn"  onClick={onClose}></span>
    </div>
  );
};

export default ItemsEdit;
