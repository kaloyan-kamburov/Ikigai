import React, { useEffect, useContext, useState } from "react";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context";
import MiniChart from "../../components/MiniChart";
import preventEnterFn from "./preventEnterFn";

const GoodAt = () => {
  const [userDetails, setUserDetails] = useContext(UserContext);
  const history = useHistory();
  // const location = useLocation();
  // const [redraw, setRedraw] = useState(false);

  const onChange = (options) => {
    const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
    localStorage.setItem(
      "ikigai",
      JSON.stringify({
        ...ikiSettings,
        step_C: options,
      })
    );
    // setRedraw(true);
    // setTimeout(() => {
    //   setRedraw(false);
    // }, 1);
  };

  const handleSubmit = () => history.push("/what-are-you-good-at");

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("keypress", preventEnterFn);
    if (Object.keys(userDetails.user).length) {
      return history.push("/chart");
    }
    return () => window.removeEventListener("keypress", preventEnterFn);
  }, []);

  return (
    <>
      <section className="section-yellow">
        <div className="shell">
          <div className="col-wrapper">
            <div className="col_50">
              <div className="form-head">
                <a
                  className="formHead-title"
                  onClick={() =>
                    history.push({ pathname: "/what-the-world-needs" })
                  }
                >
                  {" "}
                  Step
                </a>
                <ul className="page-number">
                  <li>3</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What you can be Paid For</h1>
              <p className="form-subtitle">
                What would you do if you didn’t have to worry about money?
              </p>
              <p className="form-listTitle">Start by asking yourself:</p>
              <ul className="form-list">
                <li> What do you currently get paid to do?</li>
                <li>What have you previously been paid to do?</li>
                <li>What jobs currently pay well in the marketplace?</li>
                <li>What opportunities exist in the marketplace</li>
                <li>
                  What career did your parents advice you to follow that pays
                  well?
                </li>
                <li>
                  What have you been trained and educated in and could be paid
                  to do?
                </li>
              </ul>

              {/* <MiniChart active="C" redraw={redraw} /> */}
              <MiniChart active="C" />
            </div>
            <div className="col_50 form-bg">
              <div className="form-select">
                <h2 className="form-selectTitle">Add your items here</h2>
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
                        JSON.parse(localStorage.getItem("ikigai")).step_C) ||
                      [],
                  }}
                >
                  {(props) => {
                    return (
                      <form onSubmit={props.handleSubmit}>
                        <Select
                          name="options"
                          value={props.initialValues.options}
                          defVal={sessionStorage.getItem("step_C")}
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

            {/* <div className="col_40 form-questions">
              <h2 className="form-questions-title">
                This question is about the things that can put bread on your
                table, whether you enjoy them or not.
              </h2>
              <ul className="form-questions-list">
                <li>
                  {" "}
                  Lately, have you been paid for what you do? Have you ever been
                  paid for what you do? If not, are other people being paid for
                  this work?
                </li>
                <li>
                  Are you already making a good living doing what it is that
                  you’re doing? Can you eventually make a good living doing this
                  work?
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
