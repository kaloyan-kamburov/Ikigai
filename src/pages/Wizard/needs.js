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
            <div className="col_50">
              <div className="form-head">
                <a className="formHead-title" onClick={() => history.push({ pathname: "/what-you-love"})} >	Step</a>
                <ul className="page-number">
                  <li>2</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What the World Needs</h1>
              <p className="form-subtitle">
               What does the world need the most? What you can give to the world or your community?
              </p>
              <p className="form-listTitle">Start by asking yourself:</p>
              <ul className="form-list">
                <li>What problems in the world or your community would you like to help solve immediately?</li>
                <li>What do you think are the biggest challenges in the world?</li>
                <li>What issues touch you emotionally?</li>
                <li>Why were you put on this Earth?</li>
                <li>What do you think would be an exciting and inspiring future for the world or your community?</li>
                <li>Will your work still be relevant a decade or even a century from now?</li>
              </ul>
              <MiniChart active="B" redraw={redraw} />
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
