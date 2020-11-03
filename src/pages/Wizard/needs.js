import React, { useEffect, useContext, useState } from "react";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context";
import MiniChart from "../../components/MiniChart";

const GoodAt = () => {
  const [userDetails, setUserDetails] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const [redraw, setRedraw] = useState(false);

  const onChange = (options) => {
    const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
    localStorage.setItem(
      "ikigai",
      JSON.stringify({
        ...ikiSettings,
        step_B: options,
      })
    );
    setRedraw(true);
    setTimeout(() => {
      setRedraw(false);
    }, 1);
  };

  const handleSubmit = () => history.push("/what-are-you-paid-for");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(userDetails.user).length) {
      return history.push("/chart");
    }
  }, []);

  return (
    <>
      <section className="section-yellow">
        <div className="shell">
          <div className="col-wrapper">
            <div className="col_50 form-bg">
              <div className="form-head">
                <a className="formHead-title">Step</a>
                <ul className="page-number">
                  <li>2</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What the world needs</h1>
              <p className="form-subtitle">
                What would you do if you didn’t have to worry about money?
              </p>
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
                    options:
                      (JSON.parse(localStorage.getItem("ikigai")) &&
                        JSON.parse(localStorage.getItem("ikigai")).step_B) ||
                      [],
                  }}
                >
                  {(props) => {
                    return (
                      <form onSubmit={props.handleSubmit}>
                        <Select
                          name="options"
                          value={props.initialValues.options}
                          defVal={sessionStorage.getItem("step_B")}
                          onExternalChange={onChange}
                        />
                        <div className="form-btns">
                          <button
                            className="btn-form"
                            disabled={props.invalid}
                            type="submit"
                          >
                            Continue
                          </button>
                          {/* <span onClick={() => history.push("/chart")}>
                            SKIP WIZARD
                          </span> */}
                        </div>
                        <div className="form-foot">
                          <p>
                            You have to add at least 3 items in order to
                            continue.
                          </p>
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

            </div>

            <div className="col_50">
              <MiniChart active="B" redraw={redraw} />
            </div>

            {/* <div className="col_40 form-questions">
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
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default GoodAt;
