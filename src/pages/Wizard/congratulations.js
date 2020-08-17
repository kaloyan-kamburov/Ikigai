import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const Congratulations = () => {
  const history = useHistory();
  const location = useLocation();
  return (
    <section className="section-dark">
      <div className="shell">
        <ul className="wizard">
          <li className="wizard__step active">
            <span className="rectangle active"></span>
          </li>
          <li className="wizard__step active">
            <span className="rectangle active"></span>
          </li>
          <li className="wizard__step active">
            <span className="rectangle active"></span>
          </li>
          <li className="wizard__step active">
            <span className="rectangle active"></span>
          </li>
          <li className="wizard__step">
<<<<<<< HEAD
            <span className="rectangle active"></span>
=======
            <span className="rectangle fill"></span>
>>>>>>> ef6457510507223f08646414f8cfa192f49ff5e3
          </li>
        </ul>

        <div className="congratulations form-bg">
          <h1 className="congrats-title">Congratulations</h1>
          <h2 className="congrats-subTitle">Your journey has just started.</h2>
          <div className="congrats-body">
            <p>
              We have to be honest with you. The ikigai diagram is not perfect.
              The important part is the process of self discovery that you
              follow as you try to answer the questions. What you could have
              seen is that ikigai shows you that nothing is siloed. Everything
              is connected. Everything is work in progress.
            </p>
          </div>
          <div className="form-btns">
            <button
              className="btn-lg"
              onClick={() =>
                history.push({
                  pathname: "/chart",
                  state: location.state,
                })
              }
            >
              view results
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Congratulations;
