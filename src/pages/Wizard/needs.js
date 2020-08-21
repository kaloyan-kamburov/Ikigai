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
      pathname: "/what-are-you-paid-for",
      state: {
        ...location.state,
        B: values.options,
      },
    });
  };

  return (
    <>
      <section className="section-dark">
        <div className="shell">
          <ul className="wizard">
            <li className="wizard__step active">
              <span className="rectangle active"></span>
            </li>
            <li className="wizard__step active">
              <span className="rectangle active"></span>
            </li>
            <li className="wizard__step toBeFilled">
              <span className="rectangle fill"></span>
            </li>
            <li className="wizard__step">
              <span className="rectangle"></span>
            </li>
            <li className="wizard__step">
              <span className="rectangle"></span>
            </li>
          </ul>

          <div className="col-wrapper">
            <div className="col_60 form-bg">
              <div className="form-head">
                <p className="formHead-title">Discover your purpose</p>
                <ul className="page-number">
                  <li>3</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What the world needs</h1>

              <div className="form-select">
                <Form
                  validate={(values) => {
                    const errors = {};
                    if (!values.options || values.options.length < 3) {
                      errors.options = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={handleSubmit}
                  initialValues={{
                    options: (location.state && location.state.B) || null,
                  }}
                >
                  {(props) => {
                    return (
                      <form onSubmit={props.handleSubmit}>
                        <Select
                          name="options"
                          value={props.initialValues.options}
                          options={options}
                        />
                        <div className="form-btns">
                          <button
                            className="btn-small"
                            disabled={props.invalid}
                            type="submit"
                          >
                            Continue
                          </button>
                        </div>
                      </form>
                    );
                  }}
                </Form>
              </div>

              {/* <button
                onClick={() => history.push({ pathname: "/", state: {} })}
              >
                Back to home
              </button> */}

              <div className="form-foot">
                <p>You have to add at least 3 items in order to continue.</p>
                <p>
                  Don’t worry about missing out - you can always change them
                  later.
                </p>
              </div>
            </div>

            <div className="col_40 form-questions">
              <h2 className="form-questions-title">
                This question is meant to figure out what you can give to the
                world, your culture or your family.
              </h2>
              <ul className="form-questions-list">
                <li>
                  {" "}
                  What problems in your society would you like to help solve
                  immediately?
                </li>
                <li>
                  What issues in your community/ the whole world touch you
                  emotionally?
                </li>
                <li>
                  Will your work still be relevant a decade (or even a century)
                  from now?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoodAt;
