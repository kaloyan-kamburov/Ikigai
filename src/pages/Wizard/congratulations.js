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
          <li className="wizard__step toBeFilled">
            <span className="rectangle fill"></span>
          </li>
          <li className="wizard__step">
            <span className="rectangle"></span>
          </li>
        </ul>

        <div className="congratulations form-bg">
          <h1>Congratulations</h1>
          <div className="form-btns">
            <button
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
