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
        step_D: options,
      })
    );
    setRedraw(true);
    setTimeout(() => {
      setRedraw(false);
    }, 1);
  };

  const handleSubmit = () => history.push("/congratulations");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(userDetails.user).length) {
      return history.push("/chart");
    }
  }, []);

  return (
    <>
      <section className="section-dark">
        <div className="shell">
          <div className="col-wrapper">
            <div className="col_60 form-bg">
              <div className="form-head">
                <p className="formHead-title">Discover your purpose</p>
                <ul className="page-number">
                  <li>4</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What are you good at</h1>

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
                        JSON.parse(localStorage.getItem("ikigai")).step_D) ||
                      [],
                  }}
                >
                  {(props) => {
                    return (
                      <form onSubmit={props.handleSubmit}>
                        <Select
                          name="options"
                          value={props.initialValues.options}
                          defVal={sessionStorage.getItem("step_D")}
                          onExternalChange={onChange}
                        />
                        <div className="form-btns">
                          <button
                            className="btn-small"
                            disabled={props.invalid}
                            type="submit"
                          >
                            Continue
                          </button>
                          <span onClick={() => history.push("/chart")}>
                            SKIP WIZARD
                          </span>
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
            <div className="col_40">
              <MiniChart active="D" redraw={redraw} />
            </div>
            {/* <div className="col_40 form-questions">
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
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default GoodAt;
