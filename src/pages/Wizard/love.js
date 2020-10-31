import React, { useEffect, useContext } from "react";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context";
import MiniChart from "../../components/MiniChart";

const GoodAt = () => {
  const history = useHistory();
  const location = useLocation();
  const [userDetails, setUserDetails] = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(userDetails.user).length) {
      return history.push("/chart");
    }
  }, []);

  const handleSubmit = (values) => {
    const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
    localStorage.setItem(
      "ikigai",
      JSON.stringify({
        ...ikiSettings,
        step_A: values.options,
      })
    );
    history.push({
      pathname: "/what-are-you-good-at",
      state: {
        ...location.state,
        A: values.options,
      },
    });
  };

  return (
    <>
      <section className="section-dark">
        <div className="shell">
          <div className="col-wrapper">
            <div className="col_60 form-bg">
              <div className="form-head">
                <p className="formHead-title">Discover your purpose</p>
                <ul className="page-number">
                  <li>1</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What you love</h1>
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
                        JSON.parse(localStorage.getItem("ikigai")).step_A) ||
                      [],
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
                        {/* <div className="form-list">
                          <p className="form-list-title">Your items</p>
                          <ul>
                            <li>
                              <span className="check">&#10003;</span>
                              Skateboarding
                            </li>
                            <li>Design</li>
                            <li>Hiking</li>
                          </ul>
                        </div> */}
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
                {/* <button
                  onClick={() =>
                    history.push({
                      pathname: "what-are-you-good-at",
                      state: location.state,
                    })
                  }
                >
                  Back
                </button> */}
              </div>
              <div className="form-foot">
                <p>You have to add at least 3 items in order to continue.</p>
                <p>
                  Don’t worry about missing out - you can always change them
                  later.
                </p>
              </div>
            </div>
            <div className="col_40">
              <MiniChart active="A" />
            </div>

            {/* 
              <div className="col_40 form-questions">
                <h2 className="form-questions-title">
                  This question is about figuring out what you find fun,
                  interesting and motivating.
                </h2>
                <ul className="form-questions-list">
                  <li>
                    {" "}
                    What would you do if you didn’t have to worry about making
                    money?
                  </li>
                  <li>
                    How would you spend your time on a long vacation or a free
                    weekend?
                  </li>
                  <li>
                    What’s exciting to you and gets your juices flowing when you
                    do it?
                  </li>
                  <li>
                    What could you enthusiastically talk about for hours on end?
                  </li>
                </ul>
              </div> 
            */}
          </div>
        </div>
      </section>
    </>
  );
};

export default GoodAt;
