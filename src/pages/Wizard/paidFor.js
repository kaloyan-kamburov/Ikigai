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
      pathname: "/congratulations",
      state: {
        ...location.state,
        paidFor: values.options,
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
              <span className="rectangle active"></span>
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
                  <li>4</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What can you be paid for</h1>

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
                    options: (location.state && location.state.goodAt) || null,
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
                This question is meant to figure out your natural gifts: your
                talents and skills.
              </h2>
              <ul className="form-questions-list">
                <li>
                  {" "}
                  What parts of your current job are you effortless good at?
                </li>
                <li>
                  What are you among the best in your workplace, community (or
                  even the whole world) at?
                </li>
                <li>
                  With some more education and experience, could you be among
                  the best at what you do?
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
