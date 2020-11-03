import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context";

const Congratulations = () => {
  const history = useHistory();
  const location = useLocation();
  const [userDetails, setUserDetails] = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(userDetails.user).length) {
      return history.push("/chart");
    }

    const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
    if (
      !ikiSettings ||
      !(
        ikiSettings &&
        !(
          ikiSettings &&
          (!ikiSettings.step_A ||
            !ikiSettings.step_B ||
            !ikiSettings.step_C ||
            !ikiSettings.step_D)
        )
      )
    ) {
      return history.push("/");
    }
  }, []);
  return (
    <section className="section-yellow">
      <div className="shell">
        <div className="congratulations">
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
          <div className="congrats-btns">
            <button
              className="btn-lg"
              onClick={() => {
                const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
                localStorage.setItem(
                  "ikigai",
                  JSON.stringify({ ...ikiSettings, dateCreated: new Date() })
                );

                history.push({
                  pathname: "/chart",
                  state: location.state,
                });
              }}
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
