import React, { useEffect, useContext /*, useState */ } from "react";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";
import { useHistory /*, useLocation */ } from "react-router-dom";
import { UserContext } from "../../context";
import MiniChart from "../../components/MiniChart";
import preventEnterFn from "./preventEnterFn";

const GoodAt = () => {
  const [userDetails /*, setUserDetails*/] = useContext(UserContext);
  const history = useHistory();
  // const location = useLocation();
  // const [redraw, setRedraw] = useState(false);

  const onChange = (options) => {
    const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
    localStorage.setItem(
      "ikigai",
      JSON.stringify({
        ...ikiSettings,
        step_D: options,
      })
    );
    // setRedraw(true);
    // setTimeout(() => {
    //   setRedraw(false);
    // }, 1);
  };

  const handleSubmit = () => history.push("/congratulations");

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("keypress", preventEnterFn);
    if (Object.keys(userDetails.user).length) {
      return history.push("/chart");
    }
    return () => window.removeEventListener("keypress", preventEnterFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="section-yellow">
        <div className="shell">
          <div className="col-wrapper">
            <div className="col_50">
              <div className="form-head">
                {/* eslint-disable-next-line*/}
                <a
                  className="formHead-title"
                  onClick={() =>
                    history.push({ pathname: "/what-are-you-paid-for" })
                  }
                >
                  {" "}
                  Step
                </a>
                <ul className="page-number">
                  <li>4</li>
                  <li>4</li>
                </ul>
              </div>

              <h1 className="form-title">What are you GOOD AT</h1>
              <p className="form-subtitle">
                What are your natural gifts, talents and special skills? It
                could be activities you enjoy or activities you don’t enjoy so
                much.
              </p>

              <p className="form-listTitle">Ask yourself:</p>
              <ul className="form-list">
                <li>
                  What are you among the best in your workplace or from the
                  people you know?
                </li>
                <li>
                  What comes easy to you and you are effortlessly good at?
                </li>
                <li>
                  With some more education and experience, what areas could you
                  be among the best at what you do?
                </li>
              </ul>
              {/* <MiniChart active="D" redraw={redraw} /> */}
              <MiniChart active="D" />
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
